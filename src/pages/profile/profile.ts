import Block from "core/Block";
import Router from "core/router";
import { WithRouter, WithStore, WithUser } from "helpers";
import { Store } from "core";
import { signout } from "services/auth";
import { userDataArray } from "utils/userDataArray";

type ProfilePageProps = {
  router: Router;
  store: Store<AppState>;
  user: UserType | null;
  userData: Array<any>;
};

class ProfilePage extends Block<ProfilePageProps> {
  static componentName = "ProfilePage";
  constructor(props: ProfilePageProps) {
    super({ ...props });
    const data = props.user ? userDataArray(props.user) : [];
    console.log(data);

    this.setProps({
      ...this.props,
      userData: data,
    });
  }
  protected getStateFromProps(_props: ProfilePageProps) {
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
    const isLoading = this.props.store.getState().isLoading;
    // language=hbs
    return `
    {{#if ${isLoading}}}
      {{{Loader}}}
    {{/if}}
      {{#Layout name="Main" }}
        <div class="content profile">
          {{{ProfileNav}}}
          <div class="profile__main">
            {{{ProfileAvatar avatarPath = "${avatarImg}" userName="${userName}"}}}
              <div class='profile__info'>
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
              }}}
              {{{Button
                className="button__main"
                text="Change
                password"
                onClick=onChangePasswordPage
              }}}
              {{{Button
                onClick=signout
                className="button__main button__main_red"
                text="Exit"
              }}}
          </div>
        </div>
      {{/Layout}}
    `;
  }
}
export default WithRouter(WithStore(WithUser(ProfilePage)));
