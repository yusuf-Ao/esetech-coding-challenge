import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import './output.css';
import './style.css';
import { Provider } from 'react-redux';
import store from './state/store.js';
import { StateContext } from './state/context/index.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <StateContext>
      <App />
    </StateContext>
  </Provider>
);
