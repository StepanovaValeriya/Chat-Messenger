import Block from "core/Block";
import Router from "core/router";
import "./main";
import { WithRouter } from "helpers/withRouter";
import { Store } from "core";

export type MainPageProps = {
  router: Router;
  store: Store<AppState>;
};

export class MainPage extends Block<MainPageProps> {
  static componentName = "MainPage";

  protected getStateFromProps() {
    this.state = {
      onLoginPage: () => {
        this.props.router.go("/login");
      },
      onSignUpPage: () => {
        this.props.router.go("/signup");
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
      </div>
  {{/Layout}}
    `;
  }
}
export default WithRouter(MainPage);
