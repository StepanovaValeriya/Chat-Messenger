import Block from "core/Block";
import "./link";

interface LinkProps {
  to: string;
  text: string;
  className?: string;
}

export class Link extends Block {
  static componentName = "Link";
  constructor(props: LinkProps) {
    super(props);
  }

  protected render(): string {
    // language=hbs
    return `
    <a class='{{className}}' href='{{to}}'>{{text}}</a>
    `;
  }
}
