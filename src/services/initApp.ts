import { UserDTO } from "api/types";
import AuthAPI from "api/authAPI";
import { apiError } from "helpers/apiError";
import { apiUserTransformers } from "helpers/apiUserTransformers";
import { getAvatar } from "./userData";
import { Router, Store } from "core";
import LoginPage from "pages/login/login";
import ChatPage from "pages/chat/chat";
import { ROUTS } from "../constants/routes";
import { getChats } from "./chats";

const authApi = new AuthAPI();

export async function initApp(router: Router, store: Store<AppState>) {
  const currentPage = localStorage.getItem("currentPage");
  console.log("currentPage", currentPage);
  console.log("store", store);

  if (!currentPage) {
    store.setState({ isAppInited: true });
    router.go("/login");
    return;
  }

  const user = (await authApi.getUserInfo()) as UserDTO;
  console.log(user);

  if (apiError(user)) {
    store.setState({ view: LoginPage });
    router.go("/login");
  }

  const isPrivate = ROUTS.find(
    (route) => route.pathname === currentPage
  )?.isPrivate;

  console.log("isPrivate", isPrivate);

  if (isPrivate) {
    try {
      let avatar = await getAvatar(user);

      if (apiError(avatar)) {
        router.go("/login");
      }

      const fullUser = { ...user, avatar };
      const chats = await getChats(window.store);

      console.log(fullUser);

      store.setState({
        user: apiUserTransformers(fullUser),
        chats,
      });
    } catch (err) {
      console.error(err);
    } finally {
      store.setState({ isAppInited: true });
      router.go(currentPage);
    }
  }

  if (!isPrivate && user) {
    try {
      let avatar = await getAvatar(user);

      if (apiError(avatar)) {
        router.go("/login");
      }

      const fullUser = { ...user, avatar };
      const chats = await getChats(store);

      store.setState({
        user: apiUserTransformers(fullUser),
        chats,
        view: ChatPage,
      });
    } catch (err) {
      console.error(err);
    } finally {
      store.setState({ isAppInited: true });
      router.go("/chat");
    }
  }
}
