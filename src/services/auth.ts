import { authAPI } from "api/authAPI";
import { UserDTO } from "api/types";
import { ROUTES } from "../constants/routes";
import type { Dispatch } from "core";
import { transformUser } from "helpers/apiTransformers";
import { apiError } from "helpers/apiError";

type LoginPayload = {
  login: string;
  password: string;
};

export const login = async (
  dispatch: Dispatch<AppState>,
  state: AppState,
  action: LoginPayload
) => {
  dispatch({ isLoading: true });
  const response = await authAPI.signIn(action);

  if (apiError(response)) {
    dispatch({ isLoading: false, formError: response.reason });
    return;
  }

  const responseUser = await authAPI.getUser();

  dispatch({ isLoading: false, formError: null });

  if (apiError(response)) {
    dispatch(logout);
    return;
  }

  dispatch({ user: transformUser(responseUser as UserDTO) });

  window.router.go(ROUTES.Chat);
};

export const signUp = async (
  dispatch: Dispatch<AppState>,
  state: AppState,
  action: LoginPayload
) => {
  dispatch({ isLoading: true });
  const response = await authAPI.signUp(action);

  if (apiError(response)) {
    dispatch({ isLoading: false, formError: response.reason });
    return;
  }

  const responseUser = await authAPI.getUser();

  dispatch({ isLoading: false, formError: null });

  if (apiError(response)) {
    dispatch(logout);
    return;
  }

  dispatch({ user: transformUser(responseUser as UserDTO) });

  window.router.go(ROUTES.Chat);
};

export const logout = async (dispatch: Dispatch<AppState>) => {
  dispatch({ isLoading: true });

  await authAPI.logout();

  dispatch({ isLoading: false, user: null });

  window.router.go(ROUTES.Login);
};
