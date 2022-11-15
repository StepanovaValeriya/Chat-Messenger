/* eslint-disable no-unused-expressions */
import Block from "core/Block";
import { toggleOptionsWindow, createModalToggler } from "utils/dom";
import { MODAL_ADD_USER_ID, MODAL_DELETE_USER_ID, MODAL_ADD_CHAT_ID } from "utils/const";
import Router from "core/router";
import { WithRouter, WithStore, WithChats } from "helpers";
import { Store } from "core";
import { createChat, addUserToChat, deleteUserFromChat } from "services/chats";
import "./chat.scss";

const toggleAddUserModal = createModalToggler(MODAL_ADD_USER_ID);
const toggleDeleteUserModal = createModalToggler(MODAL_DELETE_USER_ID);
const toggleAddChatModal = createModalToggler(MODAL_ADD_CHAT_ID);

type ChatPageProps = {
  router: Router;
  store: Store<AppState>;
  chats: Nullable<Array<ChatType>>;
  toggleOptionsWindow: () => void;
  toggleAddUserModal: (event: PointerEvent) => void;
  toggleDeleteUserModal: (event: PointerEvent) => void;
  toggleAddChatModal: (event: PointerEvent) => void;
};

class ChatPage extends Block<ChatPageProps> {
  static componentName = "ChatPage";

  constructor(props: ChatPageProps) {
    super({
      ...props,
      toggleOptionsWindow,
      toggleAddUserModal,
      toggleDeleteUserModal,
      toggleAddChatModal,
    });
  }

  protected getStateFromProps() {
    this.state = {
      onProfilePage: () => {
        this.props.router.go("/profile");
      },
      onCancelModal: () => {
        const addChat = document.querySelector("#modal-add-chat");
        const addUser = document.querySelector("#modal-add-user");
        const delUser = document.querySelector("#modal-delete-user");
        if (addChat) {
          addChat.classList.add("hidden");
        }
        if (addUser) {
          addUser.classList.add("hidden");
        }
        if (delUser) {
          delUser.classList.add("hidden");
        }
      },
      createChat: () => {
        const input = this.element?.querySelector(`input[name='create_chat']`) as HTMLInputElement;
        const chatName = input.value;
        if (!chatName) {
          document.querySelector("#error__addChat")?.classList.remove("hidden");
        } else {
          document.querySelector("#error__addChat")?.classList.add("hidden");
          createChat(this.props.store, { title: chatName });
        }
      },
      addUserToChat: () => {
        const input = this.element?.querySelector(`input[name='user_to_add']`) as HTMLInputElement;
        const login = input.value;
        const chat = this.props.store.getState().selectedChat;
        if (!login) {
          document.querySelector("#error__addUser")?.classList.remove("hidden");
        } else {
          document.querySelector("#error__addUser")?.classList.add("hidden");
          chat && addUserToChat(this.props.store, { login, chat });
        }
      },

      deleteUserFromChat: () => {
        const input = this.element?.querySelector(
          `input[name='user_to_delete']`
        ) as HTMLInputElement;
        const login = input.value;
        const chat = this.props.store.getState().selectedChat;
        if (!login) {
          document.querySelector("#error__deleteUser")?.classList.remove("hidden");
        } else {
          document.querySelector("#error__deleteUser")?.classList.add("hidden");
          chat && deleteUserFromChat(this.props.store, { login, chat });
        }
      },
    };
  }

  render() {
    const id = this.props.store.getState().selectedChat?.id;
    const { isLoading } = this.props.store.getState();

    // language=hbs
    return `
    {{#if ${isLoading}}}
      {{{Loader}}}
    {{/if}}
      {{#Layout name="Chat"}}
        <div class="content chat">
          <div class="chat__nav">
            <div class="chat__nav__profile">
              {{{Button className="chat__nav__profile__title" text="Profile > "  onClick=onProfilePage}}}
            </div>
            <div class="chat__nav__search">
              {{{Input className="chat__nav__search__input" type="search" placeholder="Search"}}}
            </div>
            {{#each chats}}
              {{{ChatList chat=this}}}
            {{/each}}
              {{{Button className="button__main" text="New Chat" onClick=toggleAddChatModal}}}
          </div>
        <div class="chat__main">
        {{#if ${id}}}
            {{{ChatHeader}}}
                <span class="message__date"></span>
                  {{{Message}}}
            {{else}}
              {{{EmptyChat}}}
            {{/if}}
            {{{ChatMessageInput}}}
          </div>
          {{{Modal id="modal-add-chat" onCancelModal=onCancelModal  onSubmit=createChat toggler=toggleAddChatModal inputType="text" inputLabel="Enter chat name" inputId="create_chat" title="Create new chat"  buttonText="Create chat" inputName="create_chat" classError="error__addChat"}}}
          {{{Modal id="modal-add-user"  onCancelModal=onCancelModal  onSubmit=addUserToChat toggler=toggleAddUserModal inputType="text" inputLabel="Login" inputId="user_to_add" title="Add user" buttonText="Add" inputName="user_to_add"  classError="error__addUser"}}}
          {{{Modal id="modal-delete-user"  onCancelModal=onCancelModal  onSubmit=deleteUserFromChat toggler=toggleDeleteUserModal inputType="text" inputLabel="Login" inputId="delete-user-name" title="Delete user" buttonText="Delete" inputName="user_to_delete" classError="error__deleteUser"}}}
        </div>
     {{/Layout}}
    `;
  }
}
export default WithRouter(WithStore(WithChats(ChatPage)));
