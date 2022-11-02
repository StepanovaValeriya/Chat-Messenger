import { UserDTO } from "api/types";
import { apiUserTransformers } from "helpers/apiUserTransformers";
import { Router, Store } from "core";
import { getChats } from "./chats";
import { getUserInfo } from "./auth";
import { apiError } from "helpers/apiError";
import { getAvatar } from "./userData";

export async function initApp(store: Store<AppState>) {
  try {
    store.setState({ isLoading: true });

    const user = (await getUserInfo()) as UserDTO;

    if (apiError(user)) {
      throw new Error(user.reason);
    }

    const avatar = await getAvatar(user);
    const modifiedUser = { ...user, avatar };
    const chats = await getChats(store);

    modifiedUser &&
      chats &&
      store.setState({ user: apiUserTransformers(modifiedUser), chats });
  } catch (error) {
    console.log((error as Error).message);
  } finally {
    store.setState({ isLoading: false, isAppInited: true });
  }
}
