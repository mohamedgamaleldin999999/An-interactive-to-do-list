import './style.css';
import * as listModule from './modules/list.js';
import * as interactive from './modules/interactive.js';

document.addEventListener('DOMContentLoaded', listModule.createItem);
document.addEventListener('DOMContentLoaded', interactive.addCheckboxListener);