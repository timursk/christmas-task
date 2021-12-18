import { IData } from "../../Utils/types";
class Data implements IData {
  cards: Object[];
  constructor() {
    this.cards = [];
  }
}

export default Data;