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

type HTTPMethod = (url: string, options?: Options) => Promise<unknown>;

export default class HTTPTransport {
  get = (
    url: string,
    queryParams?: Record<string, string>,
    options?: Options
  ) => {
    const urlWithParams = queryParams ? url + queryStringify(queryParams) : url;
    const getRequestOptions = { responseType: options?.responseType };
    return this.request(
      PATH.BASE + urlWithParams,
      Methods.Get,
      getRequestOptions
    );
  };

  post: HTTPMethod = (url, options = {}) => {
    return this.request(PATH.BASE + url, Methods.Post, options);
  };

  put: HTTPMethod = (url, options = {}) => {
    return this.request(PATH.BASE + url, Methods.Put, options);
  };

  delete: HTTPMethod = (url, options = {}) => {
    return this.request(PATH.BASE + url, Methods.Delete, options);
  };

  request = <T extends any>(
    url: string,
    method: Methods,
    options?: Options
  ): Promise<T> => {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();

      xhr.open(method, url);
      xhr.responseType = options?.responseType || "json";

      if (options?.contentType) {
        xhr.setRequestHeader("Content-Type", options?.contentType);
      }
      xhr.setRequestHeader("Content-Type", "application/json");

      xhr.timeout = options?.timeout || 5000;
      xhr.withCredentials = true;

      xhr.onload = () => {
        resolve(xhr.response);
      };

      xhr.onerror = reject;
      xhr.onabort = reject;
      xhr.ontimeout = reject;

      if (method === Methods.Get || !options?.data) {
        xhr.send();
        return;
      }

      if (options.data instanceof FormData) {
        xhr.send(options.data);
        return;
      }

      xhr.send(JSON.stringify(options.data));
    });
  };
}
