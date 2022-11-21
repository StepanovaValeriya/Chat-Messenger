import { isEqual } from "utils/isEqual";
import { BlockConstructable } from "./registerComponent";

export default class Route {
  pathname: string;

  view: BlockConstructable;

  isPrivate: boolean;

  callback: () => void;

  constructor({ pathname, view, isPrivate, callback }: RouteProps) {
    this.pathname = pathname;
    this.view = view;
    this.isPrivate = isPrivate;
    this.callback = callback;
  }

  match(pathname: string): boolean {
    return isEqual(pathname, this.pathname);
  }
}
