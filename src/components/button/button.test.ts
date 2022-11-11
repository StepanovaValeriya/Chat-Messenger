// eslint-disable-next-line import/no-extraneous-dependencies
import { getByTestId } from "@testing-library/dom";
import { renderBlock } from "../../tests/renderUtils";
import Button from "./button";

describe("components/Button", () => {
  it("should render button with exactly props", () => {
    renderBlock({
      Block: Button,
      props: { dataTestid: "button_test", type: "button", text: "Test" },
    });

    expect(getByTestId(document.body, "button_test")).toBeInTheDocument();
    expect(getByTestId(document.body, "button_test")).toHaveTextContent("Test");
  });

  it("should render button with default dataTestid", () => {
    renderBlock({
      Block: Button,
      props: { type: "button" },
    });

    expect(getByTestId(document.body, "button")).toBeInTheDocument();
    expect(getByTestId(document.body, "button")).toHaveTextContent("");
  });
});
