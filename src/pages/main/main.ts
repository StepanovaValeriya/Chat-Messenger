import Block from "core/Block";
import Router from "core/router";
import "./main.scss";
import { WithRouter } from "helpers/withRouter";
import { Store } from "core";

export type MainPageProps = {
  router: Router;
  store: Store<AppState>;
  onLoginPage: () => void;
  onSignUpPage: () => void;
};

class MainPage extends Block<MainPageProps> {
  static componentName = "MainPage";

  constructor(props: MainPageProps) {
    super(props);

    this.setProps({
      onLoginPage: () => {
        this.props.router.go("/login");
      },
      onSignUpPage: () => {
        this.props.router.go("/signup");
      },
    });
  }

  render() {
    // language=hbs
    return `

    {{#Layout name="Main" }}
      <div class="page__welcome _page" data-testid='welcome'>
        <h1 class="page__welcome__title">Welcome to Chat-Messenger!</h1>
        {{{Button
          text="Sign In"
          onClick=onLoginPage
          className="button__main"
        }}}
        {{{Button
          type="button"
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
