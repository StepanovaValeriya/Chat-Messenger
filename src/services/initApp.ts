import type { Dispatch } from "core/store";
import { UserDTO } from "api/types";
import { authAPI } from "api/authAPI";
import { apiError } from "helpers/apiError";
import { transformUser } from "helpers/apiTransformers";

export async function initApp(dispatch: Dispatch<AppState>) {
  try {
    const response = await authAPI.getUser();

    if (apiError(response)) {
      return;
    }
    dispatch({ user: transformUser(response as UserDTO) });
  } catch (err) {
    console.error(err);
  } finally {
    dispatch({ appIsInited: true });
  }
}
