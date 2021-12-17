// const greenBall = require('./assets/image/green-ball.jpg');
// const purpleBall = require('./assets/image/purple-ball.png');

import './styles/style.scss';
import { mainElement } from './pages/main/main.js';


const root = document.createElement('div');
root.classList.add('root');
document.body.append(root);
root.innerHTML = mainElement
