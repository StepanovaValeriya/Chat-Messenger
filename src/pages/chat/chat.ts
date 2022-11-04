import Block from "core/Block";
import { toggleOptionsWindow, createModalToggler } from "utils/dom";
import {
  MODAL_ADD_USER_ID,
  MODAL_DELETE_USER_ID,
  MODAL_ADD_CHAT_ID,
} from "utils/const";
import Router from "core/router";
import { WithRouter, WithStore, WithChats } from "helpers";
import { Store } from "core";
import { createChat, addUserToChat, deleteUserFromChat } from "services/chats";
import Validate from "core/Validation";

const toggleAddUserModal = createModalToggler(MODAL_ADD_USER_ID);
const toggleDeleteUserModal = createModalToggler(MODAL_DELETE_USER_ID);
const toggleAddChatModal = createModalToggler(MODAL_ADD_CHAT_ID);

type ChatPageProps = {
  router: Router;
  store: Store<AppState>;
  chats: Nullable<Array<ChatType>>;
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
  protected getStateFromProps(_props: ChatPageProps) {
    this.state = {
      onProfilePage: () => {
        this.props.router.go("/profile");
      },
      createChat: () => {
        let input = this.element?.querySelector(
          `input[name='create_chat']`
        ) as HTMLInputElement;
        let chatName = input.value;
        console.log(chatName);
        createChat(this.props.store, { title: chatName });
      },
      addUserToChat: () => {
        let input = this.element?.querySelector(
          `input[name='user_to_add']`
        ) as HTMLInputElement;
        let login = input.value;
        console.log(login);
        const chat = this.props.store.getState().selectedChat;
        chat && addUserToChat(this.props.store, { login: login, chat });
      },

      deleteUserFromChat: () => {
        let input = this.element?.querySelector(
          `input[name='user_to_delete']`
        ) as HTMLInputElement;
        let login = input.value;
        console.log(login);
        const chat = this.props.store.getState().selectedChat;
        chat && deleteUserFromChat(this.props.store, { login: login, chat });
      },
    };
  }
  render() {
    const id = this.props.store.getState().selectedChat?.id;

    // language=hbs
    return `
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
                <span class="message__date">30 october</span>
                  {{{Message}}}
            {{else}}
              {{{EmptyChat}}}
            {{/if}}
            {{{ChatMessageInput}}}
          </div>
          {{{Modal id="modal-add-chat" onSubmit=createChat toggler=toggleAddChatModal inputType="text" inputLabel="Enter chat name" inputId="create_chat" title="Create new chat"  buttonText="Create chat" inputName="create_chat"}}}
          {{{Modal id="modal-add-user" onSubmit=addUserToChat toggler=toggleAddUserModal inputType="text" inputLabel="Login" inputId="user_to_add" title="Add user" buttonText="Add" inputName="user_to_add"}}}
          {{{Modal id="modal-delete-user" onSubmit=deleteUserFromChat toggler=toggleDeleteUserModal inputType="text" inputLabel="Login" inputId="delete-user-name" title="Delete user" buttonText="Delete" inputName="user_to_delete"}}}
        </div>
     {{/Layout}}
    `;
  }
}
export default WithRouter(WithStore(WithChats(ChatPage)));
