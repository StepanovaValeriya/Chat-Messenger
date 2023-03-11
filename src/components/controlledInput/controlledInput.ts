import { InputError } from "components/inputError/inputError";
import { Input } from "components/input/input";
import { Validator } from "core/Validation";
import Block from "../../core/Block";
import "./controlledInput.scss";

type IncomingControlledInputProps = {
  type?: "text" | "password" | "email" | "tel" | "search" | "file";
  value?: string;
  error?: string;
  label?: string;
  text?: string;
  id?: string;
  name?: string;
  className?: string;
};

type ControlledInputProps = IncomingControlledInputProps & {
  onInput?: (e: FocusEvent) => void;
  onFocus?: (e: FocusEvent) => void;
  onBlur?: (e: FocusEvent) => void;
};

type ControlledInputRefs = {
  inputRef: Input;
  errorRef: InputError;
};

export class ControlledInput extends Block<ControlledInputProps, ControlledInputRefs> {
  static componentName = "ControlledInput";

  constructor(props: ControlledInputProps) {
    const formValidate = (e: FocusEvent) => {
      const inputEl = e.target as HTMLInputElement;
      const errorText = Validator(inputEl.name, inputEl.value);
      if (errorText) {
        this.refs.errorRef.setProps({
          text: errorText,
        });
      } else {
        this.refs.errorRef.setProps({
          text: "",
        });
      }
    };

    super({
      error: "",
      ...props,
      onBlur: (e: FocusEvent) => {
        formValidate(e);
      },
      onInput: (e: FocusEvent) => {
        formValidate(e);
      },
    });
  }

  protected render(): string {
    // language=hbs
    return `
      <div class="controlled__inputs input">
        <label class="input__label" for={{name}}>{{label}}</label>
        {{{Input
          className="{{className}}"
          type="{{type}}"
          id="{{id}}"
          name="{{name}}"
          attrs=attrs
          value=value
          onFocus=onFocus
          onInput=onInput
          onBlur=onBlur
        }}}
        {{{InputError isValid=true ref="errorRef" text=error}}}
      </div>
    `;
  }
}
