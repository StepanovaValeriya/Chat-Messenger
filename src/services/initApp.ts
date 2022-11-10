import { UserDTO } from "api/types";
import { apiUserTransformers } from "helpers/apiUserTransformers";
import { Store } from "core";
import { getChats } from "./chats";
import { getUserInfo } from "./auth";
import { getAvatar } from "./userData";

export async function initApp(store: Store<AppState>) {
  try {
    store.setState({ isLoading: true });

    const response = (await getUserInfo()) as UserDTO;

    if (response) {
      const avatar = await getAvatar(response);
      const modifiedUser = { ...response, avatar };
      const chats = await getChats(store);

      modifiedUser &&
        chats &&
        store.setState({ user: apiUserTransformers(modifiedUser), chats });
      return true;
    }
    throw new Error("You are not logged in");
  } catch (error) {
    console.log((error as Error).message);
    return false;
  } finally {
    store.setState({ isLoading: false, isAppInited: true });
  }
}
