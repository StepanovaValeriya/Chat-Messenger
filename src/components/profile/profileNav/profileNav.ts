import Block from "core/Block";
import "./profileNav.scss";
import Router from "core/router";
import { WithRouter } from "helpers";
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
        this.props.router.back();
      },
    });
  }

  protected render(): string {
    // language=hbs
    return `
    <div class="profile__nav"  data-testid='profileNav'>
    {{{Button
      onClick=onChatPage
      text="<"
      className="profile__nav__button"
    }}}
  </div>
    `;
  }
}
export default WithRouter(ProfileNav);
