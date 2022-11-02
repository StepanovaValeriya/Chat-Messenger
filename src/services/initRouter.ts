import { ROUTS } from "../constants/routes";
import renderDOM from "core/renderDom";
import Router from "core/router";
import { Store } from "core/store";
import { MainPage } from "pages/main/main";

export const initRouter = (router: Router, store: Store<AppState>) => {
  ROUTS.forEach((route) => {
    router.use(route, () => {
      const isAuthorized = store.getState().user;

      if (isAuthorized || !route.isPrivate) {
        store.setState({ view: route.view });
        return;
      }

      if (!store.getState().view) {
        store.setState({ view: MainPage });
      }
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

      return;
    }
  });
};
