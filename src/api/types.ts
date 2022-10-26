export type APIError = {
  reason: string;
  status: string;
};

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

export type ChatFromServer = {
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

export type AddUserToChatRequestData = {
  users: UserType[];
  chatId: Number;
};

export type getChatUsersRequestData = {
  chatId: Number;
};

export type ResponseData = {} | APIError;
