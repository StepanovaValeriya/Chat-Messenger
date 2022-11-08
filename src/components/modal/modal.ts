import Block from "core/Block";
import "./modal";

interface ModalProps {
  id: string;
  title: string;
  inputName: string;
  inputId: string;
  buttonText: string;
  inputLabel: string;
  inputType: string;
  classError?: string;
  toggler?: () => void;
}

export class Modal extends Block<ModalProps> {
  static componentName = "Modal";

  render(): string {
    // language=hbs
    return `
      <div id="{{id}}" class="modal hidden">
        <div class="modal__wrapper">
          <div class="modal-content">
          {{{Button className="modal__cancel" text="X" onClick=onCancelModal type="button"}}}
            <h2 class="modal-content__title">{{title}}</h2>
            <div  class="modal-content__form">
              <div class="modal-form__fields-block">
                {{{ControlledInput
                  className="input__field"
                  ref="modalInputRef"
                  id=inputId
                  type=inputType
                  label=inputLabel
                  name=inputName
                }}}
                <span id="{{classError}}" class="hidden">Field cant't be empty</span>
                {{{Button type="submit" className="button__main" text=buttonText onClick=onSubmit}}}
              </div>
            </div>
          </div>
        </div>
      </div>`;
  }
}
