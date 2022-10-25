declare global {
  export type Nullable<T> = T | null;
  export type Keys<T extends Record<string, unknown>> = keyof T;
  export type Values<T extends Record<string, unknown>> = T[Keys<T>];
  export type Indexed<T = unknown> = {
    [key in string]: T;
  };

  export type AppState = {
    view: BlockConstructable | null;
    isLoading: boolean;
    loginFormError: string | null;
    user: User | null;
    isAppInited: boolean;
    chats: Array<ChatType>;
    selectedChat: Nullable<ChatType>;
    isPopupShown: boolean;
  };

  export type UserType = {
    id: number;
    displayName: string;
    login: string;
    firstName: string;
    secondName: string;
    avatar: string;
    phone: string;
    email: string;
  };

  export type ChatType = {
    id: number;
    title: string;
    avatar: Record<string, any>;
    createdBy: number;
    unreadCount: number;
    lastMessage: Record<string, any>;
  };
}

export {};
