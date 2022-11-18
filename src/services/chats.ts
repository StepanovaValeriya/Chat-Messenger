import ChatsAPI from "api/chatsAPI";
import {
  UserToChatData,
  ChatDTO,
  CreateChatRequestData,
  DeleteChatRequestData,
  UnreadCountResponseData,
  UserDTO,
  DispatchStateHandler,
} from "api/types";
import { Store } from "core";
import { apiError } from "helpers/apiError";
import { apiChatTransformers } from "helpers/apiChatTransformers";
import { apiUserTransformers } from "helpers/apiUserTransformers";
import { getUserByLogin } from "./userData";

const api = new ChatsAPI();

export const getChats = async (store: Store<AppState>) => {
  store.setState({ isLoading: true });

  try {
    const response = (await api.getChats()) as ChatDTO[];

    if (apiError(response)) {
      alert(response.reason);
    }

    store.setState({
      chats: response.map((item) => apiChatTransformers(item)),
    });

    return response.map((item) => apiChatTransformers(item));
  } catch (error) {
    store.setState({ loginFormError: (error as Error).message });
    return [];
  } finally {
    store.setState({ isLoading: false });
  }
};

export const createChat: DispatchStateHandler<CreateChatRequestData> = async (store, action) => {
  store.setState({ isLoading: true });

  try {
    const response = await api.createChat(action);

    if (apiError(response)) {
      throw new Error(response.reason);
    }

    await getChats(store);
    window.router.upload();
  } catch (error) {
    store.setState({ loginFormError: (error as Error).message });
  } finally {
    store.setState({ isLoading: false });
  }
};

export const deleteChat: DispatchStateHandler<DeleteChatRequestData> = async (store, action) => {
  store.setState({ isLoading: true });

  try {
    const response = await api.deleteChat(action);

    if (apiError(response)) {
      alert(response.reason);
    }

    await getChats(store);
    window.router.upload();
  } catch (error) {
    store.setState({ loginFormError: (error as Error).message });
  } finally {
    store.setState({ isLoading: false });
  }
};

export const addUserToChat: DispatchStateHandler<UserToChatData> = async (store, action) => {
  store.setState({ isLoading: true });

  try {
    const user = await getUserByLogin(action.login);

    if (apiError(user)) {
      alert(user.reason);
    }

    if (!user || user?.length === 0) {
      throw new Error("User not found");
    }

    const response = await api.addUserToChat({
      users: [user[0].id],
      chat: action.chat,
    });

    if (apiError(response)) {
      alert(response.reason);
    }

    const users = (await api.getChatUsers({
      chatId: action.chat.id,
    })) as UserDTO[];

    if (apiError(users)) {
      throw new Error(users.reason);
    }

    let { chatUsers } = action.chat;
    chatUsers = chatUsers && [...chatUsers, apiUserTransformers(user[0])];

    const selectedChat = {
      ...action.chat,
      chatUsers,
    };

    store.setState({ selectedChat });
  } catch (error) {
    store.setState({ loginFormError: (error as Error).message });
  } finally {
    store.setState({ isLoading: false });
  }
};

export const deleteUserFromChat: DispatchStateHandler<UserToChatData> = async (store, action) => {
  store.setState({ isLoading: true });

  try {
    const user = await getUserByLogin(action.login);

    if (apiError(user)) {
      throw new Error(user.reason);
    }

    if (!user || user?.length === 0) {
      throw new Error("User not found");
    }

    const response = await api.deleteUserFromChat({
      users: [user[0].id],
      chat: action.chat,
    });

    if (apiError(response)) {
      throw new Error(response.reason);
    }

    let { chatUsers } = action.chat;
    chatUsers =
      chatUsers && chatUsers.filter((item) => item.id !== apiUserTransformers(user[0]).id);

    const selectedChat = {
      ...action.chat,
      chatUsers,
    };

    store.setState({ selectedChat });
  } catch (error) {
    store.setState({ loginFormError: (error as Error).message });
  } finally {
    store.setState({ isLoading: false });
  }
};

export const getChatInfo: DispatchStateHandler<ChatType> = async (store, action) => {
  store.setState({ isLoading: true });

  try {
    const { token } = await api.getChatToken(action.id);

    if (apiError(token)) {
      throw new Error(token.reason);
    }

    const users = (await api.getChatUsers({ chatId: action.id })) as UserDTO[];

    if (apiError(users)) {
      throw new Error(users.reason);
    }

    const selectedChat = {
      ...action,
      chatUsers: users.map((user) => apiUserTransformers(user)),
      chatToken: token as string,
    };
    console.log(selectedChat);

    store.setState({ selectedChat });
  } catch (error) {
    store.setState({ loginFormError: (error as Error).message });
  } finally {
    store.setState({ isLoading: false });
  }
};

export const openSocket = (id: number, chat: ChatType) => {
  window.webSocket.createConnection(id, chat);
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
  try {
    const unreadCount = await api.getUnreadMessagesCount({ chatId: action.id });

    if (apiError(unreadCount)) {
      throw new Error(unreadCount.reason);
    }
    return unreadCount as UnreadCountResponseData;
  } catch (error) {
    window.store.setState({ loginFormError: (error as Error).message });
    return 0;
  }
};
