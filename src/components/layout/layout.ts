import Block from "core/Block";
import "./layout";
interface LayoutProps {}

export class Layout extends Block<LayoutProps> {
  static componentName: "Layout";
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
