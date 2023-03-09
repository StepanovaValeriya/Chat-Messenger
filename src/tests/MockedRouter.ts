import { Router } from "core";

export default class MockedRouter extends Router {
  go(pathname: string) {
    window.history.pushState({}, "", pathname);
    this.onRouteChange(pathname);
  }
}
