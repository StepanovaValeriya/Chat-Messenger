import Block from "core/Block";
import Router from "core/router";
import "./main";
import { WithRouter } from "helpers/withRouter";

export type MainPageProps = {
  router: Router;
};

export class MainPage extends Block<MainPageProps> {
  static componentName = "MainPage";

  protected getStateFromProps() {
    this.state = {
      onLoginPage: () => {
        console.log(window.router);
        this.props.router.go("/login");
      },
      onSignUpPage: () => {
        this.props.router.go("/signup");
      },
      onError404Page: () => {
        this.props.router.go("/error");
      },
      onError500Page: () => {
        this.props.router.go("/error");
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
export default WithRouter(MainPage);
