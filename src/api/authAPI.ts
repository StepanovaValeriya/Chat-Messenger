import { ROUTES } from "../constants/routes";
import { HTTPTransport } from "core/HttpTransport";

export const authAPI = {
  signIn: async (data: any): Promise<boolean> => {
    const res: any = await HTTPTransport.getInstance().post("/auth/signin", {
      includeCredentials: true,
      data: JSON.stringify(data),
      headers: { "content-type": "application/json" },
    });
    if (res.status !== 200) {
      return JSON.parse(res.responseText);
    }
    return res;
  },

  signUp: async (data: any): Promise<boolean> => {
    const res: any = await HTTPTransport.getInstance().post("/auth/signup", {
      includeCredentials: true,
      data: JSON.stringify(data),
      headers: { "content-type": "application/json" },
    });

    if (res.status !== 200) {
      throw Error(JSON.parse(res.responseText).reason);
    }
    return true;
  },

  logout: async () => {
    console.log("Logout successfully developed");
    const res: any = await HTTPTransport.getInstance().post("/auth/logout", {
      includeCredentials: true,
      headers: {
        accept: "application/json",
      },
    });
    if (res.status !== 200) {
      throw Error(JSON.parse(res.responseText).reason);
    }
  },

  getUser: async () => {
    const res: any = await HTTPTransport.getInstance().get("/auth/user", {
      includeCredentials: true,
      headers: {
        accept: "application/json",
      },
    });
    //TODO: тест вариант
    if (res.status !== 200) {
      if (
        window.location.pathname !== ROUTES.SignUp &&
        window.location.pathname !== ROUTES.Login
      ) {
        window.router.go(ROUTES.Main);
      }
      throw Error(JSON.parse(res.responseText).reason);
    }
    return JSON.parse(res.response);
  },
};
