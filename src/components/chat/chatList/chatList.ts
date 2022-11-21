import { Sockets } from "api/types";
import Block from "core/Block";
import { deleteChat, getChatInfo, openSocket } from "services/chats";
import { WithStore } from "helpers";
import { Store } from "core/store";
import "./chatList.scss";

type ChatListProps = {
  store: Store<AppState>;
  chat: ChatType;
  messages: Message[] | undefined;
  deleteChat: () => void;
  events: {
    click: (event: Event) => void;
  };
};

class ChatList extends Block<ChatListProps> {
  static componentName = "ChatList";

  unreadCount = 0;

  messagesArray: Array<Sockets> = [];

  constructor(props: ChatListProps) {
    const onChatItemClick = async (event: Event) => {
      if ((event.target as HTMLElement).tagName === "BUTTON") {
        return;
      }

      await getChatInfo(this.props.store, { ...this.props.chat });

      const { user, selectedChat } = this.props.store.getState();
      if (user && selectedChat) {
        openSocket(user.id, selectedChat);
      }
    };

    super({
      ...props,
      events: { click: onChatItemClick },
      deleteChat: () => {
        deleteChat(this.props.store, { chatId: this.props.chat.id });
      },
    });
  }

  protected render(): string {
    // language=hbs
    return `
      <ul class="chat__list">
        <li class="chat__item" data-id={{chat.id}}>
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
            {{{Button type="button" className="button__cancel" text="X" onClick=deleteChat}}}
              <span class="chat__item__count__counter">{{chat.unreadCount}}</span>

          </div>
        </li>
      </ul>
    `;
  }
}
export default WithStore(ChatList);
