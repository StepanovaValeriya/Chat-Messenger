import { renderDOM, registerComponent } from "./core";
import "./styles/style.scss";

import MainPage from "./pages/main";
import ErrorPage from "./pages/errors";
import LoginPage from "./pages/login";
import SignUpPage from "./pages/signup";

import Button from "./components/button";
import Layout from "./components/layout";
import Link from "./components/link";
import Input from "./components/input";
import InputError from "./components/inputError";
import ControlledInput from "./components/controlledInput";

registerComponent(Button);
registerComponent(Layout);
registerComponent(Link);
registerComponent(Input);
registerComponent(InputError);
registerComponent(ControlledInput);

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
    //   //   break;
    //   // case '/chats':
    //   //   renderDOM(new Chats());
    //   //   break;
    //   // case '/userProfile':
    //   //     renderDOM(new userProfile());
    //   //     break;
    //   default:
    //     console.log("nothing");
  }
});
