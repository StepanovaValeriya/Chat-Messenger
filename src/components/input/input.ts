import Block from "../../core/Block";

import "./input";

interface InputProps {
  onBlur?: () => void;
  onInput?: () => void;
  onFocus?: () => void;
  type?: "text" | "password" | "email" | "tel";
  text?: string;
  id?: string;
  error?: string;
  name?: string;
  value?: string;
}

export class Input extends Block {
  static componentName: "Input";
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
          class="input__field"
          type={{type}}
          id={{id}}
          name={{name}}
          value={{value}}
        >
    `;
  }
}
