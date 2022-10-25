import { PATH } from "../constants/constAPI";

enum Methods {
  Get = "GET",
  Post = "POST",
  Put = "PUT",
  Delete = "DELETE",
}

type Options = {
  timeout?: number;
  data?: Record<string, any>;
  headers?: Record<string, string>;
};

export default class HTTPTransport {
  get = (url: string, queryParams?: Record<string, string>) => {
    const urlWithParams = queryParams ? url + queryStringify(queryParams) : url;

    return this.request(PATH.BASE + urlWithParams, Methods.Get);
  };

  post = (url: string, options?: Options) => {
    console.log(options);
    return this.request(PATH.BASE + url, Methods.Post, options?.data);
  };

  put = (url: string, options: Options) => {
    return this.request(PATH.BASE + url, Methods.Put, options.data);
  };

  delete = (url: string, options: Options) => {
    return this.request(PATH.BASE + url, Methods.Delete, options.data);
  };

  request = <T extends any>(
    url: string,
    method: Methods,
    data?: Record<string, string>,
    timeout: number = 5000
  ): Promise<T> => {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();

      xhr.open(method, url);
      xhr.responseType = "json";
      xhr.setRequestHeader("Content-Type", "application/json");
      xhr.timeout = timeout;
      xhr.withCredentials = true;

      xhr.onload = () => {
        resolve(xhr.response);
      };

      xhr.onerror = reject;
      xhr.onabort = reject;
      xhr.ontimeout = reject;

      if (method === Methods.Get || !data) {
        xhr.send();
      } else {
        xhr.send(JSON.stringify(data));
      }
    });
  };
}
