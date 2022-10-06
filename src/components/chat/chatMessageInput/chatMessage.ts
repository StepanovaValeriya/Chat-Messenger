import Block from "core/Block";
import Validate from "core/Validation";
import "./chatMessage";

interface ChatMessageProps {
  clipPath: string;
}

export default class ChatMessageInput extends Block {
  static componentName: "ChatMessageInput";
  constructor({ clipPath }: ChatMessageProps) {
    super({ clipPath });
  }

  protected getStateFromProps() {
    this.state = {
      values: {
        message: "",
      },
      errors: {
        message: "",
      },
      handleErrors: (
        values: { [key: string]: number },
        errors: { [key: string]: number }
      ) => {
        const nextState = {
          errors,
          values,
        };
        this.setState(nextState);
      },
      onFocus: (e: Event) => {
        this.refs.errorRef.setProps({ text: "" });
      },
      formValid: () => {
        let isValid = true;
        const newValues = { ...this.state.values };
        const newErrors = { ...this.state.errors };
        Object.keys(this.state.values).forEach((key) => {
          let input = this.element?.querySelector(
            `input[name='${key}']`
          ) as HTMLInputElement;
          newValues[key] = input.value;
          const messages = Validate(newValues[key], key);
          console.log(messages);
          if (messages) {
            isValid = false;
            newErrors[key] = messages;
          }
        });

        this.state.handleErrors(newValues, newErrors);

        return isValid;
      },
      onSubmit: (e: Event) => {
        e.preventDefault();
        console.log("sub");
        if (this.state.formValid()) {
          console.log("submit", this.state.values);
        }
      },
    };
  }

  protected render(): string {
    const { errors, values } = this.state;
    // language=hbs
    return `
      <div class="chat__message">
        <button class="chat__message__actions">
          <img src="{{clipPath}}" alt="clip" />
        </button>
        {{{Input
          className="chat__message__input"
          ref="message"
          value=""
          error=""
          id="message"
          name="message"
          type="text"
          placeholder="Message"
          onFocus=onFocus
        }}}
        {{{Button
          onClick=onSubmit
          text=">"
          className="chat__message__send"
        }}}
        {{{InputError ref="errorRef" text="${errors.message}"}}}
      </div>

    `;
  }
}
