import Block from "core/Block";

export class MainPage extends Block {
  static componentName: "MainPage";
  protected getStateFromProps() {
    this.state = {
      onLoginPage: () => {
        window.location.href = "/login";
      },
      onSignUpPage: () => {
        window.location.href = "/signUp";
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
        }}}
        {{{Button
          text="Sign Up"
          onClick=onSignUpPage
        }}}
        {{{Button
          text="404"
          onClick=onError404Page
        }}}
        {{{Button
          text="500"
          onClick=onError500Page
        }}}
      </div>
  {{/Layout}}
    `;
  }
}
