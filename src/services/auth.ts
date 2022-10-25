import AuthAPI from "api/authAPI";
import { UserDTO } from "api/types";
import type { Dispatch } from "core";
import { apiUserTransformers } from "helpers/apiUserTransformers";
import { apiError } from "helpers/apiError";

type LoginPayload = {
  login: string;
  password: string;
};

type SignupPayload = {
  login: "string";
  password: "string";
  first_name: "string";
  second_name: "string";
  email: "string";
  phone: "string";
};

const api = new AuthAPI();

export const signin = async (
  dispatch: Dispatch<AppState>,
  state: AppState,
  action: LoginPayload
) => {
  dispatch({ isLoading: true });

  const response = await api.signin(action);

  if (apiError(response)) {
    dispatch({ isLoading: false, loginFormError: response.reason });

    return;
  }

  const user = await api.getUserInfo();

  if (apiError(user)) {
    dispatch(signout);

    return;
  }

  dispatch({
    user: apiUserTransformers(user as UserDTO),
    isLoading: false,
    loginFormError: null,
  });
};

export const signout = async (dispatch: Dispatch<AppState>) => {
  dispatch({ isLoading: true });

  await api.signout();

  dispatch({ isLoading: false, user: null });

  window.router.go("/login");
};

export const signup = async (
  dispatch: Dispatch<AppState>,
  state: AppState,
  action: SignupPayload
) => {
  dispatch({ isLoading: true });

  const response = await api.signup(action);

  if (apiError(response)) {
    dispatch({ isLoading: false, loginFormError: response.reason });

    return;
  }

  const user = await api.getUserInfo();

  if (apiError(user)) {
    dispatch(signout);

    return;
  }

  dispatch({
    user: apiError(user as UserDTO),
    isLoading: false,
    loginFormError: null,
  });

  window.router.go("/chat");
  // dispatch({ isLoading: false, loginFormError: null });
};
