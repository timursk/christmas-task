import Controller from './controller/controller';
import Data from './model/data';
import View from './view/appView';

class App {
  data: Data;
  controller: Controller;
  view: View;
  constructor() {
    this.data = new Data();
    this.controller = new Controller();
    this.view = new View();
  }

  start(link: string): void {
    
  }
}

export default App;