import Block from "core/Block";
import "./message.scss";

interface MessageProps {
  time: string;
  text: string;
  imgPath: string;
  outgoing: boolean;
  delivered: boolean;
  readed: boolean;
  events: Object;
}

export default class Message extends Block {
  static componentName = "Message";

  constructor(props: MessageProps) {
    super(props);
  }

  render() {
    return `
    <div class="chat__talk">
    </div>
     `;
  }
}
