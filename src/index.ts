import "regenerator-runtime/runtime";
import { registerComponent } from "./core";
import "./styles/style.scss";
import Router from "core/router";
import store, { Store } from "core/store";
import { initApp } from "./services/initApp";
import { initRouter } from "services/initRouter";
import { Socket } from "core/WebSocket";
import * as components from "components";

Object.values(components).forEach((Component: any) => {
  registerComponent(Component);
});

declare global {
  interface Window {
    router: Router;
    store: Store<AppState>;
    webSocket: Socket;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const router = new Router();
  window.router = router;
  window.store = store;

  const socketController = new Socket();
  window.webSocket = socketController;

  store.on("updated", (nextState) => {
    console.log(
      "%cstore updated",
      "background: #222; color: #bada55",
      nextState
    );
  });

  initRouter(router, store);
  initApp(store);
});
