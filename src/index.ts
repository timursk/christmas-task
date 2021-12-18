// const greenBall = require('./assets/image/green-ball.jpg');
// const purpleBall = require('./assets/image/purple-ball.png');
import './styles/style.scss';
import data from './data';
import { mainElement } from './pages/main/main.js';
import { decorationsElement } from './pages/decorations/decorations';
import { Routes } from './Utils/types';
import { Utils } from './Utils/utils';
import noUiSlider from 'nouislider';

const mainRoot = document.querySelector('.main-root');
const routes: Routes = {
  '/': mainElement,
  '/decorations': decorationsElement,
  'ERROR': `alert('ERROR')`,
}

const router = () => {
  const request: string = Utils.parseURL();
  const page = request ? routes[request] : routes['ERROR'];
  mainRoot.innerHTML = page;

}

window.addEventListener('hashchange', router);
window.addEventListener('load', router);

// import App from './components/App';

// const app = new App();
// app.start();