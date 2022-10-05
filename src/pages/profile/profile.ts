import Block from "core/Block";

export class ProfilePage extends Block {
  static componentName: "ProfilePage";
  protected getStateFromProps() {
    this.state = {
      values: {
        first_name: "",
        second_name: "",
        login: "",
        email: "",
        phone: "",
      },
      errors: {
        first_name: "",
        second_name: "",
        login: "",
        email: "",
        phone: "",
      },
    };
  }

  render() {
    // language=hbs
    return `
      {{#Layout name="Main" }}
        <div class="content profile">
          <div class="profile__nav">
            {{{Button
              text="<"
              className="profile__nav__button"
            }}}
          </div>
          <div class="profile__main">
             <h1 class="profile__title">{{userName}}</h1>
             <div class="profile__avatar">
               <img
                class="profile__avatar__image"
                src=""
                alt="avatar"
              />
            </div>
              <div class='profile__info'>
                {{{ControlledInput
                  className="input__profile"
                }}}
                {{{ControlledInput
                  className="input__profile"
                }}}
                {{{ControlledInput
                  className="input__profile"
                }}}
                {{{ControlledInput
                  className="input__profile"
                }}}
                {{{ControlledInput
                  className="input__profile"
                }}}
              </div>
              {{{Button
                className="button__main"
                text="Change
                profile"
              }}}
              {{{Button
                className="button__main"
                text="Change
                password"
              }}}
              {{{Button
                className="button__main button__main_red"
                text="Exit"
              }}}
          </div>
        </div>
      {{/Layout}}
    `;
  }
}
