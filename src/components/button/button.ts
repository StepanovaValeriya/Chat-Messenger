import Block from "core/Block";
import "./button.scss";

type ButtonProps = {
  text?: string;
  className?: string;
  id?: string;
  type?: "submit" | "button" | "reset";
  dataTestid?: string;
  events?: {
    click?: () => void;
  };
  onClick?: () => void;
};

export class Button extends Block<ButtonProps> {
  static componentName = "Button";

  constructor({ type, dataTestid = "button_test", text, className, onClick }: ButtonProps) {
    super({ text, type, dataTestid, className, events: { click: onClick } });
  }

  protected render(): string {
    // language=hbs
    return `
        <button id="{{id}}" data-testid="{{dataTestid}}" class="{{className}}" type="{{type}}" onClick={{onClick}}>{{text}}</button>
    `;
  }
}
