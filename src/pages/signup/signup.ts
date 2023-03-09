import Block from "core/Block";
import { Validator } from "core/Validation";
import { signup } from "services/auth";
import { WithRouter, WithStore } from "helpers";
import { Router, Store } from "core";

type SignUpPageProps = {
  router: Router;
  store: Store<AppState>;
  user: UserType | null;
  formError: () => void;
};

class SignUpPage extends Block<SignUpPageProps> {
  static componentName = "SignUpPage";

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
      onSubmit: this.onSubmit.bind(this),
      onLoginPage: () => {
        this.props.router.go("/login");
      },
    };
  }

  formValid() {
    let isValid = true;
    const newValues = { ...this.state.values };
    const newErrors = { ...this.state.errors };
    Object.keys(this.state.values).forEach((key) => {
      const input = this.element?.querySelector(`input[name='${key}']`) as HTMLInputElement;
      newValues[key] = input.value;
      const message = Validator(key, newValues[key]);
      if (message) {
        isValid = false;
        newErrors[key] = message;
      }
    });
    if (this.state.values.password !== this.state.values.passwordSecond) {
      newErrors.passwordSecond = "Passwords are not equal";
    }
    const newState = {
      values: newValues,
      errors: newErrors,
    };
    this.setState(newState);
    return { newState, isValid };
  }

  onSubmit() {
    if (this.formValid()) {
      signup(this.props.store, { ...this.state.values });
    }
  }

  render() {
    const { isLoading } = this.props.store.getState();
    const { errors, values } = this.state;
    // language=hbs
    return `
    {{#if ${isLoading}}}
              {{{Loader}}}
            {{/if}}
      {{#Layout name="SignUp" }}
        <div class="page__login _page">
          <div class="auth">
            <h1 class="auth__title">Sign Up</h1>
            {{#Form className="auth__form" onSubmit=onSubmit}}
              {{{ControlledInput
                className="input__field"
                onBlur=onBlur
                onFocus=onFocus
                onInput=onInput
                ref="email"
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
                ref="login"
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
                ref="first_name"
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
                ref="second_name"
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
                ref="phone"
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
                ref="password"
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
                ref="passwordSecond"
                id="passwordSecond"
                type="password"
                label="Repeat password"
                name="passwordSecond"
              }}}
            {{{Button
              type='submit'
              text="Sign Up"
              className="button__main"
            }}}
            {{{Button
              className="button__main"
              text="Enter"
              onClick=onLoginPage
            }}}
            {{/Form}}
         </div>
        </div>
      {{/Layout}}
    `;
  }
}
export default WithStore(WithRouter(SignUpPage));
