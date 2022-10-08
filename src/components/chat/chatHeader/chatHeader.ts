import Block from "core/Block";
import "./chatHeader";

interface ChatHeaderProps {
  avatarPath: string;
  userName: string;
  actionHeader: string;
  events: Object;
}

export default class ChatHeader extends Block {
  static componentName = "ChatHeader";
  constructor({ avatarPath, userName, actionHeader }: ChatHeaderProps) {
    super({ avatarPath, userName, actionHeader });
  }

  protected render(): string {
    // language=hbs
    return `
      <div class="chat__header">
        <div class="chat__header__info">
          <h3 class="chat__header__info__title">{{userName}}</h3>
          <img
            src="{{avatarPath}}"
            alt="{{userName}}"
            width="54px"
            height="54px"
          />
        </div>
        <button class="chat__header__actions"><img
          src="{{actionHeader}}"
          alt="actions"
          /></button>
      </div>
    `;
  }
}
