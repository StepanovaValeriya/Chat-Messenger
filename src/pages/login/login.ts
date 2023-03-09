import Block from "core/Block";
import { Validator } from "core/Validation";
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
      onSubmit: this.onSubmit.bind(this),
      onSignUp: () => {
        this.props.router.go("/signup");
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
    const newState = {
      values: newValues,
      errors: newErrors,
    };
    this.setState(newState);
    return { newState, isValid };
  }

  onSubmit(e: Event) {
    e.preventDefault();
    if (this.formValid()) {
      signin(this.props.store, { ...this.state.values });
    }
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
        <div class="page__login _page" data-testid='login'>
          <div class="auth">
            <h1 class="auth__title">Sign In</h1>
            {{#Form className="auth__form" onSubmit=onSubmit}}
              {{{ControlledInput
                className="input__field"
                onBlur=onBlur
                onFocus=onFocus
                onInput=onInput
                ref="login"
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
                ref="password"
                id="password"
                type="password"
                label="Password"
                name="password"
              }}}
            {{{Button
              text="Sign In"
              type="submit"
              className="button__main"
            }}}
            {{{Button
              className="button__main"
              text="Create account"
              onClick=onSignUp
            }}}
            {{/Form}}
         </div>
        </div>
      {{/Layout}}
    `;
  }
}
export default WithRouter(WithStore(LoginPage));
