import './styles/style.scss';
import Utils from './components/utils';
import mainElement from './pages/main.html';
import decorationsElement from './pages/decorations.html';
import treeElement from './pages/tree.html';
import { Colors, ColorsKey, Data, Routes, Shapes, ShapesKey,  Sizes,  SizeKey,  SortModel, SortOrder, SortOrderKey, DragEvent } from './components/types';
import _default, { target, API } from "nouislider";
const noUiSlider = _default;
import data from './data';

const routes: Routes = {
  '/': mainElement,
  '/decorations': decorationsElement,
  '/tree': treeElement,                                                   
  'error': 'error'
}

const sortModel: SortModel = {
  shapes: [],
  colors: [],
  sizes: [],
}

const favorites: string[] = [];

const start = () => {
  const link = Utils.parseURL();
  const elem = routes[link];
  document.querySelector('.main-root').innerHTML = elem;
  if (link === '/decorations') {
    createNoUISliders();
    addControlsEvents();
    drawCards(data);
  } else if (link === '/tree') {
    addTreeEvents();
    drawFavorites();
    alert('Если есть возможность, проверьте, пожалуйста, позже! С наступающим!:)')
  }
}

window.addEventListener('hashchange', start);
window.addEventListener('load', start);

const addControlsEvents = () => {
  const search = document.querySelector(".form-control") as HTMLInputElement;
  const select = document.querySelector(".form-select") as HTMLInputElement;
  const shapes: NodeListOf<HTMLElement> =
    document.querySelectorAll(".shape-button");

  const colors: NodeListOf<HTMLElement> =
    document.querySelectorAll(".color-button");

  const sizes: NodeListOf<HTMLInputElement> =
    document.querySelectorAll(".size-input");

  const favorite: HTMLInputElement = 
    document.querySelector(".favorite-input");

  const countSlider: noUiSlider.Instance = document.querySelector(".count-slider");
  const yearSlider: noUiSlider.Instance = document.querySelector(".year-slider");
  const reset = document.querySelector(".reset-filters");
  


  search.addEventListener('input', () => { 
    sortModel.search = search.value.toLowerCase();
    localStorage.setItem('search', search.value.toLowerCase());
    filterCards();
  });
  select.addEventListener('input', () => {
    const sort = select.value as SortOrderKey;
    sortModel.sort = SortOrder[sort];
    localStorage.setItem('select', select.value);
    filterCards();
   });
  shapes.forEach((item) => {
    item.addEventListener('click', () => {
      const shape = item.dataset.filter as ShapesKey;
      const idx = sortModel.shapes.indexOf(Shapes[shape]);
      idx === -1
          ? sortModel.shapes.push(Shapes[shape])
          : sortModel.shapes.splice(idx, 1);
      item.classList.toggle('active');
      localStorage.setItem('shapes', sortModel.shapes.toString());
      filterCards();
    })
  });
  colors.forEach((item) => {
    item.addEventListener('click', () => {
      const color = item.dataset.filter as ColorsKey;
      const idx = sortModel.colors.indexOf(Colors[color]);
      idx === -1
          ? sortModel.colors.push(Colors[color])
          : sortModel.colors.splice(idx, 1);
      item.classList.toggle('active');
      filterCards();
    })
  });
  sizes.forEach((item) => {
    item.addEventListener('click', () => {
      const size = item.value as SizeKey;
      const idx = sortModel.sizes.indexOf(Sizes[size]);
      idx === -1
          ? sortModel.sizes.push(Sizes[size])
          : sortModel.sizes.splice(idx, 1);
      filterCards();
    })
  });
  favorite.addEventListener('input', () => { 
    sortModel.favorite = favorite.checked;
    filterCards();
  });
  reset.addEventListener('click', () => {
    search.value = '';
    select.value = '';
    shapes.forEach((elem) => { elem.classList.remove('active') });
    colors.forEach((elem) => { elem.classList.remove('active') });
    sizes.forEach((elem) => { elem.checked = false });
    favorite.checked = false;
    
    for (let key in sortModel) {
      const check = key as keyof typeof sortModel;
      delete sortModel[check];
    }
    sortModel.shapes = [];
    sortModel.colors = [];
    sortModel.sizes = [];

    countSlider.noUiSlider.reset();
    yearSlider.noUiSlider.reset();

    document.querySelector('.count-slider__start').innerHTML = '1';
    document.querySelector('.count-slider__end').innerHTML = '12';
    document.querySelector('.year-slider__start').innerHTML = '1940';
    document.querySelector('.year-slider__end').innerHTML = '2020';


    filterCards();
  });
};

const filterCards = () => {
  const cards: Data[] = [];
  data.forEach((card, idx) => {
    if (sortModel.search && !card.name.toLowerCase().includes(sortModel.search)) { return; }
    if (sortModel.shapes && sortModel.shapes.length > 0) {
      const check = card.shape as Shapes;
      if (!sortModel.shapes.includes(check)) { return; }
    }
    if (sortModel.colors && sortModel.colors.length > 0) {
      const check = card.color as Colors;
      if (!sortModel.colors.includes(check)) { return; }
    }
    if (sortModel.sizes && sortModel.sizes.length > 0) {
      const check = card.size as Sizes;
      if (!sortModel.sizes.includes(check)) { return; }
    }
    if (sortModel.favorite && sortModel.favorite !== card.favorite) { return; }

    if (sortModel.minQuantity && sortModel.minQuantity > card.count) { return; }
    if (sortModel.maxQuantity && sortModel.maxQuantity < card.count) { return; }
    if (sortModel.minYear && sortModel.minYear > card.year) { return; }
    if (sortModel.maxYear && sortModel.maxYear < card.year) { return; }

    cards.push(card);
  });

  if (sortModel.sort) {
    if (sortModel.sort == 'az') { cards.sort((a, b) => a.name.charCodeAt(0) - b.name.charCodeAt(0)) }
    if (sortModel.sort == 'za') { cards.sort((a, b) => b.name.charCodeAt(0) - a.name.charCodeAt(0)) }
    if (sortModel.sort == 'min') { cards.sort((a, b) => +a.year - +b.year) }
    if (sortModel.sort == 'max') { cards.sort((a, b) => +b.year - +a.year) }
  }

  drawCards(cards);
}

const createNoUISliders = () => {
  const countSlider: noUiSlider.Instance = document.querySelector('.count-slider');
  const yearSlider: noUiSlider.Instance = document.querySelector('.year-slider');
  const countStart = document.querySelector('.count-slider__start');
  const countEnd = document.querySelector('.count-slider__end');
  const yearStart = document.querySelector('.year-slider__start');
  const yearEnd = document.querySelector('.year-slider__end');
  
  noUiSlider.create(countSlider, {
  start: [1, 12],
  connect: true,
  range: {
    min: 1,
    max: 12,
  },
  step: 1,
  });

  noUiSlider.create(yearSlider, {
  start: [1940, 2020],
  connect: true,
  range: {
    min: 1940,
    max: 2020,
  },
  step: 10,
  });

  (<API>countSlider.noUiSlider).on("slide", (arr, handle) => {
    if (handle) {
      const num = Math.floor(+arr[1]);
      sortModel.maxQuantity = num;
      countEnd.innerHTML = num.toString();
    } else {
      const num = Math.floor(+arr[0]);
      sortModel.minQuantity = num;
      countStart.innerHTML =num.toString();
    }
    filterCards();
  });

  (<API>yearSlider.noUiSlider).on("slide", (arr, handle) => {
    if (handle) {
      const num = Math.floor(+arr[1]);
      sortModel.maxYear = num
      yearEnd.innerHTML = num.toString();
    } else {
      const num = Math.floor(+arr[0]);
      sortModel.minYear = num;
      yearStart.innerHTML = num.toString();
    }
    filterCards();
  });
};

const drawCards = (data: Data[]) => {
  const cardsRoot = document.querySelector('.cards');
  cardsRoot.innerHTML = '';
  const favoriteCounter = document.querySelector('.favorite-counter');
  data.forEach((card) => {
    const fragment = document.createDocumentFragment();
    const cardItem = document.createElement("div") as HTMLElement;
    const header = document.createElement("h2") as HTMLElement;
    const img = document.createElement("img");
    const cardTextArr = [
      `Quantity: ${card.count}`,
      `Year: ${card.year}`,
      `Form: ${card.shape}`,
      `Color: ${card.color}`,
      `Size: ${card.size}`,
      `Favorite: ${card.favorite}`,
    ];

    cardItem.className =
      "card-item d-flex flex-column justify-content-center align-items-center";
    cardItem.dataset.num = card.num;
    if (favorites.includes(cardItem.dataset.num)) { cardItem.classList.add('active'); }
    header.innerText = `${card.name}`;
    img.width = 100;
    img.height = 100;
    img.src = `./src/assets/toys/${+card.num}.png`;

    fragment.appendChild(cardItem);
    cardItem.appendChild(header);
    cardItem.appendChild(img);
    for (let i = 0; i < 6; i++) {
      const item = document.createElement("p");
      item.className = "card-item__p";
      item.innerText = `${cardTextArr[i]}`;
      cardItem.appendChild(item);
    }
    cardsRoot.appendChild(fragment);
    
    
    cardItem.addEventListener('click', () => {
      if (cardItem.classList.contains('active')) {
        const idx = favorites.indexOf(cardItem.dataset.num);
        cardItem.classList.remove('active');
        favorites.splice(idx, 1);
      } else if (favorites.length < 20) { 
        cardItem.classList.add('active') 
        favorites.push(card.num); 
      } else {
        alert('No more space for favorites!');
      }
      favoriteCounter.innerHTML = favorites.length.toString();
    });

  });
  if (data.length === 0) {
    const noCards = document.createElement('div');
    noCards.classList.add('no-cards');
    const message = document.createElement('h2');
    message.textContent = 'Sorry, no matches found!';
    noCards.append(message);
    cardsRoot.append(noCards);
  }
}

const addTreeEvents = () => {
  const audioBtn = document.querySelector('.audio-control');
  const music: HTMLAudioElement = document.querySelector('.music');
  const snowBtn = document.querySelector('.snow-control');
  let idxSnowInterval: number;
  const treeItems: NodeListOf<HTMLElement> = document.querySelectorAll('.tree-item');
  const bgItems: NodeListOf<HTMLElement> = document.querySelectorAll('.bg-item');
  const garlandItems: NodeListOf<HTMLElement> = document.querySelectorAll('.garland-item');
  const bg: HTMLElement = document.querySelector('.tree');
  const tree: HTMLImageElement = document.querySelector('.tree-image');

  audioBtn.addEventListener('click', () => {
    audioBtn.classList.toggle('active');
    audioBtn.classList.contains('active')
        ? music.play()
        : music.pause();
  });
  snowBtn.addEventListener('click', () => {
    snowBtn.classList.toggle('active');
    snowBtn.classList.contains('active')
        ? idxSnowInterval = window.setInterval(Utils.createSnowFlake, 50)
        : Utils.clearSnow(idxSnowInterval);
    
  });
  treeItems.forEach((item) => {
    item.addEventListener('click', () => {
      tree.src = `./src/assets/tree/${item.dataset.tree}.png`
    });
  });
  bgItems.forEach((item) => {
    item.addEventListener('click', () => {
      bg.style.backgroundImage = `url(./src/assets/bg/${item.dataset.bg}.jpg)`;
    });
  });
  garlandItems.forEach((item) => {
    item.addEventListener('click', () => {
      console.log('works');
    });
  });

  const map = document.querySelector('.testMap');
  const area: HTMLAreaElement = document.querySelector('.testMapArea');
  area.ondragover = (ev) => { ev.preventDefault(); }
  area.ondrop = (ev) => {
    ev.preventDefault();
    const data = ev.dataTransfer.getData("text");
    const elem = document.getElementById(data);
    (<HTMLAreaElement>area).appendChild(elem);
    console.log(ev);
    elem.style.left = ev.offsetX - 25 + 'px';
    elem.style.top = ev.y - 25 - 70 + 'px';
    
  }
}

const drawFavorites = () => {
  const catalog = document.querySelector('.tree-toys__catalog');
  catalog.innerHTML = '';
  if (favorites.length > 0) {
    favorites.forEach((idx) => {
      const item = Utils.createFavorite(data[+idx - 1]);
      catalog.append(item);
    });
  } else {
    const newData = data.slice(0,20);
    newData.forEach((card) => {
      const item = Utils.createFavorite(card);
      catalog.append(item);
    });
  }
}