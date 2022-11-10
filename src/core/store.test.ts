import { Store } from "./store";
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

  it("should emit event after store was update", () => {
    const store = new Store({ userId: -1 });
    const mock = jest.fn();

    store.on("changed", mock);

    store.setState({ userId: 123 });

    expect(mock).toHaveBeenCalled();
    expect(mock).toHaveBeenCalledWith({ userId: -1 }, { userId: 123 });
  });

  it("should set partial state", () => {
    store.setState({ isLoading: true });

    expect(store.getState().isLoading).toBe(true);
  });
});
