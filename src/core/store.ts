import EventBus from "core/EventBus";
import { defaultState } from "../store";

export type Dispatch<State> = (
  nextStateOrAction: Partial<State> | Action<State>,
  payload?: any
) => void;

export type Action<State> = (
  dispatch: Dispatch<State>,
  state: State,
  payload: any
) => void;

export class Store<State extends Record<string, any>> extends EventBus {
  private state = {} as State;

  constructor(defaultState: State) {
    super();

    this.state = defaultState;
    this.setState(defaultState);
  }

  public getState() {
    return this.state;
  }

  public setState(nextState: Partial<State>) {
    const prevState = { ...this.state };

    this.state = { ...this.state, ...nextState };
    this.emit("updated", prevState, nextState);
  }

  dispatch(nextStateOrAction: Partial<State> | Action<State>, payload?: any) {
    if (typeof nextStateOrAction === "function") {
      nextStateOrAction(this.dispatch.bind(this), this.state, payload);
    } else {
      this.setState({ ...this.state, ...nextStateOrAction });
    }
  }
}

export default new Store(defaultState);
