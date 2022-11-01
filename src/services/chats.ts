import ChatsAPI from "api/chatsAPI";
import {
  UserToChatData,
  ChatFromServer,
  CreateChatRequestData,
  DeleteChatRequestData,
  UserDTO,
} from "api/types";
import { Dispatch } from "core/store";
import { apiError } from "helpers/apiError";
import { apiChatTransformers } from "helpers/apiChatTransformers";
import { apiUserTransformers } from "helpers/apiUserTransformers";
import { getUserByLogin } from "./userData";

const api = new ChatsAPI();

export const getChats = async (dispatch: Dispatch<AppState>) => {
  dispatch({ isLoading: true });

  const response = (await api.getChats()) as ChatFromServer[];

  if (apiError(response)) {
    dispatch({ isLoading: false, loginFormError: response.reason });

    return;
  }

  dispatch({
    chats: response.map((item) => apiChatTransformers(item)),
    isLoading: false,
    loginFormError: null,
  });
  return response.map((item) => apiChatTransformers(item));
};

export const createChat = async (
  dispatch: Dispatch<AppState>,
  state: AppState,
  action: CreateChatRequestData
) => {
  dispatch({ isLoading: true });

  const response = await api.createChat(action);

  if (apiError(response)) {
    dispatch({ isLoading: false, loginFormError: response.reason });

    return;
  }

  dispatch(getChats);
  dispatch({ isLoading: false, loginFormError: null });
};

export const deleteChat = async (
  dispatch: Dispatch<AppState>,
  state: AppState,
  action: DeleteChatRequestData
) => {
  dispatch({ isLoading: true });

  const response = await api.deleteChat(action);

  if (apiError(response)) {
    dispatch({ isLoading: false, loginFormError: response.reason });

    return;
  }

  dispatch(getChats);
  dispatch({ isLoading: false, loginFormError: null });
};

export const addUserToChat = async (
  dispatch: Dispatch<AppState>,
  state: AppState,
  action: UserToChatData
) => {
  const user = await getUserByLogin(action.login);

  if (user.length === 0) {
    dispatch({ isLoading: false, loginFormError: "User not found" });
    alert("User not found");

    return;
  }

  const response = await api.addUserToChat({
    users: [user[0].id],
    chat: action.chat,
  });

  if (apiError(response)) {
    dispatch({ isLoading: false, loginFormError: response.reason });

    return;
  }

  const users = (await api.getChatUsers({
    chatId: action.chat.id,
  })) as UserDTO[];

  if (apiError(users)) {
    dispatch({ isLoading: false, loginFormError: users.reason });

    return;
  }

  const selectedChat = {
    ...action.chat,
    chatUsers: users.map((user) => apiUserTransformers(user)),
  };

  dispatch({
    selectedChat: selectedChat,
    isLoading: false,
    loginFormError: null,
  });
};

export const deleteUserFromChat = async (
  dispatch: Dispatch<AppState>,
  state: AppState,
  action: UserToChatData
) => {
  const user = await getUserByLogin(action.login);

  if (user.length === 0) {
    dispatch({ isLoading: false, loginFormError: "User not found" });
    alert("User not found");

    return;
  }

  const response = await api.deleteUserFromChat({
    users: [user[0].id],
    chat: action.chat,
  });

  if (apiError(response)) {
    dispatch({ isLoading: false, loginFormError: response.reason });

    return;
  }

  const users = (await api.getChatUsers({
    chatId: action.chat.id,
  })) as UserDTO[];

  if (apiError(users)) {
    dispatch({ isLoading: false, loginFormError: users.reason });

    return;
  }

  const selectedChat = {
    ...action.chat,
    chatUsers: users.map((user) => apiUserTransformers(user)),
  };

  dispatch({
    selectedChat: selectedChat,
    isLoading: false,
    loginFormError: null,
  });
};

export const getChatInfo = async (
  dispatch: Dispatch<AppState>,
  state: AppState,
  action: ChatType
) => {
  const token = (await api.getChatToken(action.id)).token;

  if (apiError(token)) {
    dispatch({ isLoading: false, loginFormError: token.reason });

    return;
  }

  const users = (await api.getChatUsers({
    chatId: action.id,
  })) as UserDTO[];

  if (apiError(users)) {
    dispatch({ isLoading: false, loginFormError: users.reason });

    return;
  }

  const selectedChat = {
    ...action,
    chatUsers: users.map((user) => apiUserTransformers(user)),
    chatToken: token as string,
  };

  if (state.user) {
    openSocket(state.user.id, selectedChat);
  }

  dispatch({
    selectedChat: selectedChat,
    isLoading: false,
    loginFormError: null,
  });
};

export const openSocket = (id: number, chat: ChatType) => {
  const socket = window.webSocket.socketsMap.get(String(id));

  if (!socket) {
    window.webSocket.createConnection(id, chat);

    return;
  }
};

export const sendMessage = (message: string, chat: ChatType) => {
  const socket = window.webSocket.socketsMap.get(String(chat.id))?.socket;
  const messageObject = {
    content: message,
    type: "message",
  };

  socket?.send(JSON.stringify(messageObject));
};

export const getUnreadMessagesCount = async (action: ChatType) => {
  return (await api.getUnreadMessagesCount({ chatId: action.id })) as number;
};
