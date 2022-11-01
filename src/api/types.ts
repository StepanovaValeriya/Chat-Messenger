export type APIError = {
  reason: string;
  status: string;
};

export enum ResStatus {
  OK = "ok",
}

export type UserDTO = {
  id: number;
  login: string;
  first_name: string;
  second_name: string;
  display_name: string;
  avatar: string;
  phone: string;
  email: string;
};
export type LoginRequestData = {
  login: string;
  password: string;
};

export type ChangeProfileRequestData = {
  first_name: string;
  second_name: string;
  display_name: string;
  login: string;
  email: string;
  phone: string;
};

export type ChangePasswordRequestData = {
  oldPassword: string;
  newPassword: string;
};

export type SignupRequestData = {
  login: string;
  password: string;
  first_name: string;
  second_name: string;
  email: string;
  phone: string;
};

export type ChatDTO = {
  id: number;
  title: string;
  avatar: Record<string, any>;
  created_by: number;
  unread_count: number;
  last_message: Record<string, any>;
};

export type CreateChatRequestData = {
  title: string;
};
export type GetUserByLoginRequestData = {
  login: string;
};

export type DeleteChatRequestData = {
  chatId: number;
};

export type DeleteChatResponseData = {
  userId: number;
  result: Record<string, unknown>;
};

export type UserToChatRequestData = {
  users: number[];
  chat: ChatType;
};

export type UserToChatData = {
  login: string;
  chat: ChatType;
};

export type getChatUsersRequestData = {
  chatId: number;
};

export type ChatUsersRequestData = {
  chatId: number;
};
export type UnreadCountResponseData = {
  unread_count: number;
};
export type ResponseData = {} | APIError;

export type Sockets = {
  chat_id: number;
  time: string;
  type: string;
  user_id: string;
  content: string;
  file?: {
    id: number;
    user_id: number;
    path: string;
    filename: string;
    content_type: string;
    content_size: number;
    upload_date: string;
  };
};
