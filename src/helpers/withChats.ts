import { BlockClass } from "core/Block";
import { deepEqual } from "utils/deepEqual";

type WithChatsProps = { chats: Nullable<ChatType[]> };

export function WithChats<P extends WithChatsProps>(
  WrappedBlock: BlockClass<P>
) {
  // @ts-expect-error No base constructor has the specified
  return class extends WrappedBlock<P> {
    public static componentName =
      WrappedBlock.componentName || WrappedBlock.name;

    constructor(props: P) {
      super({ ...props, chats: window.store.getState().chats });
    }

    __onChangeUserCallback = (prevState: AppState, nextState: AppState) => {
      if (deepEqual(prevState, nextState)) {
        // @ts-expect-error this is not typed
        this.setProps({ ...this.props, chats: nextState.chats });
      }
    };

    componentDidMount(props: P) {
      super.componentDidMount(props);
      window.store.on("updated", this.__onChangeUserCallback);
    }

    componentWillUnmount() {
      super.componentWillUnmount();
      window.store.off("updated", this.__onChangeUserCallback);
    }
  } as BlockClass<Omit<P, "chats">>;
}
