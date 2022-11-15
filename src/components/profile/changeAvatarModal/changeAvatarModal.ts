import Block from "core/Block";

type ChangeAvatarModalProps = {
  inputName: string;
  buttonText: string;
  classError?: string;
  toggler?: () => void;
};

export class ChangeAvatarModal extends Block<ChangeAvatarModalProps> {
  static componentName = "ChangeAvatarModal";

  protected getStateFromProps() {
    this.state = {
      onCancelModal: () => {
        document.querySelector(".modal")?.classList.add("hidden");
      },
    };
  }

  render(): string {
    // language=hbs
    return `
      <div id="modal-change-avatar" class="modal hidden">
        <div class="modal__wrapper">
          <div class="modal-content">
          {{{Button className="modal__cancel" text="X" onClick=onCancelModal type="button"}}}
            <h2 class="modal-content__title">Choose file</h2>
            <form id="user_form_avatar" class="modal-content__form">
              <div class="modal-form__fields-block">
                {{{ControlledInput
                  className="input__field"
                  ref="modalInputRef"
                  id="avatar"
                  type="file"
                  label="Choose file"
                  name=inputName
                }}}
                <span id="{{classError}}" class="hidden">Choose file</span>
                {{{Button type="submit" className="button__main" text=buttonText onClick=onSubmit}}}
              </div>
            </form>
          </div>
        </div>
      </div>`;
  }
}
