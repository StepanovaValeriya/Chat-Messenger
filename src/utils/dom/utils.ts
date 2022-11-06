export function toggleOptionsWindow() {
  document.querySelector(".chat__header__options")?.classList.toggle("hidden");
}
export function toggleAttachWindow() {
  document.querySelector(".chat__message__options")?.classList.toggle("hidden");
}
export function createModalToggler(modalId: string) {
  const _modalId = modalId;

  return (event: PointerEvent) => {
    const { target } = event;

    if ((target as HTMLElement).classList.contains("modal__wrapper")) {
      const { parentElement } = target;
      parentElement.classList.toggle("hidden");
    } else {
      console.log(_modalId);
      const el = document.getElementById(_modalId) as HTMLElement;
      console.log(el);
      el.classList.contains("hidden") && el.classList.toggle("hidden");
    }
  };
}