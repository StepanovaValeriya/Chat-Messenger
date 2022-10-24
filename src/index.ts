import { registerComponent } from "./core";
import "./styles/style.scss";
import { Router } from "core";
import { ROUTES } from "./constants/routes";

import MainPage from "./pages/main";
import ErrorPage from "./pages/errors";
import LoginPage from "./pages/login";
import SignUpPage from "./pages/signup";
import ChatPage from "./pages/chat";
import ProfilePage from "./pages/profile";
import ChangePassProfilePage from "./pages/changePassProfile";
import ChangeDataProfilePage from "./pages/changeDataProfile";

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

import { Store } from "core/store";
import { defaultState } from "./store";
import { initApp } from "./services/initApp";

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

export const router = new Router(".app");
declare global {
  interface Window {
    store: Store<AppState>;
    router: Router;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const store = new Store<AppState>(defaultState);
  const router = new Router(".app");
  console.log(router);
  window.router = router;
  window.store = store;
  router
    .use(ROUTES.Main, MainPage)
    .use(ROUTES.Login, LoginPage)
    .use(ROUTES.SignUp, SignUpPage)
    .use(ROUTES.Profile, ProfilePage)
    .use(ROUTES.ProfileSettings, ChangeDataProfilePage)
    .use(ROUTES.ChangePassword, ChangePassProfilePage)
    .use(ROUTES.Chat, ChatPage)
    .use(ROUTES.Error, ErrorPage)
    .start();
  store.on("changed", (prevState, nextState) => {
    console.log(
      "%cstore updated",
      "background: #222; color: #bada55",
      nextState
    );
  });
  store.dispatch(initApp);
});
