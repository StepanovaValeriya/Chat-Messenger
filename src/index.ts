import { renderDOM, registerComponent } from "./core";
import "./styles/style.scss";

import MainPage from "./pages/main";
import ErrorPage from "./pages/errors";
import LoginPage from "./pages/login";
import SignUpPage from "./pages/signup";
import ChatPage from "./pages/chat";
import ProfilePage from "./pages/profile";

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

document.addEventListener("DOMContentLoaded", () => {
  switch (window.location.pathname) {
    case "":
    case "/":
      renderDOM(new MainPage());
      break;
    case "/error404":
      renderDOM(
        new ErrorPage({ errorCode: "404", errorText: "Page does not exist" })
      );
      break;
    case "/error500":
      renderDOM(
        new ErrorPage({
          errorCode: "500",
          errorText: "We are aware of the problem and are already solving it.",
        })
      );
      break;
    case "/login":
      renderDOM(new LoginPage());
      break;

    case "/signup":
      renderDOM(new SignUpPage());
      break;
    case "/chat":
      renderDOM(new ChatPage());
      break;
    case "/profile":
      renderDOM(new ProfilePage());
      break;
    default:
      console.log("nothing");
  }
});
