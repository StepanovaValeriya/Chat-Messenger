import HTTPTransport from "core/HttpTransport";
import {
  UserToChatRequestData,
  CreateChatRequestData,
  DeleteChatRequestData,
  ResStatus,
  APIError,
  UserDTO,
  ChatUsersRequestData,
  DeleteChatResponseData,
  UnreadCountResponseData,
  ChatDTO,
} from "./types";

export default class ChatsAPI extends HTTPTransport {
  createChat = async (
    data: CreateChatRequestData
  ): Promise<ResStatus | APIError> =>
    this.post("chats", { data }) as Promise<ResStatus | APIError>;

  deleteChat = async (
    data: DeleteChatRequestData
  ): Promise<DeleteChatResponseData> =>
    this.delete("chats", { data }) as Promise<DeleteChatResponseData>;

  getChats = async (): Promise<Array<ChatDTO> | APIError> =>
    this.get("chats") as Promise<Array<ChatDTO> | APIError>;

  getChatToken = async (chatId: number): Promise<{ token: string }> =>
    this.post(`chats/token/${chatId}`) as Promise<{ token: string }>;

  addUserToChat = async (
    data: UserToChatRequestData
  ): Promise<ResStatus | APIError> => {
    return this.put("chats/users", {
      data: { users: data.users, chatId: data.chat.id },
    }) as Promise<ResStatus | APIError>;
  };

  deleteUserFromChat = async (
    data: UserToChatRequestData
  ): Promise<ResStatus | APIError> => {
    return this.delete("chats/users", {
      data: { users: data.users, chatId: data.chat.id },
    }) as Promise<ResStatus | APIError>;
  };

  getChatUsers = async (
    data: ChatUsersRequestData
  ): Promise<Array<UserDTO> | APIError> => {
    return this.get(`chats/${data.chatId}/users`) as Promise<
      Array<UserDTO> | APIError
    >;
  };

  getUnreadMessagesCount = async (
    data: ChatUsersRequestData
  ): Promise<UnreadCountResponseData | APIError> => {
    return this.get(`/chats/new/${data.chatId}`) as Promise<
      UnreadCountResponseData | APIError
    >;
  };
}
