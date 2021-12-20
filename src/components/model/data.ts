import { IData, Routes, Options, startData } from "../../Utils/types";
import data from "../../data";
import { mainElement } from "../../pages/main/main";
import { decorationsElement } from "../../pages/decorations/decorations";

class Data implements IData {
  cards: startData[];
  options: Options;
  data: startData[];
  routes: Routes;
  constructor() {
    this.cards = data;
    this.options = {
      sort: null,
      name: null,
      countMin: null,
      countMax: null,
      yearMin: null,
      yearMax: null,
      shape: [],
      color: [],
      size: [],
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