import { isObject } from "./isObject";

type StringIndexed = Record<string, any>;

function stringifyPrimitive(
  key: string,
  value: number | string | boolean,
  postfix = ""
) {
  return postfix ? `${key}[${postfix}]=${value}` : `${key}=${value}`;
}

function stringifyObject(prefix: string, object: object): string {
  if (Array.isArray(object)) {
    const flattenArray = object.map((item, index) => {
      if (typeof item !== "object") {
        return stringifyPrimitive(prefix, item, String(index));
      }

      return stringifyObject(String(index), item);
    });

    return flattenArray.join("&");
  }

  return Object.entries(object)
    .map(([key, value]) => {
      if (typeof value !== "object" && value !== null) {
        return stringifyPrimitive(prefix, value, key);
      }

      return stringifyObject(`${prefix}[${key}]`, value);
    })
    .join("&");
}

function queryStringify(data: StringIndexed): string | never {
  if (!isObject(data)) {
    throw new Error("input must be an object");
  }

  const params = Object.entries(data).map(([key, value]) => {
    if (typeof value !== "object" && value !== null) {
      return stringifyPrimitive(key, value);
    }

    return stringifyObject(key, value);
  });

  return params.join("&");
}

export default queryStringify;
