import Block from "core/Block";
import { toggleOptionsWindow, createModalToggler } from "utils/dom";
import { MODAL_ADD_USER_ID, MODAL_DELETE_USER_ID } from "utils/const";
import "./chatHeader";

const toggleAddUserModal = createModalToggler(MODAL_ADD_USER_ID);
const toggleDeleteUserModal = createModalToggler(MODAL_DELETE_USER_ID);

interface ChatHeaderProps {
  avatarPath: string;
  userName: string;
  actionHeader: string;
  text: string;
  className: string;
  id: string;
  onClick: () => void;
}

export default class ChatHeader extends Block {
  static componentName = "ChatHeader";
  constructor(props: ChatHeaderProps) {
    super({
      ...props,
      toggleOptionsWindow,
      toggleAddUserModal,
      toggleDeleteUserModal,
    });
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
        <div class="chat__header__actions">
          {{{Button className="chat__header__actions__button" onClick=toggleOptionsWindow
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
