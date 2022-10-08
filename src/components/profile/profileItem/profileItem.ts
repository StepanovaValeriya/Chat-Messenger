import Block from "core/Block";
import "./profileItem";

interface ProfileItemProps {
  label: string;
  title: string;
}

export default class ProfileItem extends Block {
  static componentName = "ProfileItem";
  constructor({ label, title }: ProfileItemProps) {
    super({ label, title });
  }

  protected render(): string {
    // language=hbs
    return `
      <div class="profile__item">
        <div class="profile__item__label">{{label}}</div>
        <div class="profile__item__title">{{title}}</div>
      </div>
    `;
  }
}
