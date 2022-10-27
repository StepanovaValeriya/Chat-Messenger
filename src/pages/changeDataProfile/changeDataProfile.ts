import Block from "core/Block";
import Validate from "core/Validation";
import Router from "core/router";
import { WithRouter, WithStore, WithUser } from "helpers";
import { Store } from "core";
import { changeUserProfile } from "services/userData";

type ChangeDataProfilePageProps = {
  router: Router;
  store: Store<AppState>;
  user: UserType | null;
  userData: Array<any>;
};

class ChangeDataProfilePage extends Block<ChangeDataProfilePageProps> {
  static componentName = "ChangeDataProfilePage";
  constructor(props: ChangeDataProfilePageProps) {
    super({ ...props });
  }

  protected getStateFromProps(_props: ChangeDataProfilePageProps) {
    this.state = {
      values: {
        email: _props.user?.email,
        login: _props.user?.login,
        display_name: _props.user?.displayName,
        first_name: _props.user?.firstName,
        second_name: _props.user?.secondName,
        phone: _props.user?.phone,
      },
      errors: {
        email: "",
        login: "",
        first_name: "",
        second_name: "",
        phone: "",
        display_name: "",
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
        if (element.id === "display_name") {
          this.refs.displayNameInputRef.refs.errorRef.setProps({
            text: message,
          });
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
        console.log("sub");
        if (this.state.formValid()) {
          console.log("submit", this.state.values);
          const profileData = this.state.values;
          this.props.store.dispatch(changeUserProfile, profileData);
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
          {{{ProfileAvatar avatarPath = "/img/catUser.jpg" userName="${values.first_name}"}}}
              <div class='profile__info'>
              {{{ControlledInput
                className="input__profile"
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
                className="input__profile"
                onBlur=onBlur
                onFocus=onFocus
                onInput=onInput
                value="${values.login}"
                error="${errors.login}"
                ref="loginInputRef"
                id="login"
                type="text"
                label="Login"
                name="login"
              }}}
              {{{ControlledInput
                className="input__profile"
                onBlur=onBlur
                onFocus=onFocus
                onInput=onInput
                value="${values.display_name}"
                error="${errors.display_name}"
                ref="displayNameInputRef"
                id="display_name"
                type="text"
                label="Display Name"
                name="display_name"
              }}}
              {{{ControlledInput
                className="input__profile"
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
                className="input__profile"
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
                className="input__profile"
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
export default WithStore(WithRouter(WithUser(ChangeDataProfilePage)));
