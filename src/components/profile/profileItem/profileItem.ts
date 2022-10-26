import Block from "core/Block";
import "./profileItem";

interface ProfileItemProps {
  label: string;
  info: string;
}

export default class ProfileItem extends Block {
  static componentName = "ProfileItem";
  constructor({ label, info }: ProfileItemProps) {
    super({ label, info });
  }

  protected render(): string {
    // language=hbs
    return `
      <div class="profile__item">
        <div class="profile__item__label">{{label}}</div>
        <div class="profile__item__title">{{info}}</div>
      </div>
    `;
  }
}
