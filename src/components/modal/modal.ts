import Block from "core/Block";
import "./modal";

interface ModalProps {
  id: string;
  title: string;
  inputName: string;
  inputId: string;
  buttonText: string;
  inputLabel: string;
  toggler?: () => void;
}

export class Modal extends Block {
  static componentName = "Modal";

  constructor({ toggler, ...rest }: ModalProps) {
    super({ events: { click: toggler }, ...rest });

    // this.setProps({
    //   formError: () => this.props.store.getState().formError,
    //   formSuccess: () => this.props.store.getState().formSuccess,
    //   isLoading: () => this.props.store.getState().isLoading,
    // });
  }

  render(): string {
    // language=hbs
    return `
      <div id="{{id}}" class="modal hidden">
        <div class="modal__wrapper">
          <div class="modal-content">
            <h2 class="modal-content__title">{{title}}</h2>
            <form class="modal-content__form">
              <div class="modal-form__fields-block">
                {{{ControlledInput
                  className="input__field"
                  ref="modalInputRef"
                  id=inputId
                  type="text"
                  label=inputLabel
                  name=inputName
                }}}
                {{{Button type="submit" className="button__main" text=buttonText}}}
              </div>
            </form>
          </div>
        </div>
      </div>`;
  }
}
