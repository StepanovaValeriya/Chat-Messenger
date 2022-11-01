import AuthAPI from "api/authAPI";
import ChatsAPI from "api/chatsAPI";
import { ChatDTO, UserDTO } from "api/types";
import type { Dispatch } from "core";
import { apiUserTransformers } from "helpers/apiUserTransformers";
import { apiChatTransformers } from "helpers/apiChatTransformers";
import { apiError } from "helpers/apiError";
import MainPage from "pages/main/main";
import { getAvatar } from "./userData";

type LoginPayload = {
  login: string;
  password: string;
};

type SignupPayload = {
  login: "string";
  password: "string";
  first_name: "string";
  second_name: "string";
  email: "string";
  phone: "string";
};

const api = new AuthAPI();
const chatsApi = new ChatsAPI();

export const signin = async (
  dispatch: Dispatch<AppState>,
  state: AppState,
  action: LoginPayload
) => {
  dispatch({ isLoading: true });

  const response = await api.signin(action);

  if (apiError(response)) {
    dispatch({ isLoading: false, loginFormError: response.reason });
    alert(response.reason);

    return;
  }

  const user = (await api.getUserInfo()) as UserDTO;

  if (apiError(user)) {
    dispatch(signout);

    return;
  }

  user.avatar = await getAvatar(user);
  const chats = (await chatsApi.getChats()) as ChatDTO[];

  dispatch({
    user: apiUserTransformers(user),
    chats: chats.map((chat) => apiChatTransformers(chat)),
  });

  window.router.go("/chat");
};

export const signout = async (dispatch: Dispatch<AppState>) => {
  dispatch({ isLoading: true });

  await api.signout();

  dispatch({
    isLoading: false,
    view: MainPage,
    loginFormError: null,
    user: null,
    chats: null,
    selectedChat: null,
    isPopupShown: false,
    foundUsers: [],
  });

  window.router.go("/");
};

export const signup = async (
  dispatch: Dispatch<AppState>,
  state: AppState,
  action: SignupPayload
) => {
  dispatch({ isLoading: true });

  const response = await api.signup(action);

  if (apiError(response)) {
    dispatch({ isLoading: false, loginFormError: response.reason });
    alert(response.reason);

    return;
  }

  const user = (await api.getUserInfo()) as UserDTO;

  if (apiError(user)) {
    dispatch(signout);

    return;
  }

  user.avatar = await getAvatar(user);
  const chats = (await chatsApi.getChats()) as ChatDTO[];

  dispatch({
    user: apiUserTransformers(user),
    chats: chats.map((chat) => apiChatTransformers(chat)),
  });

  window.router.go("/chat");
};
