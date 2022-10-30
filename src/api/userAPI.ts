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

  changeAvatar = async (data: FormData): Promise<ResponseData> =>
    this.put("user/profile/avatar", {
      data,
      contentType: "",
    }) as Promise<ResponseData>;

  getAvatar = async (path: string) =>
    this.get(`resources/${path.slice(1)}`, {}, { responseType: "blob" });

  changePassword = async (
    data: ChangePasswordRequestData
  ): Promise<ResponseData> =>
    this.put("user/password", { data }) as Promise<ResponseData>;

  getUserByLogin = async (
    data: Record<string, string>
  ): Promise<ResponseData> =>
    this.post("user/search", { data }) as Promise<ResponseData>;
}
