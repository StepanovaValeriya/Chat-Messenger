import Block from "../../core/Block";

import "./input";

interface InputProps {
  onBlur?: () => void;
  onInput?: () => void;
  onFocus?: () => void;
  type?: "text" | "password" | "email" | "tel" | "search" | "file";
  text?: string;
  id?: string;
  error?: string;
  name?: string;
  value?: string;
  className?: string;
  placeholder?: string;
}

export class Input extends Block<InputProps> {
  static componentName = "Input";

  protected render(): string {
    // language=hbs
    return `
        <input
          class={{className}}
          type={{type}}
          id={{id}}
          name={{name}}
          {{#if value}}value={{ value }}{{/if}}
          {{#if placeholder}}placeholder={{ placeholder }}{{/if}}
        >
    `;
  }
}
