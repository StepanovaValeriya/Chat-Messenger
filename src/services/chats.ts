import ChatsAPI from "api/chatsAPI";
import {
  UserToChatRequestData,
  ChatFromServer,
  CreateChatRequestData,
  DeleteChatRequestData,
  UserDTO,
} from "api/types";
import { Dispatch } from "core/store";
import { apiError } from "helpers/apiError";
import { apiChatTransformers } from "helpers/apiChatTransformers";
import { apiUserTransformers } from "helpers/apiUserTransformers";

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
  action: UserToChatRequestData
) => {
  dispatch({ isLoading: true });

  const response = await api.addUserToChat(action);

  if (apiError(response)) {
    dispatch({ isLoading: false, loginFormError: response.reason });

    return;
  }

  dispatch({ isLoading: false, loginFormError: null });
};

export const deleteUserFromChat = async (
  dispatch: Dispatch<AppState>,
  state: AppState,
  action: UserToChatRequestData
) => {
  dispatch({ isLoading: true });

  const response = await api.deleteUserFromChat(action);

  if (apiError(response)) {
    dispatch({ isLoading: false, loginFormError: response.reason });

    return;
  }

  dispatch({ isLoading: false, loginFormError: null });
};

export const getChatUsers = async (
  dispatch: Dispatch<AppState>,
  state: AppState,
  action: ChatType
) => {
  dispatch({ isLoading: true });

  const response = (await api.getChatUsers({ chatId: action.id })) as UserDTO[];

  if (apiError(response)) {
    dispatch({ isLoading: false, loginFormError: response.reason });

    return;
  }

  const selectedChat = {
    ...action,
    chatUsers: response.map((user) => apiUserTransformers(user)),
  };

  dispatch({
    selectedChat: selectedChat,
    isLoading: false,
    loginFormError: null,
  });
};
