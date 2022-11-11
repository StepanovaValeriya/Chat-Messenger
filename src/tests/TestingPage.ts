import Block from "core/Block";

class TestingPage extends Block<Record<string, unknown>> {
  static componentName = "TestingPage";

  render() {
    // language=hbs
    return `
        <main class="main">
          <h1>It is page for tests</h1>
        </main>
        `;
  }
}

export default TestingPage;
