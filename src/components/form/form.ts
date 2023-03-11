import Block from "core/Block";

interface FormProps {
  className?: string[];
  dataTestid?: string;
  onSubmit?: () => void;
}

export class Form extends Block<{}> {
  static componentName = "Form";

  constructor({ onSubmit, ...props }: FormProps) {
    super({ events: { submit: onSubmit }, ...props });
  }

  protected render(): string {
    // language=hbs
    return `
    <form data-testid="{{dataTestid}}" >
      <div class="{{className}}" data-layout="1"></div>
    </form>
    `;
  }
}
