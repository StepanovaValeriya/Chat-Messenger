import Block from "core/Block";
import "./profileAvatar";

interface ProfileAvatarProps {
  avatarPath: string;
  userName: string;
}

export default class ProfileAvatar extends Block {
  static componentName = "ProfileAvatar";
  constructor({ avatarPath, userName }: ProfileAvatarProps) {
    super({ avatarPath, userName });
  }

  protected render(): string {
    // language=hbs
    return `
    <div class="prifile__header">
     <h1 class="profile__title">{{userName}}</h1>
             <div class="profile__avatar">
               <img
                class="profile__avatar__image"
                src="{{avatarPath}}"
                alt="avatar"
                width="60px"
                height="60"
              />
    </div>

    `;
  }
}
