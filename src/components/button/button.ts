import Block from "core/Block";
import "./button";

type IncomingButtonProps = {
  text: string;
  className: string;
  id?: string;
  type?: "submit" | "button" | "reset";
  onClick?: () => void;
};

type ButtonProps = {
  text: string;
  className: string;
  id?: string;
  type?: "submit" | "button" | "reset";
  events: {
    click?: () => void;
  };
};

export class Button extends Block<ButtonProps> {
  static componentName = "Button";
  constructor({ text, className, onClick }: IncomingButtonProps) {
    super({ text, className, events: { click: onClick } });
  }
  protected render(): string {
    // language=hbs
    return `
        <button id="{{id}}"  class="{{className}}" type="{{type}}" onClick={{onClick}}>{{text}}</button>
    `;
  }
}
