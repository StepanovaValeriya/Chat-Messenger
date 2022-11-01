import HTTPTransport from "core/HttpTransport";
import {
  APIError,
  ChangePasswordRequestData,
  ChangeProfileRequestData,
  ResStatus,
  UserDTO,
} from "api/types";

export default class UserAPI extends HTTPTransport {
  constructor() {
    super();
  }
  changeProfile = async (
    data: ChangeProfileRequestData
  ): Promise<UserDTO | APIError> =>
    this.put("user/profile", { data }) as Promise<UserDTO | APIError>;

  changeAvatar = async (data: FormData): Promise<UserDTO | APIError> =>
    this.put("user/profile/avatar", {
      data,
      contentType: "",
    }) as Promise<UserDTO | APIError>;

  getAvatar = async (path: string) =>
    this.get(`resources/${path.slice(1)}`, {}, { responseType: "blob" });

  changePassword = async (
    data: ChangePasswordRequestData
  ): Promise<ResStatus | APIError> =>
    this.put("user/password", { data }) as Promise<ResStatus | APIError>;

  getUserByLogin = async (
    data: Record<string, string>
  ): Promise<UserDTO | APIError> =>
    this.post("user/search", { data }) as Promise<UserDTO | APIError>;
}
