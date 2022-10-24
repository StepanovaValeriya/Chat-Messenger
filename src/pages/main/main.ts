import { Block } from "core";
import "./main";
import { router } from "../../index";
import { ROUTES } from "../../constants/routes";

export class MainPage extends Block {
  static componentName = "MainPage";
  protected getStateFromProps() {
    this.state = {
      onLoginPage: () => {
        router.go(ROUTES.Login);
      },
      onSignUpPage: () => {
        router.go(ROUTES.SignUp);
      },
      onError404Page: () => {
        router.go(ROUTES.Error);
      },
      onError500Page: () => {
        router.go(ROUTES.Error);
      },
    };
  }

  render() {
    // language=hbs
    return `
    {{#Layout name="Main" }}
      <div class="page__welcome _page">
        <h1 class="page__welcome__title">Welcome to Chat-Messenger!</h1>
        {{{Button
          text="Sign In"
          onClick=onLoginPage
          className="button__main"
        }}}
        {{{Button
          text="Sign Up"
          onClick=onSignUpPage
          className="button__main"
        }}}
        {{{Button
          text="404"
          onClick=onError404Page
          className="button__main"
        }}}
        {{{Button
          text="500"
          onClick=onError500Page
          className="button__main"
        }}}
      </div>
  {{/Layout}}
    `;
  }
}
