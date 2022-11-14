import Block from "../../core/Block";

import "./inputError.scss";

type InputErrorProps = {
  text?: string;
};

export default class InputError extends Block<InputErrorProps> {
  static componentName = "InputError";

  protected render(): string {
    // language=hbs
    return `
      <span class="input__error">{{#if text}}{{text}}{{/if}}</span>
    `;
  }
}
