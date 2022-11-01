import { Sockets } from "api/types";
import Block from "core/Block";
import { deleteChat, getChatInfo } from "services/chats";
import { Store } from "core/store";
import { WithStore } from "helpers/withStore";
import "./chatList";

type ChatListProps = {
  store: Store<AppState>;
  chat: ChatType;
  deleteChat: () => void;
  events: {
    click: (event: Event) => void;
  };
};

class ChatList extends Block<ChatListProps> {
  static componentName = "ChatList";
  unreadCount: number = 0;
  messagesArray: Array<Sockets> = [];

  constructor(props: ChatListProps) {
    const onChatItemClick = (event: Event) => {
      if ((event.target as HTMLElement).tagName === "BUTTON") {
        return;
      }

      // this.props.store.dispatch({ isLoading: true });

      this.props.store.dispatch(getChatInfo, this.props.chat);
    };

    super({
      ...props,
      events: { click: onChatItemClick },
      deleteChat: () => {
        console.log(this.props.chat);
        this.props.store.dispatch(deleteChat, { chatId: this.props.chat.id });
      },
    });
  }

  protected render(): string {
    // language=hbs
    return `
      <ul class="chat__list">
        <li class="chat__item">
        <div class="chat__item__main">
          <div class="chat__item__image">
            <img
               src="/img/avatarDefault.jpg"
               alt="avatar"
             />
            </div>
          <div class="chat__item__info">
            <h3 class="chat__item__info__title">{{chat.title}}</h3>
            <span class="chat__item__info__message"></span>
          </div>
        </div>
          <div class="chat__item__count">
            {{{Button className="button__cancel" text="X" onClick=deleteChat}}}

              <span class="chat__item__count__counter">{{chat.unreadCount}}</span>

          </div>
        </li>
      </ul>
    `;
  }
}
export default WithStore(ChatList);
