import Router from "core/router";
import { Store } from "core";
import { initRouter } from "services/initRouter";
import { defaultState } from "store";
import TestingPage from "../../tests/TestingPage";

describe("core/router", () => {
  let router: Router;
  let store: Store<AppState>;
  const callbackFn = () => true;

  beforeEach(() => {
    store = new Store<AppState>(defaultState);
    window.store = store;
    router = new Router();
    window.router = router;
    initRouter(router, store);
  });

  it("Router should register routes", () => {
    router.use({ pathname: "/test", view: TestingPage, isPrivate: false }, callbackFn);

    expect(router.routes).toContainEqual({
      pathname: "/test",
      view: TestingPage,
      isPrivate: false,
      callback: callbackFn,
    });
  });

  it("Router should change location.pathname", async () => {
    document.body.innerHTML = '<div id="app"></div>';

    router.use({ pathname: "/test", view: TestingPage, isPrivate: false }, callbackFn);
    router.go("/test");

    expect(store.getState().currentPath).toBe("/test");
  });
});
