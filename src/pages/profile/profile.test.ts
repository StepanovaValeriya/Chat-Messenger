// eslint-disable-next-line import/no-extraneous-dependencies
import { getByTestId, getAllByText, getByText, waitFor } from "@testing-library/dom";
import { renderBlock } from "../../tests/renderUtils";
import Profile from "./profile";

const USER_MOCK = {
  avatar: "blob:http://localhost:1234/63d8f851-4340-43cf-81b0-3458f6812a9f",
  displayName: "TestTest",
  email: "test@mail.ru",
  firstName: "Testik",
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
    expect(getByTestId(document.body, "button__changeData")).toBeInTheDocument();
    expect(getByTestId(document.body, "button__changePass")).toBeInTheDocument();
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
    expect(getByTestId(document.body, "button__changeData")).toBeInTheDocument();
    expect(getByTestId(document.body, "button__changePass")).toBeInTheDocument();
    expect(getByTestId(document.body, "button__signout")).toBeInTheDocument();
    expect(getAllByText(document.body, "Testik")).toHaveLength(2);
    expect(getByText(document.body, "test@mail.ru")).toBeInTheDocument();
    expect(getByText(document.body, "89138888888")).toBeInTheDocument();
    expect(getByText(document.body, "Test")).toBeInTheDocument();
    expect(getByText(document.body, "Testov")).toBeInTheDocument();
  });

  it("should logout from profile and redirect to login", async () => {
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
      await waitFor(() => expect(getByTestId(document.body, "login")).toBeInTheDocument());
    })();

    const state = window.store.getState();

    expect(state.view.componentName).toBe("LoginPage");
    expect(state.currentPath).toBe("/login");
    expect(state.user).toEqual(null);
  });
});
