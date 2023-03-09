import Block from "core/Block";
import { Validator } from "core/Validation";
import { createModalToggler } from "utils/dom";
import { MODAL_СHANGE_USER_AVATAR_ID } from "utils/const";
import Router from "core/router";
import { WithRouter, WithStore, WithUser } from "helpers";
import { Store } from "core";
import { changeUserProfile, changeAvatar } from "services/userData";

const toggleChangeAvatarModal = createModalToggler(MODAL_СHANGE_USER_AVATAR_ID);

type ChangeDataProfilePageProps = {
  router: Router;
  store: Store<AppState>;
  user: UserType | null;
  userData: Array<any>;
  toggleChangeAvatarModal: (event: PointerEvent) => void;
};

class ChangeDataProfilePage extends Block<ChangeDataProfilePageProps> {
  static componentName = "ChangeDataProfilePage";

  constructor(props: ChangeDataProfilePageProps) {
    super({ ...props, toggleChangeAvatarModal });
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
      onSubmit: this.onSubmit.bind(this),
    };
  }

  onSubmit(e: SubmitEvent) {
    // eslint-disable-next-line no-unused-expressions
    e.preventDefault;
    if (this.formValid()) {
      const profileData = this.state.values;
      changeUserProfile(this.props.store, profileData);
    }
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

  onAvatarChange() {
    const formData = new FormData(document.querySelector("#user_form_avatar") as HTMLFormElement);
    changeAvatar(this.props.store, formData);
  }

  render() {
    const { errors, values } = this.state;
    const avatarImg = this.props.user?.avatar ?? "";
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
          {{{ProfileAvatar avatarPath = "${avatarImg}" userName="${values.first_name}"}}}
          {{#Form className="profile__info" onSubmit=onSubmit}}
              {{{ControlledInput
                className="input__profile"
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
                className="input__profile"
                onBlur=onBlur
                onFocus=onFocus
                onInput=onInput
                value="${values.login}"
                error="${errors.login}"
                ref="login"
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
                ref="display_name"
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
                ref="first_name"
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
                ref="second_name"
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
                ref="phone"
                id="phone"
                type="tel"
                label="Phone"
                name="phone"
              }}}
              {{{Button
                type="submit"
                className="button__main"
                text="Save"
              }}}
              {{/Form}}
          </div>
          {{{ChangeAvatarModal toggler=toggleChangeAvatarModal  formId="user_form_avatar" title="Upload file" buttonText="Change" inputName="avatar" classError="error__addAvatar" onSubmit=onAvatarChange}}}
        </div>
      {{/Layout}}
    `;
  }
}

export default WithStore(WithRouter(WithUser(ChangeDataProfilePage)));
