import Block from "core/Block";
import Router from "core/router";
import { WithRouter, WithStore, WithUser } from "helpers";
import { Store } from "core";
import { signout } from "services/auth";
import { userDataArray } from "utils/userDataArray";
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
    const data = props.user ? userDataArray(props.user) : [];
    this.setProps({
      ...this.props,
      userData: data,
    });
  }

  protected getStateFromProps() {
    this.state = {
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
    const avatarImg = this.props.user?.avatar ?? "";
    const userName = this.props.user?.firstName ?? "";
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
            {{{ProfileAvatar avatarPath = "${avatarImg}" userName="${userName}"}}}
              <div class='profile__info' data-testid='profileItem'>
              {{#each userData}}
                {{#with this}}
                {{{ProfileItem
                  label=title
                  info=data
                }}}
                {{/with}}

              {{/each}}
              </div>
              {{{Button
                className="button__main"
                text="Change
                profile"
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
          </div>
        </div>
      {{/Layout}}
    `;
  }
}
export default WithRouter(WithStore(WithUser(ProfilePage)));
