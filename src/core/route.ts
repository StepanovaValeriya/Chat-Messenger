import { BlockConstructable } from "./registerComponent";
import { isEqual } from "utils/isEqual";

export interface RouteProps {
  pathname: string;
  view: BlockConstructable;
  isPrivate: boolean;
  callback: Function;
}

export default class Route {
  pathname: string;
  view: BlockConstructable;
  isPrivate: boolean;
  callback: Function;

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
