import Data from "../model/data";
import './nouislider.css';
import _default, { target, API } from 'nouislider';
const noUiSlider = _default;
import { Options, callbackPage, callbackCards, startData } from "../../Utils/types";
import View from "../view/appView";

class Controller {
  data: Data;
  view: View;
  cards: startData[];
  searchText: string | null;
  sortText: string | null;
  constructor() {
    this.data = new Data();
    this.view = new View();
    this.cards = this.data.data;
    this.searchText = null;
    this.sortText = null;
  }

  getPage(link: string, callback: callbackPage) {
    const data = this.data.routes[link];
    this.view.drawPage(data);
    if (link == '/decorations') this.addControlsEvents();
  }

  getCards(callback: callbackCards) {
    this.filterCards();
    
  }

  addControlsEvents() {
    const search = document.querySelector('.form-control') as HTMLInputElement;
    const select = document.querySelector('.form-select') as HTMLInputElement;
    // const countSlider = document.querySelector('.count-slider') as HTMLElement; year-slider
    this.addControlsSliders();
    const shapes: NodeListOf<HTMLElement> = document.querySelectorAll('.shape-button');
    const colors: NodeListOf<HTMLElement> = document.querySelectorAll('.color-button');
    const sizes: NodeListOf<HTMLInputElement> = document.querySelectorAll('.size-input');
    const favorite = document.querySelector('.favorite-input') as HTMLInputElement;
    
    search.addEventListener('input', () => { this.changeData('name', search.value) });
    select.addEventListener('input', () => { this.changeData('sort', select.value) });
    shapes.forEach((shape) => shape.addEventListener('click', () => { this.changeArrData('shape', shape.dataset.filter) }));
    // colors.forEach((color) => color.addEventListener('click', () => { if(color.classList.contains('active')) console.log(color.dataset.filter) }));
    colors.forEach((color) => color.addEventListener('click', () => { this.changeArrData('color', color.dataset.filter) }));
    sizes.forEach((size) => size.addEventListener('click', () => { this.changeArrData('size', size.value) }));
    favorite.addEventListener('input', () => { this.changeData('favorite', favorite.checked) })
  
  }

  addControlsSliders() {
    const countSlider: noUiSlider.Instance = document.querySelector('.count-slider') as noUiSlider.Instance;
    const yearSlider: noUiSlider.Instance = document.querySelector('.year-slider') as noUiSlider.Instance;

    noUiSlider.create(countSlider, {
      start: [1, 12],
      connect: true,
      range: {
          'min': 1,
          'max': 12
      },
      step: 1,
    });
    
    noUiSlider.create(yearSlider, {
      start: [1940, 2020],
      connect: true,
      range: {
          'min': 1940,
          'max': 2020
      },
      step: 10,
    });

    (<API>countSlider.noUiSlider).on('slide', (arr, handle) => {
      if (handle) {
        let count = Math.floor(+arr[1]);
        this.data.options.countMax = count.toString();
        this.filterCards();
      }
      else {
        let count = Math.floor(+arr[0]);
        this.data.options.countMin = count.toString();
        this.filterCards();
      }
    });
    (<API>yearSlider.noUiSlider).on('slide', (arr, handle) => {
      if (handle) {
        let count = Math.floor(+arr[1]);
        this.data.options.yearMax = count.toString();
        this.filterCards();
      }
      else {
        let count = Math.floor(+arr[0]);
        this.data.options.yearMin = count.toString();
        this.filterCards();
      }
    });
  }

  changeData(key: string, value: string | boolean) {
    this.data.options[key] = value;
    this.filterCards();
  }

  changeArrData(key: 'shape' | 'color' | 'size', value: string) {
    const idx = this.data.options[key].indexOf(value);
    (idx === -1)
        ? this.data.options[key].push(value)
        : this.data.options[key].splice(idx, 1);
    this.filterCards();
  }

  filterCards() {
    const options = this.data.options;
    const data = this.data.data;
    const cards: startData[] = [];

    data.forEach((card, idx) => {
      if (options.name && typeof options.name === 'string' && !card.name.toLowerCase().includes(options.name)) return;
      if (options.countMax && +card.count > +options.countMax) return;
      if (options.countMin && +card.count < +options.countMin) return;
      
      if (options.yearMax && +card.year > +options.yearMax) return;
      if (options.yearMin && +card.year < +options.yearMin) return;
      
      if (options.shape.length > 0) {
        if (!options.shape.includes(card.shape)) return;
      }
     
      if (options.color.length > 0) {
        if (!options.color.includes(card.color)) return;
      }
      
      if (options.size.length > 0) {
        if (!options.size.includes(card.size)) return;
      }

      if (options.favorite && options.favorite !== card.favorite) return;
      cards.push(card); 
    });
    if (options.sort && typeof options.sort === 'string') {
      if (options.sort == 'az') {
        cards.sort((a,b) => a.name.charCodeAt(0) - b.name.charCodeAt(0));
      }
      if (options.sort == 'za') { 
        cards.sort((a,b) => b.name.toLowerCase().charCodeAt(0) - a.name.toLowerCase().charCodeAt(0));
       }
      if (options.sort == 'low') { 
        cards.sort((a,b) => +a.year - +b.year);
       }
      if (options.sort == 'high') {  
        cards.sort((a,b) => +b.year - +a.year);
      }
    }
    this.view.drawCards(cards);
  }
}

export default Controller;