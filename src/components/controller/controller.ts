import Data from "../model/data";
import './nouislider.css';
import _default, { target, API } from 'nouislider';
const noUiSlider = _default;
import { Options, callbackPage } from "../../Utils/types";

class Controller {
  data: Data;
  constructor() {
    this.data = new Data();
  }

  getPage(link: string, callback: callbackPage) {
    const data = this.data.routes[link];
    callback(data);
    if (link == '/decorations') this.addControlsEvents();
  }

  getCards(callback: callbackPage) {
    console.log('works');
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
    // slider.noUiSlider.on('update', function (values: { [x: string]: any; }, handle: string | number) {
    //   var value = values[handle];
    //   console.log(handle);
    // });

    (<API>countSlider.noUiSlider).on('update', (arr, handle) => {
      if (handle) {
        let count = Math.floor(+arr[1]);
        this.data.options.countMax = count.toString();
      }
      else {
        let count = Math.floor(+arr[0]);
        this.data.options.countMin = count.toString();
      }
      console.log(this.data.options);
    });
    (<API>yearSlider.noUiSlider).on('update', (arr, handle) => {
      if (handle) {
        let count = Math.floor(+arr[1]);
        this.data.options.yearMax = count.toString();
      }
      else {
        let count = Math.floor(+arr[0]);
        this.data.options.yearMin = count.toString();
      }
      console.log(this.data.options);
    });
  }

  changeData(key: string, value: string | boolean) {
    this.data.options[key] = value;
    console.log(this.data.options);
    this.filterCards(key, value);
  }

  changeArrData(key: 'shape' | 'color' | 'size', value: string) {
    const idx = this.data.options[key].indexOf(value);
    (idx === -1)
        ? this.data.options[key].push(value)
        : this.data.options[key].splice(idx, 1);
    console.log(this.data.options);
  }

  filterCards(key: string, value: string | boolean) {
    const dataOptions: Options = {};
    for (let key in this.data.options) {
      if (key !== 'sort') {
        const value = this.data.options[key];
        if (value !== null || (Array.isArray(value) && value.length !== 0)) {
          dataOptions[key] = value;
        }
      }
    }
    console.log(dataOptions);
    
    this.data.cards.forEach((item, idx) => {
      if (+dataOptions.yearMin > +item.year || +dataOptions.yearMax < +item.year) this.data.cards.splice(idx, 1);
      // color: "желтый"
      // count: "2"
      // favorite: false
      // name: "Large ball with a pattern"
      // num: "1"
      // shape: "шар"
      // size: "большой"
      // year: "1960"
    }); 

    console.log(this.data.cards);
  }
}

export default Controller;