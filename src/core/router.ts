import renderDOM from "./renderDom";
import Route from "./route";

interface IRouter {
  routes: Array<Route>;
}
export default class Router implements IRouter {
  routes: Array<Route> = [];

  static __instance: IRouter;

  constructor() {
    Router.__instance = this;
    window.onpopstate = () => {
      this.onRouteChange.call(this);
    };
  }

  use(props: PartialRouteProps, callback: () => void) {
    const routeProps = { ...props, callback } as RouteProps;
    const route = new Route(routeProps);

    this.routes.push(route);

    return this;
  }

  start() {
    window.onpopstate = () => {
      this.onRouteChange.call(this);
    };

    this.onRouteChange();
  }

  onRouteChange(pathname: string = window.location.pathname) {
    const route = this.getRoute(pathname) || this.getRoute("/error");

    window.store.setState({ view: route?.view, currentPath: route?.pathname });

    route?.callback();
  }

  go(pathname: string) {
    window.history.pushState({}, "", pathname);
    this.onRouteChange(pathname);
  }

  upload() {
    const Page = window.store.getState().view;

    renderDOM(new Page({}));
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
