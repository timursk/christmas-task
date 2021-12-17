// const greenBall = require('./assets/image/green-ball.jpg');
// const purpleBall = require('./assets/image/purple-ball.png');
import './styles/style.scss';
import { mainElement } from './pages/main/main.js';
import { decorationsElement } from './pages/decorations/decorations';


const root = document.createElement('div');
root.classList.add('root');
document.body.append(root);
root.innerHTML = mainElement;

const mainRoot = document.querySelector('.main-root');
mainRoot.innerHTML = decorationsElement;
