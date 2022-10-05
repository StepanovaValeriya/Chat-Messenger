import Block from "core/Block";
import "./message.scss";

interface Props {
  time: string;
  text: string;
  imgPath: string;
  outgoing: boolean;
  delivered: boolean;
  readed: boolean;
  events: Object;
}

export default class Message extends Block {
  constructor({ time, text, imgPath, outgoing, delivered, readed }: Props) {
    super({
      time,
      text,
      imgPath,
      outgoing,
      delivered,
      readed,
    });
  }

  render() {
    return `
     <div class="message {{#if outgoing }} message__outgoing {{else}} message__incoming {{/if}}">
        {{#if text }}
          <div class="message__text">{{ text }}</div>
        {{/if}}
        {{#if imgPath }}
          <img class="message__image" src="{{ imgPath }}" alt="Изображение от собеседника" >
        {{/if}}
        <div class="message__info">
            {{#if outgoing }}
                <span class="message__delivered {{#if delivered }} message__delivered__active {{/if}}">.</span>
                <span class="message__readed {{#if readed }} messsage__readed__active {{/if}} ">.</span>
            {{/if}}
            <span class="message__time">{{ time }}</span>
        </div>
     </div>
     `;
  }
}
