import { ROUTS } from "../constants/routes";
import renderDOM from "core/renderDom";
import Router from "core/router";
import MainPage from "pages/main/main";
import { Store } from "core/store";

export const initRouter = (router: Router, store: Store<AppState>) => {
  ROUTS.forEach((route) => {
    router.use(route, () => {
      store.dispatch({ view: route.view });

      if (!store.getState().view) {
        store.dispatch({ view: MainPage });

        return;
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
    }
  });
};
