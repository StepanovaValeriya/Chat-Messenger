import { ROUTS } from "../constants/routes";
import renderDOM from "core/renderDom";
import Router from "core/router";
import MainPage from "pages/main/main";
import ChatPage from "pages/chat/chat";
import { Store } from "core/store";

export const initRouter = (router: Router, store: Store<AppState>) => {
  ROUTS.forEach((route) => {
    router.use(route, () => {
      console.log(route);

      if (!store.getState().view) {
        const currentPage = localStorage.getItem("currentPage");
        const view = ROUTS.find(
          (route) => route.pathname === currentPage
        )?.view;
        console.log(store.getState().view);

        const newView = view || MainPage;
        store.setState({ view: newView });

        return;
      }

      store.setState({ view: route.view });
      localStorage.setItem("currentPage", route.pathname || "/");
    });
  });

  store.on("updated", (prevState, nextState) => {
    if (!prevState.isAppStarted && nextState.isAppStarted) {
      router.start();
    }

    if (prevState.view !== nextState.view) {
      const Page = nextState.view;
      const newPage = new Page({});

      renderDOM(newPage);

      return;
    }

    if (prevState.chats.length !== nextState.chats.length) {
      renderDOM(new ChatPage({}));
    }
  });
};
