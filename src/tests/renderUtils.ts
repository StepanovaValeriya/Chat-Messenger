/* eslint-disable @typescript-eslint/no-explicit-any */
import { BlockClass, renderDOM, registerComponent, Store } from "core";
import { defaultState } from "store/index";
import { initRouter } from "services/initRouter";
import * as components from "components";
import { sleep } from "../utils/sleep";
import MockedRouter from "./MockedRouter";

type RenderBlockParams<T extends Record<string, any>> = {
  Block: BlockClass<T>;
  props: T;
  state?: Partial<AppState>;
};

export async function renderBlock<T extends Record<string, any>>({
  Block,
  props,
  state = defaultState,
}: RenderBlockParams<T>) {
  Object.values(components).forEach((Component: any) => {
    registerComponent(Component);
  });

  const store = new Store<AppState>({ ...defaultState, ...state });
  window.store = store;

  const router = new MockedRouter();
  window.router = router;

  document.body.innerHTML = '<div id="app"></div>';

  renderDOM(new Block(props));

  initRouter(router, store);

  await sleep();
}
