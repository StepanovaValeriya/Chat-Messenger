import { APIError } from "api/types";

export const apiError = (response: unknown | APIError): response is APIError => {
  if (response) {
    return Object.prototype.hasOwnProperty.call(response, "reason");
  }

  return false;
};
