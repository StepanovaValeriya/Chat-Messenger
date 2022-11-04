import Block from "core/Block";
import "./profileNav";
import Router from "core/router";
import { WithRouter, WithStore } from "helpers";
import { Store } from "core";

type ProfileNavProps = {
  router: Router;
  store: Store<AppState>;
  onChatPage: () => void;
};

class ProfileNav extends Block<ProfileNavProps> {
  static componentName = "ProfileNav";

  constructor(props: ProfileNavProps) {
    super({ ...props });
    this.setProps({
      ...props,
      onChatPage: () => {
        this.props.router.go("/chat");
      },
    });
  }

  protected render(): string {
    // language=hbs
    return `
    <div class="profile__nav">
    {{{Button
      onClick=onChatPage
      text="<"
      className="profile__nav__button"
    }}}
  </div>
    `;
  }
}
export default WithRouter(WithStore(ProfileNav));
