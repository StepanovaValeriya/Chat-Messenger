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
import { createChat } from "services/chats";

const toggleAddUserModal = createModalToggler(MODAL_ADD_USER_ID);
const toggleDeleteUserModal = createModalToggler(MODAL_DELETE_USER_ID);
const toggleAddChatModal = createModalToggler(MODAL_ADD_CHAT_ID);

const data: Object = {
  clipPath: "/img/clipChat.png",
  chatHeader: [
    {
      avatarPath: "/img/catUser.jpg",
      userName: "Cat",
    },
  ],
  chatUsers: [
    {
      avatarPath: "/img/catUser.jpg",
      userName: "Cat",
      lastMsgText: "I am Cat",
      lastMsgDate: "10:30",
      msgCounter: 0,
      active: true,
    },
    {
      avatarPath: "/img/birdUser.jpg",
      userName: "AngryBird",
      lastMsgText: "I am Angry",
      lastMsgDate: "09:30",
      msgCounter: 1,
      active: false,
    },
  ],
  days: [
    {
      date: "05 October 2022",
      messages: [
        {
          time: "10:30",
          text: "Hi!",
        },
        {
          time: "10:30",
          text: "Hi, friend!",
          outgoing: true,
          delivered: true,
          readed: true,
        },
        {
          time: "10:31",
          text: "I bought a new computer!",
        },
        {
          time: "10:32",
          text: "Cool!",
          outgoing: true,
          delivered: true,
          readed: false,
        },
      ],
    },
  ],
};

type ChatPageProps = {
  router: Router;
  store: Store<AppState>;
  user: UserType | null;
  chats: Nullable<Array<ChatType>>;
};

class ChatPage extends Block<ChatPageProps> {
  static componentName = "ChatPage";
  constructor(props: ChatPageProps) {
    super({
      ...data,
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
        this.props.store.dispatch(createChat, { title: chatName });
      },
    };
  }
  render() {
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
        {{#each chatHeader}}
            {{{ChatHeader avatarPath=avatarPath userName=userName}}}
            {{/each}}
            {{#if days}}
              {{#each days}}
                <span class="message__date">{{date}}</span>
                {{#each messages}}
                  {{{Message
                    time=time
                    text=text
                    outgoing=outgoing
                    delivered=delivered
                    readed=readed
                    imgPath=imgPath
                  }}}
                {{/each}}
              {{/each}}
            {{else}}
              {{{EmptyChat}}}
            {{/if}}
            {{{ChatMessageInput clipPath=clipPath}}}
          </div>
          {{{Modal id="modal-add-chat" onSubmit=createChat toggler=toggleAddChatModal inputType="text" inputLabel="Enter chat name" inputId="create_chat" title="Create new chat"  buttonText="Create chat" inputName="create_chat"}}}
          {{{Modal id="modal-add-user" toggler=toggleAddUserModal inputType="text" inputLabel="Login" inputId="user_to_add" title="Add user" buttonText="Add" inputName="user_to_add"}}}
          {{{Modal id="modal-delete-user" toggler=toggleDeleteUserModal inputType="text" inputLabel="Login" inputId="delete-user-name" title="Delete user" buttonText="Delete" inputName="user_to_delete"}}}
        </div>
     {{/Layout}}
    `;
  }
}
export default WithRouter(WithStore(WithChats(ChatPage)));
