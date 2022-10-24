import Block from "core/Block";
import Validate from "core/Validation";
import { router } from "../../index";
import { ROUTES } from "../../constants/routes";
import { login } from "services/auth";
import { withRouter, withStore, withUser } from "helpers";
import { Router } from "core";
import { Store } from "core";

type LoginPageProps = {
  router: Router;
  store: Store<AppState>;
  user: User | null;
  formError: () => void;
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
        router.go(ROUTES.SignUp);
      },
      formError: () => this.props.store.getState().formError,
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
        if (!isValid) {
          this.state.handleErrors(newValues, newErrors);
        }
        return isValid;
      },
      onSubmit: () => {
        if (this.state.formValid()) {
          console.log("submit", this.state.values);
          const loginData = this.state.values;
          this.props.store.dispatch(login, loginData);
        }
      },
    };
  }
  render() {
    const { errors, values } = this.state;
    // language=hbs
    return `
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
                error=""
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
const ConnectedLoginPage = withRouter(withStore(withUser(LoginPage)));
export { ConnectedLoginPage as LoginPage };
