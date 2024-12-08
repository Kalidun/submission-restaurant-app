import 'regenerator-runtime';
import '../styles/main.css';
import App from './views/app';
import './components/index.js';
import swRegister from './utils/sw-register.js';

const loadingScreen = document.querySelector('.loading-screen');

const app = new App({
  button: document.querySelector('.toggle-menu'),
  drawer: document.querySelector('.sidebar'),
  content: document.querySelector('#main-content'),
});

document.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    loadingScreen.style.transform = 'translateY(-100%)';
  }, 100);
});

window.addEventListener('hashchange', () => {
  app.renderPage();
});

window.addEventListener('load', () => {
  app.renderPage();
  swRegister();
});