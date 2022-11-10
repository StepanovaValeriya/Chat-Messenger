import Block from "./Block";
import Handlebars, { HelperOptions } from "handlebars";

export interface BlockConstructable<
  Props extends Record<string, any> = any,
  IncomingProps = any
> {
  new (props: IncomingProps): Block<Props>;
  componentName?: string;
}

export type AnyProps = Record<string, any>;

export default function registerComponent<
  Props extends Record<string, any> = AnyProps,
  IncomingProps = AnyProps
>(Component: BlockConstructable<Props, IncomingProps>) {
  Handlebars.registerHelper(
    Component.componentName || Component.name,
    function (
      this: Props,
      { hash: { ref, ...hash }, data, fn }: HelperOptions
    ) {
      if (!data.root.children) {
        data.root.children = {};
      }

      if (!data.root.refs) {
        data.root.refs = {};
      }

      const { children, refs } = data.root;

      /**
       * Костыль для того, чтобы передавать переменные
       * внутрь блоков вручную подменяя значение
       */
      (Object.keys(hash) as any).forEach((key: keyof Props) => {
        if (this[key] && typeof this[key] === "string") {
          hash[key] = hash[key].replace(
            new RegExp(`{{${key as string}}}`, "i"),
            this[key]
          );
        }
      });

      const component = new Component(hash);

      children[component.id] = component;

      if (ref) {
        refs[ref] = component;
      }

      const contents = fn ? fn(this) : "";

      return `<div data-id="${component.id}">${contents}</div>`;
    }
  );
}
