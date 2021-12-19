import { callbackPage } from "../../Utils/types";
import Data from "../model/data";
class Controller {
  data: Data;
  constructor() {
    this.data = new Data();
  }

  async getPage(link: string, callback: callbackPage) {
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
    

    search.addEventListener('input', () => { console.log(search.value) });
    select.addEventListener('input', function () { console.log(this.value) });
  }
}

export default Controller;