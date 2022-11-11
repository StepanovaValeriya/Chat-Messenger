// eslint-disable-next-line import/no-extraneous-dependencies
import {
  getByTestId,
  getAllByText,
  getByText,
  waitFor,
} from "@testing-library/dom";
import { renderBlock } from "../../tests/renderUtils";
import Profile from "./profile";

const USER_MOCK = {
  avatar:
    "/d66cf98f-05dc-49ba-8d2b-c1db0c5888c3/761d694b-39b5-4dee-ab15-78a2bf05461d_12.png",
  displayName: "TestTest",
  email: "test@mail.ru",
  firstName: "Test",
  id: 3094,
  login: "Test",
  phone: "89138888888",
  secondName: "Testov",
};

describe("pages/profile", () => {
  it("should render profile page with default props", async () => {
    await renderBlock({
      Block: Profile,
      props: {},
    });

    expect(getByTestId(document.body, "profileNav")).toBeInTheDocument();
    expect(getByTestId(document.body, "profileInfo")).toBeInTheDocument();
    expect(getByTestId(document.body, "profileAvatar")).toBeInTheDocument();
    expect(getByTestId(document.body, "profileItem")).toBeInTheDocument();
    expect(
      getByTestId(document.body, "button__changeData")
    ).toBeInTheDocument();
    expect(
      getByTestId(document.body, "button__changePass")
    ).toBeInTheDocument();
    expect(getByTestId(document.body, "button__signout")).toBeInTheDocument();
  });

  it("should render profile page with store data", async () => {
    await renderBlock({
      Block: Profile,
      props: {},
      state: {
        view: Profile,
        currentPath: "/profile",
        isAppInited: true,
        user: USER_MOCK,
      },
    });

    expect(getByTestId(document.body, "profileNav")).toBeInTheDocument();
    expect(getByTestId(document.body, "profileInfo")).toBeInTheDocument();
    expect(getByTestId(document.body, "profileAvatar")).toBeInTheDocument();
    expect(getByTestId(document.body, "profileItem")).toBeInTheDocument();
    expect(
      getByTestId(document.body, "button__changeData")
    ).toBeInTheDocument();
    expect(
      getByTestId(document.body, "button__changePass")
    ).toBeInTheDocument();
    expect(getByTestId(document.body, "button__signout")).toBeInTheDocument();
    expect(getAllByText(document.body, "Test")).toHaveLength(2);
    expect(getByText(document.body, "test@mail.ru")).toBeInTheDocument();
    expect(getByText(document.body, "89138888888")).toBeInTheDocument();
    expect(getByText(document.body, "Test")).toBeInTheDocument();
    expect(getByText(document.body, "Testov")).toBeInTheDocument();
  });

  it("should logout from profile and redirect to main", async () => {
    await renderBlock({
      Block: Profile,
      props: {},
      state: {
        view: Profile,
        currentPath: "/profile",
        isAppInited: true,
        user: USER_MOCK,
      },
    });

    await (async () => {
      const signoutButton = getByTestId(document.body, "button__signout");
      signoutButton.click();
    })();

    await (async () => {
      await waitFor(() =>
        expect(getByTestId(document.body, "welcome")).toBeInTheDocument()
      );
    })();

    const state = window.store.getState();

    expect(state.view.componentName).toBe("MainPage");
    expect(state.currentPath).toBe("/");
    expect(state.user).toEqual(null);
  });
});
