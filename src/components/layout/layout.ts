import Block from "core/Block";
import "./layout.scss";

export default class Layout extends Block<{}> {
  static componentName = "Layout";

  protected render(): string {
    // language=hbs
    return `
    <div class="wrapper">
      <main class="page" data-layout=1>
      </main>
    </div>
    `;
  }
}
