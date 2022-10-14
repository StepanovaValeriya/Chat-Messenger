import Block from "core/Block";
import "./chatList";

interface ChatListProps {
  active: boolean;
  avatarPath: string;
  userName: string;
  lastMsgText: string;
  lastMsgDate: string;
  msgCounter: number;
  events: Object;
}

export default class ChatList extends Block {
  static componentName = "ChatList";

  constructor(props: ChatListProps) {
    super(props);
  }

  protected render(): string {
    // language=hbs
    return `
      <ul class="chat__list">
        <li class="chat__item">
        <div class="chat__item__main">
          <div class="chat__item__image">
            <img
               src={{avatarPath}}
               alt={{userName}}
             />
            </div>
          <div class="chat__item__info">
            <h3 class="chat__item__info__title">{{userName}}</h3>
            <span class="chat__item__info__message">{{lastMsgText}}</span>
          </div>
        </div>
          <div class="chat__item__count">
            <span class="chat__item__count__time">{{lastMsgDate}}</span>
            {{#if msgCounter}}
              <span class="chat__item__count__counter">{{msgCounter}}</span>
            {{/if}}
          </div>
        </li>
      </ul>
    `;
  }
}
