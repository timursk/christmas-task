import { callbackPage } from "../../Utils/types";
import Data from "../model/data";
import './nouislider.css';
import _default, { target, API } from 'nouislider';
const noUiSlider = _default;

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

    search.addEventListener('input', () => { console.log(search.value) });
    select.addEventListener('input', function () { console.log(this.value) });
    shapes.forEach((shape) => shape.addEventListener('click', () => { if(shape.classList.contains('active')) console.log(shape.dataset.filter) }));
    colors.forEach((color) => color.addEventListener('click', () => { if(color.classList.contains('active')) console.log(color.dataset.filter) }));
    sizes.forEach((size) => size.addEventListener('click', () => { if(size.checked) console.log(size.value) }))
    favorite.addEventListener('input', () => { console.log(favorite.checked) })
  
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

    (<API>countSlider.noUiSlider).on('slide', (arr) => {
      console.log(arr);
    });
    (<API>yearSlider.noUiSlider).on('slide', (arr) => {
      console.log(arr);
    });
  }
}

export default Controller;