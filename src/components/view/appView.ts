import { Options, startData } from "../../Utils/types";

class View {
  drawPage(data: string): void {
    const mainRoot = document.querySelector('.main-root');
    mainRoot.innerHTML = data;
    // querySelectorAll<K extends keyof HTMLElementTagNameMap>(selectors: K): NodeListOf<HTMLElementTagNameMap[K]>;
    const shapes: NodeListOf<HTMLElement> = document.querySelectorAll('.shape-button');
    const colors: NodeListOf<HTMLElement> = document.querySelectorAll('.color-button');
    // shapes.forEach((shape) => console.log(shape.dataset));
    shapes.forEach((shape) => shape.addEventListener('click', () => {shape.classList.toggle('active')}));
    colors.forEach((color) => color.addEventListener('click', () => {color.classList.toggle('active')}));
  }

  drawCards(data: startData[]): void {
    const cardsRoot = document.querySelector('.cards');
    cardsRoot.innerHTML = '';
    data.forEach(card => {
      const fragment = document.createDocumentFragment();
      const cardItem = document.createElement('div') as HTMLElement;
      const header = document.createElement('h2') as HTMLElement;
      const img = document.createElement('img');
      const cardTextArr = [`Quantity: ${card.count}`, `Year: ${card.year}`, `Form: ${card.shape}`, `Color: ${card.color}`, 
          `Size: ${card.size}`, `Favorite: ${card.favorite}`];
      

      cardItem.className = 'card-item d-flex flex-column justify-content-center align-items-center';
      header.innerText = `${card.name}`;
      img.width = 100;
      img.height = 100;
      img.src = `https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/christmas-task/assets/toys/${+card.num}.png`;

      fragment.appendChild(cardItem);
      cardItem.appendChild(header);
      cardItem.appendChild(img);
      for (let i = 0; i < 6; i++) {
        const item = document.createElement('p');
        item.className = 'card-item__p';
        item.innerText = `${cardTextArr[i]}`;
        cardItem.appendChild(item);
      }
      cardsRoot.appendChild(fragment);
    });
  }
}

export default View;