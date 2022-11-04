import {
  ChangePasswordRequestData,
  UserDTO,
  DispatchStateHandler,
} from "api/types";
import UserAPI from "api/userAPI";
import { apiError } from "helpers/apiError";
import { apiUserTransformers } from "helpers/apiUserTransformers";
import { avatarDefault } from "../constants/avatarDefault";

const api = new UserAPI();

export const changeUserProfile: DispatchStateHandler<Partial<UserDTO>> = async (
  store,
  action
) => {
  store.setState({ isLoading: true });

  try {
    const response = await api.changeProfile(action);

    if (apiError(response)) {
      throw new Error(response.reason);
    }

    const avatar = store.getState()?.user?.avatar || avatarDefault;

    const updatedUser = {
      ...apiUserTransformers(response as UserDTO),
      avatar,
    };

    store.setState({
      user: updatedUser,
    });

    window.router.back();
  } catch (error) {
    store.setState({ loginFormError: (error as Error).message });
  } finally {
    store.setState({ isLoading: false });
  }
};

export const changeUserPassword: DispatchStateHandler<
  ChangePasswordRequestData
> = async (store, action) => {
  store.setState({ isLoading: true });

  try {
    const response = await api.changePassword(action);

    if (apiError(response)) {
      throw new Error(response.reason);
    }

    window.router.back();
  } catch (error) {
    store.setState({ loginFormError: (error as Error).message });
  } finally {
    store.setState({ isLoading: false });
  }
};

export const changeAvatar: DispatchStateHandler<FormData> = async (
  store,
  action
) => {
  store.setState({ isLoading: true });

  try {
    let newUser = (await api.changeAvatar(action)) as UserDTO;
    console.log(newUser);

    if (apiError(newUser)) {
      throw new Error(newUser.reason);
    }

    const avatar = await getAvatar(newUser);
    console.log(avatar);

    if (apiError(avatar)) {
      throw new Error(avatar.reason);
    }

    newUser = { ...newUser, avatar };
    console.log(newUser);

    store.setState({ user: apiUserTransformers(newUser) });
  } catch (error) {
    window.store.setState({ loginFormError: (error as Error).message });
  } finally {
    window.router.reload();
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
  }
};
