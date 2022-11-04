import Block from "core/Block";
import "./modal";

interface ModalProps {
  id: string;
  title: string;
  inputName: string;
  inputId: string;
  formId?: string;
  buttonText: string;
  inputLabel: string;
  inputType: string;
  toggler?: () => void;
}

export class Modal extends Block {
  static componentName = "Modal";

  constructor({ toggler, ...rest }: ModalProps) {
    super({ events: { click: toggler }, ...rest });
  }

  render(): string {
    // language=hbs
    return `
      <div id="{{id}}" class="modal hidden">
        <div class="modal__wrapper">
          <div class="modal-content">
            <h2 class="modal-content__title">{{title}}</h2>
            <form id="{{formId}}" class="modal-content__form">
              <div class="modal-form__fields-block">
                {{{ControlledInput
                  className="input__field"
                  ref="modalInputRef"
                  id=inputId
                  type=inputType
                  label=inputLabel
                  name=inputName
                }}}
                {{{Button type="submit" className="button__main" text=buttonText onClick=onSubmit}}}
              </div>
            </form>
          </div>
        </div>
      </div>`;
  }
}
