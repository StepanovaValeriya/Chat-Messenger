import { registerComponent, renderDOM } from "./core";
import "./styles/style.scss";
import Router from "core/router";
import store, { Store } from "core/store";
import { initApp } from "./services/initApp";
import { initRouter } from "services/initRouter";
import { Socket } from "core/WebSocket";

import MainPage from "./pages/main/main";

import Button from "./components/button";
import Layout from "./components/layout";
import Link from "./components/link";
import Input from "./components/input";
import InputError from "./components/inputError";
import ControlledInput from "./components/controlledInput";
import {
  ChatList,
  ChatHeader,
  ChatMessageInput,
  EmptyChat,
  Message,
} from "./components/chat";
import { ProfileAvatar, ProfileNav, ProfileItem } from "./components/profile";
import Modal from "./components/modal";
import Loader from "./components/loading";

registerComponent(Button);
registerComponent(Layout);
registerComponent(Link);
registerComponent(Input);
registerComponent(InputError);
registerComponent(ControlledInput);
registerComponent(ChatList);
registerComponent(ChatHeader);
registerComponent(ChatMessageInput);
registerComponent(EmptyChat);
registerComponent(Message);
registerComponent(ProfileAvatar);
registerComponent(ProfileNav);
registerComponent(ProfileItem);
registerComponent(Modal);
registerComponent(Loader);

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

  store.on("updated", (prevState, nextState) => {
    if (process.env.DEBUG) {
      console.log(
        "%cstore updated",
        "background: #222; color: #bada55",
        nextState
      );
    }
  });
  console.log(store, router);

  initRouter(router, store);
  initApp(store);
});
