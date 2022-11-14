import AuthAPI from "api/authAPI";
import ChatsAPI from "api/chatsAPI";
import { ChatDTO, UserDTO, DispatchStateHandler } from "api/types";
import type { Store } from "core";
import { apiUserTransformers } from "helpers/apiUserTransformers";
import { apiChatTransformers } from "helpers/apiChatTransformers";
import { apiError } from "helpers/apiError";
import { getAvatar } from "./userData";

export type LoginPayload = {
  login: string;
  password: string;
};

export type SignupPayload = {
  login: string;
  password: string;
  first_name: string;
  second_name: string;
  email: string;
  phone: string;
};

const api = new AuthAPI();
const chatsApi = new ChatsAPI();

export const signin: DispatchStateHandler<LoginPayload> = async (store, action) => {
  store.setState({ isLoading: true });

  try {
    const response = await api.signin(action);

    if (apiError(response)) {
      alert(response.reason);
    }

    const user = (await api.getUserInfo()) as UserDTO;

    if (apiError(user)) {
      throw new Error(user.reason);
    }

    const avatar = await getAvatar(user);
    const modifiedUser = { ...user, avatar };

    const chats = (await chatsApi.getChats()) as ChatDTO[];

    if (apiError(chats)) {
      throw new Error(chats.reason);
    }

    store.setState({
      user: apiUserTransformers(modifiedUser),
      chats: chats.map((chat) => apiChatTransformers(chat)),
    });

    window.router.go("/chat");
  } catch (error) {
    store.setState({ loginFormError: (error as Error).message });
    window.router.go("/login");
  } finally {
    store.setState({ isLoading: false });
  }
};

export const signout = async (store: Store<AppState>) => {
  store.setState({ isLoading: true });

  try {
    const response = await api.signout();

    if (apiError(response)) {
      alert(response.reason);
    }
  } catch (error) {
    store.setState({ loginFormError: (error as Error).message });
  } finally {
    store.setState({
      isLoading: false,
      loginFormError: "",
      user: null,
      chats: [],
      selectedChat: null,
      isPopupShown: false,
    });

    window.router.go("/");
  }
};

export const signup: DispatchStateHandler<Partial<UserDTO>> = async (store, action) => {
  store.setState({ isLoading: true });

  try {
    const response = await api.signup(action);

    if (apiError(response)) {
      alert(response.reason);
    }

    const user = {
      ...action,
      ...response,
      display_name: "",
      avatar: "",
    } as UserDTO;
    const chats = (await chatsApi.getChats()) as ChatDTO[];

    if (apiError(chats)) {
      throw new Error(chats.reason);
    }

    store.setState({
      user: apiUserTransformers(user),
      chats: chats.map((chat) => apiChatTransformers(chat)),
    });

    window.router.go("/chat");
  } catch (error) {
    store.setState({ loginFormError: (error as Error).message });
  } finally {
    store.setState({ isLoading: false });
  }
};

export const getUserInfo = async () => {
  try {
    const user = await api.getUserInfo();

    if (apiError(user)) {
      if (user.reason === "Cookie is not valid") {
        throw new Error("You are not logged in");
      }
      throw new Error(user.reason);
    }

    return user;
  } catch (error) {
    window.store.setState({ loginFormError: (error as Error).message });
    return null;
  }
};
