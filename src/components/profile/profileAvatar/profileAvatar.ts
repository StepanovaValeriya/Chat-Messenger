import Block from "core/Block";
import { createModalToggler } from "utils/dom";
import { MODAL_СHANGE_USER_AVATAR_ID } from "utils/const";
import "./profileAvatar";

const toggleChangeAvatarModal = createModalToggler(MODAL_СHANGE_USER_AVATAR_ID);

type ProfileAvatarProps = {
  avatarPath: string;
  userName: string;
  toggleChangeAvatarModal: (event: PointerEvent) => void;
};

export default class ProfileAvatar extends Block<ProfileAvatarProps> {
  static componentName = "ProfileAvatar";
  constructor({ avatarPath, userName }: ProfileAvatarProps) {
    super({ avatarPath, userName, toggleChangeAvatarModal });
  }

  protected render(): string {
    // language=hbs
    return `
    <div class="prifile__header" data-testid='profileAvatar'>
      <h1 class="profile__title">{{userName}}</h1>
        <div class="profile__avatar">
        {{{Button className="profile__avatar__button" onClick=toggleChangeAvatarModal}}}
          <img
            class="profile__avatar__image"
            src="{{avatarPath}}"
            alt="avatar"
            width="60px"
            height="60px"
          />
        </div>
      </div>
    `;
  }
}
