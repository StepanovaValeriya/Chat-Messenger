import Block from "core/Block";
import { Validator } from "core/Validation";
import Router from "core/router";
import { WithRouter, WithStore, WithUser } from "helpers";
import { Store } from "core";
import { changeUserPassword } from "services/userData";

type ChangePassProfilePageProps = {
  router: Router;
  store: Store<AppState>;
  user: UserType | null;
};

class ChangePassProfilePage extends Block<ChangePassProfilePageProps> {
  static componentName = "ChangePassProfilePage";

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
      onSubmit: this.onSubmit.bind(this),
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
    if (this.state.values.password !== this.state.values.passwordRepeat) {
      newErrors.passwordRepeat = "Passwords are not equal";
    }
    const newState = {
      values: newValues,
      errors: newErrors,
    };

    this.setState(newState);

    return isValid;
  }

  onSubmit(e: Event) {
    e.preventDefault();
    if (this.formValid()) {
      const profileData = {
        oldPassword: this.state.values.passwordOld,
        newPassword: this.state.values.password,
      };
      changeUserPassword(this.props.store, { ...profileData });
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
      {{#Layout name="Main" }}
        <div class="content profile">
          {{{ProfileNav}}}
          <div class="profile__main">
            {{#Form className="profile__info" onSubmit=onSubmit}}
              {{{ControlledInput
                className="input__profile"
                label="Old password"
                value="${values.passwordOld}"
                type="password"
                id="passwordOld"
                name="passwordOld"
                ref="passwordOld"
                onBlur=onBlur
                onFocus=onFocus
                onInput=onInput
              }}}
              {{{ControlledInput
                className="input__profile"
                label="New password"
                value="${values.password}"
                error="${errors.password}"
                type="password"
                id="password"
                ref="password"
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
                ref="passwordRepeat"
                name="passwordRepeat"
                onBlur=onBlur
                onFocus=onFocus
                onInput=onInput
              }}}
              {{{Button
                className="button__main"
                text="Save"
                onClick=onSubmit
              }}}
              {{/Form}}
          </div>
        </div>
      {{/Layout}}
    `;
  }
}
export default WithStore(WithRouter(WithUser(ChangePassProfilePage)));
