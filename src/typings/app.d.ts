declare global {
  export type Nullable<T> = T | null;
  export type Keys<T extends Record<string, unknown>> = keyof T;
  export type Values<T extends Record<string, unknown>> = T[Keys<T>];
  export type Indexed = { [key: string]: string };
}

export type AppState = {
  isLoading: boolean;
  loginFormError: string;
  signupFormError: string;
  addUserError: string;
  deleteUserError: string;
  user: User | null;
  appIsInited: boolean;
  chats: Chat[];
  searchResult: User[];
  chatUsers: User[];
  socket: WebSocket | null;
  messages: Message[];
};

export {};
