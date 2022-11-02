import HTTPTransport from "core/HttpTransport";
import {
  LoginRequestData,
  ResStatus,
  SignupRequestData,
  APIError,
  UserDTO,
} from "./types";

export default class AuthAPI extends HTTPTransport {
  signin = async (data: LoginRequestData): Promise<ResStatus | APIError> =>
    this.post("auth/signin", { data }) as Promise<ResStatus | APIError>;

  getUserInfo = async (): Promise<UserDTO | APIError> =>
    this.get("auth/user") as Promise<UserDTO | APIError>;

  signout = (): Promise<ResStatus | APIError> =>
    this.post("auth/logout") as Promise<ResStatus | APIError>;

  signup = async (data: Partial<UserDTO>): Promise<{ id: number } | APIError> =>
    this.post("auth/signup", { data }) as Promise<{ id: number } | APIError>;
}
