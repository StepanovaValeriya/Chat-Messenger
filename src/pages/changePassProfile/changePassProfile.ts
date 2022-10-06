import Block from "core/Block";
import Validate from "core/Validation";

export class ChangePassProfilePage extends Block {
  static componentName: "ChangePassProfilePage";
  constructor() {
    super();
  }
  protected getStateFromProps() {
    this.state = {
      values: {
        passwordOld: "",
        password: "",
        passwordRepeat: "",
      },
      errors: {
        passwordOld: "",
        password: "",
        passwordRepeat: "",
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
      onBlur: (e: FocusEvent) => {
        if (e.target) {
          console.log("blur");
          const element = e.target as HTMLInputElement;
          const message = Validate(element.value, element.id);
          const newValues = { ...this.state.values };
          const newErrors = { ...this.state.errors };
          newValues[element.id] = element.value;
          if (message) {
            newErrors[element.id] = message;
          }
          this.state.handleErrors(newValues, newErrors);
        }
      },

      onInput: (e: Event) => {
        const element = e.target as HTMLInputElement;
        const message = Validate(element.value, element.id);
        if (element.id === "password") {
          this.refs.passwordNewRef.refs.errorRef.setProps({ text: message });
        }
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
          console.log(input.value);
          const message = Validate(newValues[key], key);
          if (message) {
            isValid = false;
            newErrors[key] = message;
          }
        });
        if (this.state.values.password !== this.state.values.passwordRepeat) {
          newErrors.passwordRepeat = "Passwords are not equal";
        }

        if (!isValid) {
          this.state.handleErrors(newValues, newErrors);
        }
        return isValid;
      },
      onSubmit: (e: PointerEvent) => {
        console.log("sub");
        if (this.state.formValid()) {
          console.log("submit", this.state.values);
          window.location.href = "/profile";
        }
      },
    };
  }
  render() {
    const { errors, values } = this.state;
    // language=hbs
    return `
      {{#Layout name="Main" }}
        <div class="content profile">
          {{{ProfileNav}}}
          <div class="profile__main">
              <div class='profile__info'>
              {{{ControlledInput
                className="input__profile"
                label="Old password"
                value="${values.passwordOld}"
                type="password"
                id="passwordOld"
                name="passwordOld"
              }}}
              {{{ControlledInput
                className="input__profile"
                label="New password"
                value="${values.password}"
                error="${errors.password}"
                type="password"
                id="password"
                ref="passwordNewRef"
                name="password"
                onBlur=onBlur
                onFocus=onFocus
                onInput=onInput
              }}}
              {{{ControlledInput
                className="input__profile"
                label="Repeat password"
                value="${values.passwordRepeat}"
                error="${errors.passwordRepeat}"
                type="password"
                id="passwordRepeat"
                ref="passwordRepeatRef"
                name="passwordRepeat"
                onBlur=onBlur
                onFocus=onFocus
                onInput=onInput
              }}}
              </div>
              {{{Button
                className="button__main"
                text="Save"
                onClick=onSubmit
              }}}
          </div>
        </div>
      {{/Layout}}
    `;
  }
}
