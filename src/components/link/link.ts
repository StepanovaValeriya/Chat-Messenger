import Block from "core/Block";

interface LinkProps {
  to: string;
  text: string;
  className?: string;
  onClick: () => void;
}

export default class Link extends Block<LinkProps> {
  static componentName = "Link";

  protected render(): string {
    // language=hbs
    return `
    <a class='{{className}}' href='{{to}}'>{{text}}</a>
    `;
  }
}
