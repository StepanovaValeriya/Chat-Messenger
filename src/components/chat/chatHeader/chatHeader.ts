import Block from "core/Block";
import { toggleOptionsWindow, createModalToggler } from "utils/dom";
import { MODAL_ADD_USER_ID, MODAL_DELETE_USER_ID } from "utils/const";
import Router from "core/router";
import { Store } from "core";
import { WithStore } from "helpers";
import "./chatHeader.scss";

const toggleAddUserModal = createModalToggler(MODAL_ADD_USER_ID);
const toggleDeleteUserModal = createModalToggler(MODAL_DELETE_USER_ID);

type ChatHeaderProps = {
  actionHeader: string;
  text: string;
  className: string;
  id: string;
  router: Router;
  store: Store<AppState>;
  user: UserType | null;
  chats: Nullable<Array<ChatType>>;
  onClick: () => void;
  toggleOptionsWindow: () => void;
  toggleAddUserModal: (event: PointerEvent) => void;
  toggleDeleteUserModal: (event: PointerEvent) => void;
};

class ChatHeader extends Block<ChatHeaderProps> {
  static componentName = "ChatHeader";

  constructor(props: ChatHeaderProps) {
    super({
      ...props,
      toggleOptionsWindow,
      toggleAddUserModal,
      toggleDeleteUserModal,
    });
  }

  render() {
    const title = this.props.store.getState().selectedChat?.title;
    const chatUsers = this.props.store.getState().selectedChat?.chatUsers?.reduce((acc, user) => {
      acc += `${user.login}, `;
      return acc;
    }, "");
    // language=hbs
    return `
      <div class="chat__header">
        <div class="chat__header__info">
          <h3 class="chat__header__info__title">${title}</h3>
          <p>Members: ${chatUsers?.slice(0, chatUsers.length - 2)}</p>
          <img
            src="/img/avatarDefault.jpg"
            alt="avatar"
            width="54px"
            height="54px"
          />

        </div>
        <div class="chat__header__actions">
          {{{Button type="button" className="chat__header__actions__button" onClick=toggleOptionsWindow
          }}}
          <img
            src='/img/headerActions.png'
            alt='actions'
            />
         </div>
          <ul class="chat__header__options options hidden">
            <li class="options__item">
            {{{Button id="add-user" className="options__button" type="button" text="Add user" onClick=toggleAddUserModal}}}
              <img src="/img/add.png" alt="action">
            </li>
            <li class="options__item">
            {{{Button id="delete-user" className="options__button" type="button" text="Delete user" onClick=toggleDeleteUserModal }}}
              <img src="/img/remove.png" alt="action">
            </li>
          </ul>
      </div>
    `;
  }
}
export default WithStore(ChatHeader);
