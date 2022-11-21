import { Store } from "core";
import { defaultState } from "store/index";

describe("core/Store", () => {
  let store: Store<AppState>;

  beforeEach(() => {
    store = new Store(defaultState);
  });

  it("should set state", () => {
    const newState: AppState = {
      isLoading: false,
      view: null,
      loginFormError: "Error",
      user: null,
      isAppInited: false,
      chats: [],
      selectedChat: null,
      isPopupShown: false,
      currentPath: "/",
      messages: [],
      socket: null,
    };

    store.setState(newState);

    expect(store.getState()).toEqual(newState);
  });

  it("should emit update event if store was changed", () => {
    const mock = jest.fn();
    const nextState = { ...defaultState, loginFormError: "User not found" };

    store.on("updated", mock);
    store.setState({ loginFormError: "User not found" });

    expect(mock).toHaveBeenCalled();
    expect(mock).toHaveBeenCalledWith(defaultState, nextState);
  });

  it("should set partial state", () => {
    store.setState({ isLoading: true });

    expect(store.getState().isLoading).toBe(true);
  });
});
