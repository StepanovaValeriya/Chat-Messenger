enum METHODS {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE",
}

type Options = {
  method: METHODS;
  timeout?: number;
  data?: { [key: string]: string };
  headers?: { [key: string]: string };
};

export default class HTTPTransport {
  get = (url: string, options: Options = { method: METHODS.GET }) => {
    const urlWithParams = options.data
      ? url + queryStringify(options.data)
      : url;

    return this.request(
      urlWithParams,
      { ...options, method: METHODS.GET },
      options.timeout
    );
  };

  post = (url: string, options: Options = { method: METHODS.POST }) => {
    return this.request(
      url,
      { ...options, method: METHODS.POST },
      options.timeout
    );
  };

  put = (url: string, options: Options = { method: METHODS.PUT }) => {
    return this.request(
      url,
      { ...options, method: METHODS.PUT },
      options.timeout
    );
  };

  delete = (url: string, options: Options = { method: METHODS.DELETE }) => {
    return this.request(
      url,
      { ...options, method: METHODS.DELETE },
      options.timeout
    );
  };

  request = (
    url: string,
    options: Options = { method: METHODS.GET },
    timeout = 5000
  ): Promise<XMLHttpRequest> => {
    const { method, data, headers = {} } = options;

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();

      xhr.open(method, url);
      xhr.responseType = "json";

      const headersEntries = Object.entries(headers);

      headersEntries.forEach((item) => {
        xhr.setRequestHeader(item[0], item[1]);
      });

      xhr.timeout = timeout;

      xhr.onload = () => {
        resolve(xhr.response);
      };

      xhr.onerror = reject;
      xhr.onabort = reject;
      xhr.ontimeout = reject;

      if (method === METHODS.GET || !data) {
        xhr.send();
      } else {
        xhr.send(JSON.stringify(data));
      }
    });
  };
}
