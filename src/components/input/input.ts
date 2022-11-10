import Block from "../../core/Block";

import "./input";

type IncomingInputProps = {
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

type InputProps = {
  events: {
    blur?: EventListener;
    focus?: EventListener;
    input?: EventListener;
  };
  type?: "text" | "password" | "email" | "tel" | "search" | "file";
  text?: string;
  id?: string;
  error?: string;
  name?: string;
  value?: string;
  className?: string;
  placeholder?: string;
};

export default class Input extends Block<InputProps> {
  static componentName = "Input";

  constructor(props: IncomingInputProps) {
    const { onBlur, onFocus, onInput, ...rest } = props;

    super({
      ...rest,
      events: {
        blur: onBlur,
        focus: onFocus,
        input: onInput,
      },
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
