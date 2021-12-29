import { Data, DragEvent } from "./types";
import data from "../data";

const Utils = {
  parseURL: () => {
    const url = location.hash.slice(1).toLowerCase() || '/';
    return url;
  },
  createSnowFlake: () => {
    const snowFlake = document.createElement('i');
    snowFlake.innerHTML = '&#10052';
    snowFlake.classList.add('snowflake');
    snowFlake.style.left = Math.random() * window.innerWidth - 40 + 'px';
    snowFlake.style.animationDuration = Math.random() * 3 + 2 + 's';
    snowFlake.style.opacity = Math.random() + '';
    snowFlake.style.fontSize = Math.random() * 10 + 10 + 'px';

    document.querySelector('main').appendChild(snowFlake);

    setTimeout(() => {
      snowFlake.remove();
    }, 5000);
  },
  clearSnow: (idx: number) => {
    clearInterval(idx);
  },
  createFavorite: (card: Data) => {
    const item = document.createElement('div');
    const img = document.createElement('img');
    const count = document.createElement('p');
    item.className = 'tree-toys__item d-flex align-items-center justify-content-around';
    item.classList.add(`parent-${card.num}`);
    img.src = `./src/assets/toys/${card.num}.png`;
    count.innerText = card.count;
    count.className = `tree-toys__item__count tree-toys__item__count-${card.num}`;
    img.width = 50;
    img.height = 50;
    img.draggable = true;
    // img.id = `drag-${card.num}`;
    // img.ondragstart = handleDragEvent;
    img.style.position = 'absolute';
    img.style.left = 'calc(50% - 25px)';
    img.style.top = 'calc(50% - 25px)';
    item.append(count);
    for (let i = 0; i < +card.count; i++) {
      const clone: Node = img.cloneNode(true);
      (<HTMLImageElement>clone).id = `drag-${i}-${card.num}`;
      (<HTMLImageElement>clone).ondragstart = handleDragEvent;
      item.append(clone);
    }
    return item;
  },
}

export default Utils;

const handleDragEvent = (e: DragEvent<HTMLImageElement>) => {
  e.dataTransfer.setData('text', (<HTMLImageElement>e.target).id);
};

