import Block from "core/Block";

const data: Object = {
  clipPath: "/img/clipChat.png",
  chatHeader: [
    {
      avatarPath: "/img/catUser.jpg",
      userName: "Cat",
      actionHeader: "/img/headerActions.png",
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
      date: "05 октября 2022",
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

export class ChatPage extends Block {
  static componentName = "ChatPage";
  constructor() {
    super(data);
  }

  render() {
    // language=hbs
    return `
      {{#Layout name="Chat"}}
        <div class="content chat">
          <div class="chat__nav">
            <div class="chat__nav__profile">
              {{{Link className="chat__nav__profile__title" text="Profile > "  to="/profile"}}}
            </div>
            <div class="chat__nav__search">
              {{{Input className="chat__nav__search__input" type="search" placeholder="Search"}}}
            </div>
            {{#each chatUsers}}
              {{{ChatList
                active=active
                avatarPath=avatarPath
                userName=userName
                lastMsgText=lastMsgText
                lastMsgDate=lastMsgDate
                msgCounter=msgCounter
              }}}
              {{/each}}
          </div>
        <div class="chat__main">
        {{#each chatHeader}}
            {{{ChatHeader avatarPath=avatarPath userName=userName actionHeader=actionHeader}}}
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
        </div>
     {{/Layout}}
    `;
  }
}
