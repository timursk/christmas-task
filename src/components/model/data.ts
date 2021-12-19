import { IData } from "../../Utils/types";
import data from "../../data";
import { mainElement } from "../../pages/main/main";
import { decorationsElement } from "../../pages/decorations/decorations";
import { Routes } from "../../Utils/types";

class Data implements IData {
  cards: Object[];
  options: Object;
  data: Object[];
  routes: Routes;
  constructor() {
    this.cards = [];
    this.options = {
      num: null,
      name: null,
      count: null,
      year: null,
      shape: null,
      color: null,
      size: null,
      favorite: null,
    };
    this.data = data;
    this.routes = {
        '/': mainElement,
        '/decorations': decorationsElement,
        'ERROR': `alert('ERROR')`,
    }
  }

}

export default Data;