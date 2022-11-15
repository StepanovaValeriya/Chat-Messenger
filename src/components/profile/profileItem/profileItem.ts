import Block from "core/Block";
import "./profileItem.scss";

interface ProfileItemProps {
  label: string;
  info: string;
}

export class ProfileItem extends Block<ProfileItemProps> {
  static componentName = "ProfileItem";

  protected render(): string {
    // language=hbs
    return `
      <div class="profile__item" >
        <div class="profile__item__label">{{label}}</div>
        <div class="profile__item__title">{{info}}</div>
      </div>
    `;
  }
}
