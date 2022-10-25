import HTTPTransport from "core/HttpTransport";
import {
  ChangePasswordRequestData,
  ChangeProfileRequestData,
  ResponseData,
} from "api/types";

export default class UserAPI extends HTTPTransport {
  constructor() {
    super();
  }
  changeProfile = async (
    data: ChangeProfileRequestData
  ): Promise<ResponseData> =>
    this.put("user/profile", { data }) as Promise<ResponseData>;

  changeAvatar = () => this.get("auth/user");

  changePassword = async (
    data: ChangePasswordRequestData
  ): Promise<ResponseData> =>
    this.put("user/password", { data }) as Promise<ResponseData>;

  getUserById = () => {};
}
