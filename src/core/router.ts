import { PartialRouteProps } from "../constants/routes";
import Route from "./route";

interface RouterProps {
  routes: Array<Route>;
}

export default class Router implements RouterProps {
  routes: Array<Route> = [];
  static __instance: Router;

  constructor() {
    if (Router.__instance) {
      return Router.__instance;
    }

    Router.__instance = this;
  }

  use(props: PartialRouteProps, callback: () => void) {
    const route = new Route({ ...props, callback });

    this.routes.push(route);

    return this;
  }

  start() {
    window.onpopstate = () => {
      this._onRouteChange.call(this);
    };

    this._onRouteChange();
  }

  private _onRouteChange(pathname: string = window.location.pathname) {
    console.log(pathname);
    let route = this.getRoute(pathname);

    if (!route) {
      route = this.getRoute("/");
    }

    window.store.setState({ view: route?.view });

    route?.callback();
  }

  go(pathname: string) {
    window.history.pushState({}, "", pathname);
    this._onRouteChange(pathname);
  }

  back() {
    window.history.back();
  }

  forward() {
    window.history.forward();
  }

  getRoute(pathname: string) {
    return this.routes.find((route) => route.match(pathname));
  }
}
