import Block from "core/Block";
import { userData } from "../../data/userData";
import { createModalToggler } from "utils/dom";
import { MODAL_СHANGE_USER_AVATAR_ID } from "utils/const";
import Router from "core/router";
import { WithRouter, WithStore, WithUser } from "helpers";
import { Store } from "core";

const toggleChangeAvatarModal = createModalToggler(MODAL_СHANGE_USER_AVATAR_ID);

type ProfilePageProps = {
  router: Router;
  store: Store<AppState>;
  user: UserType | null;
  chats: Nullable<Array<ChatType>>;
};

export class ProfilePage extends Block<ProfilePageProps> {
  static componentName = "ProfilePage";
  constructor() {
    super({ userData, toggleChangeAvatarModal });
  }
  protected getStateFromProps() {
    this.state = {
      onChangeDataPage: () => {
        window.location.href = "/changeDataProfile";
      },
      onChangePasswordPage: () => {
        window.location.href = "/changePassProfile";
      },
      onMainPage: () => {
        window.location.href = "/";
      },
    };
  }
  render() {
    // language=hbs
    return `
      {{#Layout name="Main" }}
        <div class="content profile">
          {{{ProfileNav}}}
          <div class="profile__main">
            {{{ProfileAvatar avatarPath = userData.userAvatar userName=userData.userName}}}
              <div class='profile__info'>
              {{#each userData.userInfo}}
                {{{ProfileItem
                  label=title
                  title=data
                }}}
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
                onClick=onMainPage
                className="button__main button__main_red"
                text="Exit"
              }}}
          </div>
           {{{Modal id="modal-change-avatar" toggler=toggleChangeAvatarModal  inputLabel="Choose file" inputId="user_avatar" title="Upload file" buttonText="Change" inputName="user_avatar"}}}
        </div>
      {{/Layout}}
    `;
  }
}
export default WithRouter(WithStore(WithUser(ProfilePage)));
