import Block from "core/Block";
import "./loader.scss";

type LoaderProps = {};

export default class Loader extends Block<LoaderProps> {
  static componentName = "Loader";

  render() {
    // language=hbs
    return `
    <div class="loader">
      <div class="lds-ring"><div></div><div></div><div></div><div></div></div>
    </div>

        `;
  }
}
