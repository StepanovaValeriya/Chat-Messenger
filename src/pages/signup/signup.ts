import Block from "core/Block";
import Validate from "core/Validation";

export class SignUpPage extends Block {
  static componentName = "SignUpPage";
  constructor() {
    super({});
  }
  protected getStateFromProps() {
    this.state = {
      values: {
        email: "",
        login: "",
        first_name: "",
        second_name: "",
        phone: "",
        password: "",
        passwordSecond: "",
      },
      errors: {
        email: "",
        login: "",
        first_name: "",
        second_name: "",
        phone: "",
        password: "",
        passwordSecond: "",
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
        if (element.id === "email") {
          this.refs.emailInputRef.refs.errorRef.setProps({ text: message });
        }
        if (element.id === "login") {
          this.refs.loginInputRef.refs.errorRef.setProps({ text: message });
        }
        if (element.id === "first_name") {
          this.refs.FirstNameInputRef.refs.errorRef.setProps({ text: message });
        }
        if (element.id === "second_name") {
          this.refs.SecondNameInputRef.refs.errorRef.setProps({
            text: message,
          });
        }
        if (element.id === "phone") {
          this.refs.phoneInputRef.refs.errorRef.setProps({ text: message });
        }
        if (element.id === "password") {
          this.refs.passwordInputRef.refs.errorRef.setProps({ text: message });
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
          const message = Validate(newValues[key], key);
          if (message) {
            isValid = false;
            newErrors[key] = message;
          }
        });
        if (this.state.values.password !== this.state.values.passwordSecond) {
          newErrors.passwordSecond = "Passwords are not equal";
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
          window.location.href = "/chat";
        }
      },
    };
  }
  render() {
    const { errors, values } = this.state;
    // language=hbs
    return `
      {{#Layout name="SignUp" }}
        <div class="page__login _page">
          <div class="auth">
            <h1 class="auth__title">Sign In</h1>
            <form class="auth__form">
              {{{ControlledInput
                className="input__field"
                onBlur=onBlur
                onFocus=onFocus
                onInput=onInput
                ref="emailInputRef"
                value="${values.email}"
                error="${errors.email}"
                id="email"
                type="text"
                label="Email"
                name="email"
              }}}
              {{{ControlledInput
                className="input__field"
                onBlur=onBlur
                onFocus=onFocus
                onInput=onInput
                value="${values.login}"
                error="${errors.login}"
                ref="loginInputRef"
                id="login"
                type="login"
                label="Login"
                name="login"
              }}}
              {{{ControlledInput
                className="input__field"
                onBlur=onBlur
                onFocus=onFocus
                onInput=onInput
                value="${values.first_name}"
                error="${errors.first_name}"
                ref="FirstNameInputRef"
                id="first_name"
                type="text"
                label="First Name"
                name="first_name"
              }}}
              {{{ControlledInput
                className="input__field"
                onBlur=onBlur
                onFocus=onFocus
                onInput=onInput
                value="${values.second_name}"
                error="${errors.second_name}"
                ref="SecondNameInputRef"
                id="second_name"
                type="text"
                label="Second Name"
                name="second_name"
              }}}
              {{{ControlledInput
                className="input__field"
                onBlur=onBlur
                onFocus=onFocus
                onInput=onInput
                value="${values.phone}"
                error="${errors.phone}"
                ref="phoneInputRef"
                id="phone"
                type="tel"
                label="Phone"
                name="phone"
              }}}
              {{{ControlledInput
                className="input__field"
                onBlur=onBlur
                onFocus=onFocus
                onInput=onInput
                value="${values.password}"
                error="${errors.password}"
                ref="passwordInputRef"
                id="password"
                type="password"
                label="Password"
                name="password"
              }}}
              {{{ControlledInput
                className="input__field"
                onBlur=onBlur
                onFocus=onFocus
                onInput=onInput
                value="${values.passwordSecond}"
                error="${errors.passwordSecond}"
                ref="passwordSecondInputRef"
                id="passwordSecond"
                type="password"
                label="Repeat password"
                name="passwordSecond"
              }}}
            </form>
            {{{Button
              text="Sign Up"
              onClick=onSubmit
              className="button__main"
            }}}
            {{{Link
              className="auth__link"
              text="Enter"
              to="/login"
            }}}
         </div>
        </div>
      {{/Layout}}
    `;
  }
}
