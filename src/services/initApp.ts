import type { Dispatch } from "core/store";
import { UserDTO, ChatFromServer } from "api/types";
import AuthAPI from "api/authAPI";
import ChatsAPI from "api/chatsAPI";
import { apiError } from "helpers/apiError";
import { apiUserTransformers } from "helpers/apiUserTransformers";
import { apiChatTransformers } from "helpers/apiChatTransformers";

const authApi = new AuthAPI();
const chatsApi = new ChatsAPI();

export async function initApp(dispatch: Dispatch<AppState>) {
  // await new Promise((r) => setTimeout(r, 1000));

  try {
    const user = await authApi.getUserInfo();

    if (apiError(user)) {
      console.log(user.status);
      // window.router.go("/login");
      return;
    }
    const chats = (await chatsApi.getChats()) as ChatFromServer[];

    dispatch({
      user: apiUserTransformers(user as UserDTO),
      chats: chats.map((chat) => apiChatTransformers(chat)),
    });
    window.router.go("/chat");
  } catch (err) {
    console.error(err);
  } finally {
    dispatch({ isAppInited: true });
  }
}
