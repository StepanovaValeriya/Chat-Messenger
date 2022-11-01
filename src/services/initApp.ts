import type { Dispatch } from "core/store";
import { UserDTO, ChatDTO } from "api/types";
import AuthAPI from "api/authAPI";
import ChatsAPI from "api/chatsAPI";
import { apiError } from "helpers/apiError";
import { apiUserTransformers } from "helpers/apiUserTransformers";
import { apiChatTransformers } from "helpers/apiChatTransformers";
import { getAvatar } from "./userData";

const authApi = new AuthAPI();
const chatsApi = new ChatsAPI();

export async function initApp(dispatch: Dispatch<AppState>) {
  try {
    const user = (await authApi.getUserInfo()) as UserDTO;
    console.log(user);

    if (apiError(user)) {
      // window.router.go("/login");
      return;
    }

    user.avatar = await getAvatar(user);
    const chats = (await chatsApi.getChats()) as ChatDTO[];

    dispatch({
      user: apiUserTransformers(user),
      chats: chats.map((chat) => apiChatTransformers(chat)),
    });
    window.router.go("/chat");
  } catch (err) {
    console.error(err);
  } finally {
    dispatch({ isAppInited: true });
  }
}
