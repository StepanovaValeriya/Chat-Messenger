import Block from "core/Block";
import Validate from "core/Validation";
import Router from "core/router";
import { signin } from "services/auth";
import { WithRouter, WithStore } from "helpers";
import { Store } from "core";
import "./login.scss";

type LoginPageProps = {
  router: Router;
  store: Store<AppState>;
  user: UserType | null;
};

class LoginPage extends Block<LoginPageProps> {
  static componentName = "LoginPage";

  protected getStateFromProps() {
    this.state = {
      values: {
        login: "",
        password: "",
      },
      errors: {
        login: "",
        password: "",
      },
      onSignUp: () => {
        this.props.router.go("/signup");
      },
      handleErrors: (values: { [key: string]: number }, errors: { [key: string]: number }) => {
        const nextState = {
          ...this.state,
        };

        nextState.errors = errors;
        nextState.values = values;

        this.setState(nextState);
      },
      onBlur: (e: FocusEvent) => {
        if (e.target) {
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
        if (element.id === "login") {
          this.refs.loginInputRef.refs.errorRef.setProps({ text: message });
        }
      },
      formValid: () => {
        let isValid = true;
        const newValues = { ...this.state.values };
        const newErrors = { ...this.state.errors };
        Object.keys(this.state.values).forEach((key) => {
          const input = this.element?.querySelector(`input[name='${key}']`) as HTMLInputElement;
          newValues[key] = input.value;
          const message = Validate(newValues[key], key);
          if (message) {
            isValid = false;
            newErrors[key] = message;
          }
        });
        if (isValid) {
          this.state.handleErrors(newValues, newErrors);
        }
        return isValid;
      },
      onSubmit: () => {
        if (this.state.formValid()) {
          signin(this.props.store, { ...this.state.values });
        }
      },
    };
  }

  render() {
    const { errors, values } = this.state;
    const { isLoading } = this.props.store.getState();
    // language=hbs
    return `
   {{#if ${isLoading}}}
      {{{Loader}}}
    {{/if}}
      {{#Layout name="Login" }}
        <div class="page__login _page">
          <div class="auth">
            <h1 class="auth__title">Sign In</h1>
            <form class="auth__form">
              {{{ControlledInput
                className="input__field"
                onBlur=onBlur
                onFocus=onFocus
                onInput=onInput
                ref="loginInputRef"
                value="${values.login}"
                error="${errors.login}"
                id="login"
                type="text"
                label="Login"
                name="login"
              }}}
              {{{ControlledInput
                className="input__field"
                value="${values.password}"
                error="${errors.password}"
                ref="passwordInputRef"
                id="password"
                type="password"
                label="Password"
                name="password"
              }}}
            </form>
            {{{Button
              text="Sign In"
              onClick=onSubmit
              className="button__main"
            }}}
            {{{Button
              className="button__main"
              text="Create account"
              onClick=onSignUp
            }}}
         </div>
        </div>
      {{/Layout}}
    `;
  }
}
export default WithRouter(WithStore(LoginPage));
