import { APIError } from "api/types";

export const apiError = (response: any | APIError): response is APIError => {
  return response && response.reason ? true : false;
};
