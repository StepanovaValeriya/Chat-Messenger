import { Block, Router, Dispatch } from "core";
import "./main";
import { ROUTES } from "../../constants/routes";
import { withStore } from "helpers/withStore";
import { withRouter } from "helpers/withRouter";

export type MainPageProps = {
  router: Router;
  onLoginPage: () => void;
};

export class MainPage extends Block<MainPageProps> {
  static componentName = "MainPage";
  // protected getStateFromProps() {
  //   this.state = {
  //     onLoginPage: () => {
  //       this.props.router.go(ROUTES.Login);
  //     },
  //     onSignUpPage: () => {
  //       this.props.router.go(ROUTES.SignUp);
  //     },
  //     onError404Page: () => {
  //       this.props.router.go(ROUTES.Error);
  //     },
  //     onError500Page: () => {
  //       this.props.router.go(ROUTES.Error);
  //     },
  //   };
  // }
  constructor(props: MainPageProps) {
    super(props);
    this.setProps({
      ...props,
      onLoginPage: () => {
        console.log(this.props);
        this.props.router.go(ROUTES.Login);
      },
    });
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
export default withRouter(MainPage);
