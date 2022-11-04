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

    const response = (await getUserInfo()) as UserDTO;

    if (apiError(response)) {
      throw new Error(response.reason);
    }

    const avatar = await getAvatar(response);
    const modifiedUser = { ...response, avatar };
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
