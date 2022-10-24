import renderDOM from "core/renderDom";
import Block from "core/Block";
import { isEqual } from "utils/isEqual";
import { BlockConstructable } from "./registerComponent";

export default class Route<P = any> {
  private _pathname;
  private _blockClass: BlockConstructable;
  private _block: Nullable<Block<{}>>;
  private _props!: P;

  constructor(pathname: string, view: BlockConstructable, props: P) {
    this._pathname = pathname;
    this._blockClass = view;
    this._block = null;
    this._props = props;
  }

  navigate(pathname: string) {
    if (this.match(pathname)) {
      this._pathname = pathname;
      this.render();
    }
  }

  leave() {
    if (this._block) {
      this._block.hide();
    }
  }

  match(pathname: string): boolean {
    return isEqual(pathname, this._pathname);
  }

  render() {
    if (!this._block) {
      this._block = new this._blockClass(this._props);
      renderDOM(this._block);
      return;
    }
    this._block.show();
  }
}
