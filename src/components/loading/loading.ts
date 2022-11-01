import Block from "core/Block";
import "./loading.scss";

export class Loader extends Block {
  static componentName: string = "Loading";

  render() {
    // language=hbs
    return `
        <div class="loader">
            <div class="oader__text">Loading
            <div>.</div>
            <div>.</div>
            <div>.</div>
            </div>
        </div>
        `;
  }
}
