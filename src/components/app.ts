import Controller from './controller/controller';
import Data from './model/data';
import View from './view/appView';
import { Routes } from '../Utils/types';



class App {
  data: Data;
  controller: Controller;
  view: View;
  constructor() {
    this.data = new Data();
    this.controller = new Controller();
    this.view = new View();
  }

  async start(link: string): Promise<void> {
    this.controller.getPage(link, (data) => { this.view.drawPage(data) });
    // this.controller.getCards((data) => this.view.draw(data))
    
  }
}

export default App;