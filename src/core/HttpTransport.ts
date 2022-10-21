enum Method {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  PATCH = "PATCH",
  DELETE = "DELETE",
}

type Options = {
  method: Method;
  includeCredentials?: boolean;
  data?: any;
  timeout?: number;
  headers?: Record<string, string>;
};

type OptionsWithoutMethod = Omit<Options, "method">;

export class HTTPTransport {
  public baseUrl: string;
  private static _instance: HTTPTransport;

  static getInstance() {
    if (!this._instance) {
      this._instance = new HTTPTransport("https://ya-praktikum.tech/api/v2");
    }
    return this._instance;
  }
  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }
  get = (path: string, options: OptionsWithoutMethod = {}) => {
    if (options.data) {
      return this.request(
        `${path}${queryStringify(options.data)}`,
        { ...options, method: Method.GET },
        options.timeout
      );
    }
    return this.request(
      path,
      { ...options, method: Method.GET },
      options.timeout
    );
  };
  post = (path: string, options: OptionsWithoutMethod = {}) => {
    return this.request(
      path,
      { ...options, method: Method.POST },
      options.timeout
    );
  };
  put = (path: string, options: OptionsWithoutMethod = {}) => {
    return this.request(
      path,
      { ...options, method: Method.PUT },
      options.timeout
    );
  };
  delete = (path: string, options: OptionsWithoutMethod = {}) => {
    return this.request(
      path,
      { ...options, method: Method.DELETE },
      options.timeout
    );
  };

  request(
    path: string,
    options: Options = { method: Method.GET },
    timeout = 0
  ) {
    const { headers = {}, includeCredentials = true, method, data } = options;
    const url = this.baseUrl + path;
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open(method, url);
      xhr.withCredentials = includeCredentials;
      Object.keys(headers).forEach((key) => {
        xhr.setRequestHeader(key, headers[key]);
      });

      xhr.onload = function () {
        resolve(xhr);
      };

      xhr.onabort = reject;
      xhr.onerror = reject;

      xhr.timeout = timeout;
      xhr.ontimeout = reject;

      if (method === Method.GET || !data) {
        xhr.send();
      } else {
        xhr.send(data);
      }
    });
  }
}
