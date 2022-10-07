import Block from "core/Block";
import "./main";

export class MainPage extends Block {
  static componentName = "MainPage";
  protected getStateFromProps() {
    this.state = {
      onLoginPage: () => {
        window.location.href = "/login";
      },
      onSignUpPage: () => {
        window.location.href = "/signup";
      },
      onError404Page: () => {
        window.location.href = "/error404";
      },
      onError500Page: () => {
        window.location.href = "/error500";
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
