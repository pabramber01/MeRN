import React from 'react';
import ReactDOM from 'react-dom/client';
import './assets/css/index.scss';
import '../node_modules/bootstrap/dist/js/bootstrap.min.js';
import store from './context';
import { Provider } from 'react-redux';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
