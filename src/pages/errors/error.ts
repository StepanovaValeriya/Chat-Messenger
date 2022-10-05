import Block from "core/Block";

interface ErrorPageProps {
  errorCode?: string;
  errorText?: string;
}

export class ErrorPage extends Block {
  static componentName: "ErrorPage";
  constructor(props: ErrorPageProps) {
    super(props);
  }
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
