import { PATH } from "../constants/constAPI";
import queryStringify from "utils/queryStringify";

enum Methods {
  Get = "GET",
  Post = "POST",
  Put = "PUT",
  Delete = "DELETE",
}

type Options = {
  timeout?: number;
  data?: Record<string, any> | FormData;
  headers?: Record<string, string>;
  contentType?: string;
  responseType?: XMLHttpRequestResponseType;
};

export default class HTTPTransport {
  get = (
    url: string,
    queryParams?: Record<string, string>,
    options?: Options
  ) => {
    const urlWithParams = queryParams ? url + queryStringify(queryParams) : url;

    return this.request(
      PATH.BASE + urlWithParams,
      Methods.Get,
      undefined,
      undefined,
      options?.responseType
    );
  };

  post = (url: string, options?: Options) => {
    return this.request(PATH.BASE + url, Methods.Post, options?.data);
  };

  put = (url: string, options: Options) => {
    return this.request(
      PATH.BASE + url,
      Methods.Put,
      options.data,
      options?.contentType
    );
  };

  delete = (url: string, options: Options) => {
    return this.request(PATH.BASE + url, Methods.Delete, options.data);
  };

  request = <T extends any>(
    url: string,
    method: Methods,
    data?: Record<string, string> | FormData,
    contentType: string = "application/json",
    responseType: XMLHttpRequestResponseType = "json",
    timeout: number = 5000
  ): Promise<T> => {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();

      xhr.open(method, url);
      xhr.responseType = responseType;
      contentType && xhr.setRequestHeader("Content-Type", contentType);
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
        return;
      }

      if (data instanceof FormData) {
        xhr.send(data);
        return;
      }

      xhr.send(JSON.stringify(data));
    });
  };
}
