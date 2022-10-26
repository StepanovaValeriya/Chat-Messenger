import {
  ChangePasswordRequestData,
  ChangeProfileRequestData,
  GetUserByLoginRequestData,
  UserDTO,
} from "api/types";
import UserAPI from "api/userAPI";
import { apiError } from "helpers/apiError";
import { apiUserTransformers } from "helpers/apiUserTransformers";
import type { Dispatch } from "core";

const api = new UserAPI();

export const changeUserProfile = async (
  dispatch: Dispatch<AppState>,
  state: AppState,
  action: ChangeProfileRequestData
) => {
  dispatch({ isLoading: true });

  const response = await api.changeProfile(action);

  if (apiError(response)) {
    dispatch({ isLoading: false, loginFormError: response.reason });

    return;
  }

  dispatch({
    user: apiUserTransformers(response as UserDTO),
    isLoading: false,
    loginFormError: null,
  });

  window.router.back();
};

export const changeUserPassword = async (
  dispatch: Dispatch<AppState>,
  state: AppState,
  action: ChangePasswordRequestData
) => {
  dispatch({ isLoading: true });

  const response = await api.changePassword(action);

  if (apiError(response)) {
    dispatch({ isLoading: false, loginFormError: response.reason });

    return;
  }

  dispatch({
    isLoading: false,
    loginFormError: null,
  });

  window.router.back();
};

export const getUserByLogin = async (login: string) => {
  const users = (await api.getUserByLogin({ login })) as UserDTO[];

  console.log(users);
  return users;
};
