class View {
  drawPage(data: string): void {
    const mainRoot = document.querySelector('.main-root');
    mainRoot.innerHTML = data;
    // querySelectorAll<K extends keyof HTMLElementTagNameMap>(selectors: K): NodeListOf<HTMLElementTagNameMap[K]>;
    const shapes: NodeListOf<HTMLElement> = document.querySelectorAll('.shape-button');
    // shapes.forEach((shape) => console.log(shape.dataset));
    shapes.forEach((shape) => shape.addEventListener('click', () => {shape.classList.toggle('active')}));
  }
}

export default View;