import Block from "core/Block";

type ErrorPageProps = {
  errorCode?: string;
  errorText?: string;
};

export default class ErrorPage extends Block<ErrorPageProps> {
  static componentName = "ErrorPage";

  render() {
    // language=hbs
    return `
    {{#Layout name="Error" }}
      <div class="page__login _page">
        <div class="errors">
          <h1 class="errors__title">{{errorCode}}</h1>
          <p class="errors__text">{{errorText}}</p>
          {{{Link
            className="errors__link"
            text="Back to chats"
            to="#"
          }}}
        </div>
      </div>
    {{/Layout}}
    `;
  }
}
