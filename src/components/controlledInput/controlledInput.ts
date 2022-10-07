import Block from "../../core/Block";
import "./controlledInput";

interface ControlledInputProps {
  onInput?: () => void;
  onFocus?: () => void;
  type?: "text" | "password" | "email" | "tel" | "search";
  value?: string;
  error?: string;
  label?: string;
  text?: string;
  id?: string;
  name?: string;
  className?: string;
}

export class ControlledInput extends Block {
  static componentName = "ControlledInput";
  constructor(props: ControlledInputProps) {
    super({
      ...props,
    });
  }

  protected render(): string {
    // language=hbs
    return `
      <div class="auth__inputs input">
        <label class="input__label" for={{name}}>{{label}}</label>
        {{{Input
          className="{{className}}"
          type="{{type}}"
          id="{{id}}"
          name="{{name}}"
          value=value
          onFocus=onFocus
          onInput=onInput
          onBlur=onBlur
        }}}
        {{{InputError ref="errorRef" text=error}}}
      </div>
    `;
  }
}
