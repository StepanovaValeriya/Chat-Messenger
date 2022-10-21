import { APIError } from "api/types";

export function apiError(response: any): response is APIError {
  return response && response.reason;
}
