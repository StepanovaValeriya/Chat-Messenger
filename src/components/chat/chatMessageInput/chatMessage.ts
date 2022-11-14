import Block from "core/Block";
import Validate from "core/Validation";
import { toggleAttachWindow } from "utils/dom";
import { sendMessage } from "services/chats";
import { Store } from "core/store";
import Router from "core/router";
import { WithStore } from "helpers";
import "./chatMessage.scss";

type ChatMessageProps = {
  router: Router;
  store: Store<AppState>;
  user: UserType | null;
  chats: Nullable<Array<ChatType>>;
  toggleAttachWindow: () => void;
};

class ChatMessageInput extends Block<ChatMessageProps> {
  static componentName = "ChatMessageInput";

  constructor(props: ChatMessageProps) {
    super({ ...props, toggleAttachWindow });
  }

  protected getStateFromProps() {
    this.state = {
      values: {
        message: "",
      },
      errors: {
        message: "",
      },
      handleErrors: (values: { [key: string]: number }, errors: { [key: string]: number }) => {
        const nextState = {
          errors,
          values,
        };
        this.setState(nextState);
      },
      onFocus: () => {
        this.refs.errorRef.setProps({ text: "" });
      },
      formValid: () => {
        let isValid = true;
        const newValues = { ...this.state.values };
        const newErrors = { ...this.state.errors };
        Object.keys(this.state.values).forEach((key) => {
          const input = this.element?.querySelector(`input[name='${key}']`) as HTMLInputElement;
          newValues[key] = input.value;
          const messages = Validate(newValues[key], key);
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
        if (this.state.formValid()) {
          let { message } = this.state.values;
          const chat = this.props.store.getState().selectedChat;
          if (chat) {
            sendMessage(message, chat);
          }
          message = "";
        }
      },
    };
  }

  protected render(): string {
    const { errors } = this.state;
    // language=hbs
    return `
      <div class="chat__message">
      {{{Button className="chat__message__actions" onClick=toggleAttachWindow}}}
          <img src="/img/clipChat.png" alt="clip" />
        <ul class="chat__message__options options hidden">
          <li class="options__item">
            {{{Button className="options__button" type="button" text="Photo or Video"}}}
            <img src="/img/image.png" alt="action">
          </li>
          <li class="options__item">
            {{{Button  className="options__button" type="button" text="File"}}}
            <img src="/img/file.png" alt="action">
          </li>
          <li class="options__item">
            {{{Button className="options__button" type="button" text="Location"}}}
            <img src="/img/location.png" alt="action">
          </li>
      </ul>
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
export default WithStore(ChatMessageInput);
