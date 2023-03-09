import LoginPage from "pages/login/login";
import SignUpPage from "pages/signup/signup";
import MainPage from "pages/main/main";
import ChatPage from "pages/chat/chat";
import ProfilePage from "pages/profile/profile";
import ChangeDataProfilePage from "pages/changeDataProfile/changeDataProfile";
import ChangePassProfilePage from "pages/changePassProfile/changePassProfile";
import ErrorPage from "pages/errors/error";

export const ROUTS: Array<PartialRouteProps> = [
  {
    pathname: "/",
    view: MainPage,
    isPrivate: false,
  },
  {
    pathname: "/login",
    view: LoginPage,
    isPrivate: false,
  },
  {
    pathname: "/signup",
    view: SignUpPage,
    isPrivate: false,
  },
  {
    pathname: "/chat",
    view: ChatPage,
    isPrivate: true,
  },
  {
    pathname: "/profile",
    view: ProfilePage,
    isPrivate: true,
  },
  {
    pathname: "/changeDataProfile",
    view: ChangeDataProfilePage,
    isPrivate: true,
  },
  {
    pathname: "/changePassProfile",
    view: ChangePassProfilePage,
    isPrivate: true,
  },
  {
    pathname: "/error",
    view: ErrorPage,
    isPrivate: false,
  },
];
