import { ROUTES } from "../constants/routes";
import { Block } from "core";
import Route from "./route";

export default class Router {
  public routes: Route[] = [];
  public history = window.history;
  private _currentRoute: Route | null = null;
  private _rootQuery!: string;
  public static __instance: Router;
  constructor(rootQuery: string) {
    if (Router.__instance) {
      return Router.__instance;
    }
    this.routes = [];
    this.history = window.history;
    this._currentRoute = null;
    this._rootQuery = rootQuery;

    Router.__instance = this;
  }

  use(pathname: string, block: typeof Block) {
    const route = new Route(pathname, block, { rootQuery: this._rootQuery });
    this.routes.push(route);
    return this;
  }

  start() {
    window.onpopstate = ((event: PopStateEvent) => {
      const target = event.currentTarget as Window;
      this._onRoute(target.location.pathname);
    }).bind(this);

    this._onRoute(window.location.pathname);
  }

  private _onRoute(pathname: string) {
    let route = this.getRoute(pathname);

    if (this._currentRoute) {
      this._currentRoute.leave();
    }
    if (route) {
      this._currentRoute = route;
      route.render();
    }
  }

  go(pathname: string) {
    console.log(pathname);
    this.history.pushState({}, "", pathname);
    this._onRoute(pathname);
  }

  back() {
    window.history.back();
  }

  forward() {
    window.history.forward();
  }

  getRoute(pathname: string) {
    const route = this.routes.find((route) => route.match(pathname));
    if (!route) {
      return this.routes.find((route) => route.match(ROUTES.Error));
    }
    return route;
  }
}
