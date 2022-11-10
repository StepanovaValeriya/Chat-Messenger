import EventBus from "./EventBus";
import { nanoid } from "nanoid";
import Handlebars from "handlebars";

type Events = Values<typeof Block.EVENTS>;

export interface BlockClass<P extends Record<string, any>> extends Function {
  new (props: P): Block<P>;
  componentName?: string;
}

export default class Block<P extends Indexed<any>> {
  static componentName: string;

  static EVENTS = {
    INIT: "init",
    FLOW_CDM: "flow:component-did-mount",
    FLOW_CDU: "flow:component-did-update",
    FLOW_RENDER: "flow:render",
  } as const;

  public id = nanoid(6);

  protected _element: Nullable<HTMLElement> = null;
  protected props: Readonly<P>;
  protected children: { [id: string]: Block<{}> } = {};

  private _eventBus: EventBus<Events>;
  protected state: any = {};

  refs: { [id: string]: Block<{}> } = {};

  public constructor(props?: P) {
    this.props = this._makePropsProxy(props || ({} as P));
    this.getStateFromProps(props);

    this._eventBus = new EventBus<Events>();

    this.state = this._makePropsProxy(this.state);

    this._registerEvents(this._eventBus);

    this._eventBus.emit(Block.EVENTS.INIT, this.props);
  }

  private _registerEvents(eventBus: EventBus<Events>) {
    eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
  }
  _createResources() {
    this._element = this._createDocumentElement("div");
  }
  private _createDocumentElement(tagName: string) {
    return document.createElement(tagName);
  }

  protected getStateFromProps(_props: any): void {
    this.state = {};
  }

  init() {
    this._createResources();
    this._eventBus.emit(Block.EVENTS.FLOW_RENDER, this.props);
  }

  private _componentDidMount(props: P) {
    this.componentDidMount(props);
  }

  componentDidMount(props: P) {
    this.setProps(props);

    return true;
  }

  dispatchComponentDidMount() {
    this._eventBus.emit(Block.EVENTS.FLOW_CDM);
  }

  private _componentDidUpdate(oldProps: Partial<P>, newProps: Partial<P>) {
    const response = this.componentDidUpdate(oldProps, newProps);

    if (!response) {
      return;
    }

    this._render();
  }

  componentDidUpdate(_oldProps: Partial<P>, _newProps: Partial<P>) {
    this.children = {};

    return true;
  }

  setProps = (nextPartialProps: Partial<P>) => {
    if (!nextPartialProps) {
      return;
    }

    const prevProps = this.props;
    const nextProps = { ...prevProps, ...nextPartialProps };

    this.props = nextProps;

    this._eventBus.emit(Block.EVENTS.FLOW_CDU, prevProps, nextProps);
  };

  getProps = () => {
    return this.props;
  };

  getRefs() {
    return this.refs;
  }

  get element() {
    return this._element;
  }
  setState = (nextState: any) => {
    if (!nextState) {
      return;
    }

    Object.assign(this.state, nextState);
  };

  private _render() {
    const fragment = this._compile();

    this._removeEvents();

    const newElement = fragment.firstElementChild!;

    this._element!.replaceWith(newElement);

    this._element = newElement as HTMLElement;

    this._addEvents();
  }

  protected render(): string {
    return "";
  }

  getContent(): HTMLElement {
    // Хак, чтобы вызвать CDM только после добавления в DOM
    if (this.element?.parentNode?.nodeType === Node.DOCUMENT_FRAGMENT_NODE) {
      setTimeout(() => {
        if (
          this.element?.parentNode?.nodeType !== Node.DOCUMENT_FRAGMENT_NODE
        ) {
          this._eventBus.emit(Block.EVENTS.FLOW_CDM);
        }
      }, 100);
    }

    return this.element!;
  }

  private _makePropsProxy(props: any): any {
    const self = this;

    return new Proxy(props as unknown as object, {
      get(target: Record<string, unknown>, prop: string) {
        const value = target[prop];
        return typeof value === "function" ? value.bind(target) : value;
      },

      set(target: Record<string, unknown>, prop: string, value: unknown) {
        target[prop] = value;

        // Запускаем обновление компоненты
        // Плохой cloneDeep
        self._eventBus.emit(Block.EVENTS.FLOW_CDU, { ...target }, target);
        return true;
      },

      deleteProperty() {
        throw new Error("Нет доступа");
      },
    }) as unknown as P;
  }

  private _removeEvents() {
    const events: Record<string, () => void> = (this.props as any).events;

    if (!events || !this._element) {
      return;
    }

    Object.entries(events).forEach(([event, listener]) => {
      this._element!.removeEventListener(event, listener);
    });
  }

  private _addEvents() {
    const events: Record<string, () => void> = (this.props as any).events;

    if (!events) {
      return;
    }

    Object.entries(events).forEach(([event, listener]) => {
      this._element!.addEventListener(event, listener);
    });
  }

  private _compile(): DocumentFragment {
    const fragment = document.createElement("template");

    /**
     * Рендерим шаблон
     */
    const template = Handlebars.compile(this.render());

    fragment.innerHTML = template({
      ...this.state,
      ...this.props,
      children: this.children,
      refs: this.refs,
    });

    /**
     * Заменяем заглушки на компоненты
     */
    Object.entries(this.children).forEach(([id, component]) => {
      /**
       * Ищем заглушку по id
       */
      const stub = fragment.content.querySelector(`[data-id="${id}"]`);

      if (!stub) {
        return;
      }

      const stubChilds = stub.childNodes.length ? stub.childNodes : [];

      /**
       * Заменяем заглушку на component._element
       */
      const content = component.getContent();
      stub.replaceWith(content);

      /**
       * Ищем элемент layout-а, куда вставлять детей
       */
      const layoutContent = content.querySelector('[data-layout="1"]');

      if (layoutContent && stubChilds.length) {
        layoutContent.append(...stubChilds);
      }
    });

    /**
     * Возвращаем фрагмент
     */
    return fragment.content;
  }

  show() {
    this.getContent().style.display = "block";
  }

  hide() {
    this.getContent().style.display = "none";
  }
}
