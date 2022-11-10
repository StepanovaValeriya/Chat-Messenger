import { Router } from "core";

export default class MockedRouter extends Router {
  go(pathname: string) {
    console.log("go to ", pathname);
    window.history.pushState({}, "", pathname);
    this._onRouteChange(pathname);
  }
}
