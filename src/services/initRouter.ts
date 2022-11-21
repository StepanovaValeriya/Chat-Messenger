import renderDOM from "core/renderDom";
import Router from "core/router";
import { Store } from "core/store";
import { ROUTS } from "../constants/routes";

export const initRouter = (router: Router, store: Store<AppState>) => {
  ROUTS.forEach((route) => {
    router.use(route, () => {
      const isAuthorized = store.getState().user;

      if (isAuthorized) {
        if (route.isPrivate) {
          store.setState({ view: route.view, currentPath: route.pathname });
        } else {
          router.go("/chat");
        }

        return;
      }

      if ((!route.isPrivate && route.pathname === "/") || route.isPrivate) {
        router.go("/login");
        return;
      }

      store.setState({ view: route.view, currentPath: route.pathname });
    });
  });

  store.on("updated", (prevState, nextState) => {
    if (!prevState.isAppInited && nextState.isAppInited) {
      router.start();
    }

    if (prevState.view !== nextState.view) {
      const Page = nextState.view;
      const newPage = new Page({});

      renderDOM(newPage);
    }
  });
};
