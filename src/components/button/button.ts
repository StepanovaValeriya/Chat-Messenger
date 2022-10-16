import Block from "core/Block";
import "./button";

interface ButtonProps {
  text: string;
  className: string;
  id?: string;
  onClick: () => void;
}
export class Button extends Block {
  static componentName = "Button";
  constructor({ text, className, onClick }: ButtonProps) {
    super({ text, className, events: { click: onClick } });
  }
  protected render(): string {
    // language=hbs
    return `
        <button id="{{id}}" class="{{className}}" type="button">{{text}}</button>
    `;
  }
}
