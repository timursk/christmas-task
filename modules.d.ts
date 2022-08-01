declare module '*.html';
declare module '*.webp';
declare module '*.png';
declare module '*.jpg';
declare module '*.jpeg';
declare module noUiSlider {
  interface Instance extends HTMLElement {
    noUiSlider: noUiSlider;
  }
}