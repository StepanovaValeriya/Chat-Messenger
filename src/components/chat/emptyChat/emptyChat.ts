import Block from "core/Block";
import "./emptyChat";

export default class EmptyChat extends Block {
  static componentName: "EmptyChat";

  protected render(): string {
    // language=hbs
    return `
      <p class="chat__tape__empty">Select a chat to send a message</p>
    `;
  }
}
