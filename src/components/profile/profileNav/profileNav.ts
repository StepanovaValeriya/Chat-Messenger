import Block from "core/Block";
import "./profileNav";

export default class ProfileNav extends Block {
  static componentName = "ProfileNav";

  protected getStateFromProps() {
    this.state = {
      onChatPage: () => {
        window.location.href = "/chat";
      },
    };
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
