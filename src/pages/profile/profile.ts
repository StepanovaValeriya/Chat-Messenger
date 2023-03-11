import Block from "core/Block";
import Router from "core/router";
import { WithRouter, WithStore, WithUser } from "helpers";
import { Store } from "core";
import { signout } from "services/auth";
// import { userDataArray } from "utils/userDataArray";
import "./profile.scss";

type ProfilePageProps = {
  router: Router;
  store: Store<AppState>;
  user: UserType | null;
  userData?: Array<any>;
};

class ProfilePage extends Block<ProfilePageProps> {
  static componentName = "ProfilePage";

  constructor(props: ProfilePageProps) {
    super({ ...props });
  }

  protected getStateFromProps(_props: ProfilePageProps) {
    this.state = {
      values: {
        email: _props.user?.email,
        login: _props.user?.login,
        display_name: _props.user?.displayName,
        first_name: _props.user?.firstName,
        second_name: _props.user?.secondName,
        phone: _props.user?.phone,
      },
      onChangeDataPage: () => {
        this.props.router.go("/changeDataProfile");
      },
      onChangePasswordPage: () => {
        this.props.router.go("/changePassProfile");
      },
      signout: () => {
        signout(this.props.store);
      },
    };
  }

  render() {
    const { values } = this.state;
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
          <div class="profile__main" data-testid='profileInfo'>
          {{{ProfileAvatar avatarPath = "${avatarImg}" userName="${values.first_name}"}}}
          {{#Form className="profile__info" dataTestid='profileItem'}}
              {{{ControlledInput
                className="input__profile"
                ref="email"
                value="${values.email}"
                id="email"
                type="text"
                label="Email"
                name="email"
                attrs="readonly"
              }}}
              {{{ControlledInput
                className="input__profile"
                value="${values.login}"
                ref="login"
                id="login"
                type="text"
                label="Login"
                name="login"
                attrs="readonly"
              }}}
              {{{ControlledInput
                className="input__profile"
                value="${values.display_name}"
                ref="display_name"
                id="display_name"
                type="text"
                label="Display Name"
                name="display_name"
                attrs="readonly"
              }}}
              {{{ControlledInput
                className="input__profile"
                value="${values.first_name}"
                ref="first_name"
                id="first_name"
                type="text"
                label="First Name"
                name="first_name"
                attrs="readonly"
              }}}
              {{{ControlledInput
                className="input__profile"
                value="${values.second_name}"
                ref="second_name"
                id="second_name"
                type="text"
                label="Second Name"
                name="second_name"
                attrs="readonly"
              }}}
              {{{ControlledInput
                className="input__profile"
                value="${values.phone}"
                ref="phone"
                id="phone"
                type="tel"
                label="Phone"
                name="phone"
                attrs="readonly"
              }}}
              {{{Button
                className="button__main"
                text="Change profile"
                onClick=onChangeDataPage
                dataTestid='button__changeData'
              }}}
              {{{Button
                className="button__main"
                text="Change
                password"
                onClick=onChangePasswordPage
                dataTestid='button__changePass'
              }}}
              {{{Button
                onClick=signout
                className="button__main button__main_red"
                text="Exit"
                dataTestid='button__signout'
              }}}
              {{/Form}}
          </div>
        </div>
      {{/Layout}}
    `;
  }
}
export default WithRouter(WithStore(WithUser(ProfilePage)));
