import HTTPTransport from "core/HttpTransport";
import { LoginRequestData, ResponseData, SignupRequestData } from "./types";

export default class AuthAPI extends HTTPTransport {
  constructor() {
    super();
  }
  signin = async (data: LoginRequestData): Promise<ResponseData> =>
    this.post("auth/signin", { data }) as Promise<ResponseData>;

  getUserInfo = async () => this.get("auth/user");

  signout = () => this.post("auth/logout");

  signup = async (data: SignupRequestData): Promise<ResponseData> =>
    this.post("auth/signup", { data }) as Promise<ResponseData>;
}
