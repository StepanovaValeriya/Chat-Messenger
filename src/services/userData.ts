/* eslint-disable @typescript-eslint/no-unused-vars */
import { ChangePasswordRequestData, UserDTO, DispatchStateHandler } from "api/types";
import UserAPI from "api/userAPI";
import { apiError } from "helpers/apiError";
import { apiUserTransformers } from "helpers/apiUserTransformers";
import { avatarDefault } from "../constants/avatarDefault";

const api = new UserAPI();

export const changeUserProfile: DispatchStateHandler<Partial<UserDTO>> = async (store, action) => {
  store.setState({ isLoading: true });

  try {
    const response = await api.changeProfile(action);

    const avatar = store.getState()?.user?.avatar || avatarDefault;

    const updatedUser = {
      ...apiUserTransformers(response as UserDTO),
      avatar,
    };

    // alert("Your data has been successfully changed");

    store.setState({
      user: updatedUser,
    });

    // window.router.back();
  } catch (error) {
    store.setState({ loginFormError: (error as Error).message });
  } finally {
    store.setState({ isLoading: false });
  }
};

export const changeUserPassword: DispatchStateHandler<ChangePasswordRequestData> = async (
  store,
  action
) => {
  store.setState({ isLoading: true });

  try {
    const response = await api.changePassword(action);

    if (apiError(response)) {
      console.log(response.reason);
    }

    window.router.back();
  } catch (error) {
    store.setState({ loginFormError: (error as Error).message });
  } finally {
    store.setState({ isLoading: false });
  }
};

export const changeAvatar: DispatchStateHandler<any> = async (store, action) => {
  store.setState({ isLoading: true });

  try {
    let newUser = (await api.changeAvatar(action)) as UserDTO;

    if (apiError(newUser)) {
      throw new Error(newUser.reason);
    }

    const avatar = await getAvatar(newUser);

    if (apiError(avatar)) {
      throw new Error(avatar.reason);
    }

    newUser = { ...newUser, avatar };

    store.setState({ user: apiUserTransformers(newUser) });
  } catch (error) {
    window.store.setState({ loginFormError: (error as Error).message });
  } finally {
    window.router.upload();
    store.setState({ isLoading: false });
  }
};

export const getAvatar = async (user: UserDTO | UserType) => {
  if (!user.avatar) {
    return avatarDefault;
  }

  const blob = (await api.getAvatar(user.avatar)) as Blob;

  return URL.createObjectURL(blob);
};

export const getUserByLogin = async (login: string) => {
  try {
    const users = await api.getUserByLogin({ login });

    if (apiError(users)) {
      throw new Error(users.reason);
    }

    return users as UserDTO[];
  } catch (error) {
    window.store.setState({ loginFormError: (error as Error).message });
    return [];
  }
};
