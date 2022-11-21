import { BlockClass, Store } from "core";

type WithStateProps = { store: Store<AppState> };

export function WithStore<P extends WithStateProps>(
  WrappedBlock: BlockClass<P>,
  mapStateToProps?: (state: Indexed) => Indexed
) {
  // @ts-expect-error No base constructor has the specified
  return class extends WrappedBlock<P> {
    public static componentName = WrappedBlock.componentName;

    props: any;

    constructor(props: P) {
      super({
        ...props,
        store: mapStateToProps ? mapStateToProps(window.store.getState()) : window.store,
      });
    }

    __onChangeStoreCallback = () => {
      // @ts-expect-error this is not typed
      this.setProps({
        ...this.props,
        store: mapStateToProps ? mapStateToProps(window.store.getState()) : window.store,
      });
    };

    componentDidMount(props: P) {
      super.componentDidMount(props);
      window.store.on("updated", this.__onChangeStoreCallback);
    }

    componentWillUnmount() {
      super.componentWillUnmount();
      window.store.off("updated", this.__onChangeStoreCallback);
    }
  } as BlockClass<Omit<P, "store">>;
}
