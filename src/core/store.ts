import EventBus from "core/EventBus";
import { deepEqual } from "utils/deepEqual";
import { defaultState } from "../store";

export type Action<State> = (state: State, payload: unknown) => void;

export class Store<State extends Record<string, unknown>> extends EventBus {
  private state = {} as State;

  constructor(currentState: State) {
    super();

    this.state = currentState;
  }

  public getState() {
    return this.state;
  }

  public setState(newState: Partial<State>) {
    const nextState = { ...this.state, ...newState };

    if (!deepEqual(this.state, nextState)) {
      const prevState = this.state;

      this.state = { ...nextState };
      this.emit("updated", prevState, nextState);
    }
  }
}

export default new Store(defaultState);
