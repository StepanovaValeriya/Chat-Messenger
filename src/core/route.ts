import { BlockConstructable } from "./registerComponent";
import { isEqual } from "utils/isEqual";

export interface RouteProps {
  pathname: string;
  view: BlockConstructable;
  isPrivate: boolean;
  callback: Function;
}

export default class Route {
  private _pathname: string;
  private _blockClass: BlockConstructable;
  private _isPrivate: boolean;
  callback: Function;

  constructor({ pathname, view, isPrivate, callback }: RouteProps) {
    this._pathname = pathname;
    this._blockClass = view;
    this._isPrivate = isPrivate;
    this.callback = callback;
  }

  match(pathname: string): boolean {
    return isEqual(pathname, this._pathname);
  }
}
