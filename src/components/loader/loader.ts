import Block from "core/Block";
import "./loader.scss";

export class Loader extends Block {
  static componentName: string = "Loader";

  render() {
    // language=hbs
    return `
    <div class="loader">
      <div class="lds-ring"><div></div><div></div><div></div><div></div></div>
    </div>

        `;
  }
}
