import {
  ChangePasswordRequestData,
  ChangeProfileRequestData,
  UserDTO,
} from "api/types";
import UserAPI from "api/userAPI";
import { apiError } from "helpers/apiError";
import { apiUserTransformers } from "helpers/apiUserTransformers";
import type { Dispatch } from "core";
import { avatarDefault } from "../constants/avatarDefault";

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
export const changeAvatar = async (
  dispatch: Dispatch<AppState>,
  state: AppState,
  action: FormData
) => {
  console.log(action);
  const newUser = (await api.changeAvatar(action)) as UserDTO;
  newUser.avatar = await getAvatar(newUser);

  dispatch({ user: apiUserTransformers(newUser) });
};
export const getAvatar = async (user: UserDTO | UserType) => {
  if (!user.avatar) {
    return avatarDefault;
  }
  const blob = (await api.getAvatar(user.avatar)) as Blob;

  return URL.createObjectURL(blob);
};

export const getUserByLogin = async (login: string) => {
  const users = (await api.getUserByLogin({ login })) as UserDTO[];

  console.log(users);
  return users;
};
