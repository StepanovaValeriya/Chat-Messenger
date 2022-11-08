import Block from "../../core/Block";

import "./input";

type InputProps = {
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
};

export class Input extends Block {
  static componentName = "Input";

  constructor({ onInput, onBlur, onFocus, ...props }: InputProps) {
    super({
      ...props,
      events: { input: onInput, blur: onBlur, focus: onFocus },
    });
  }

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
