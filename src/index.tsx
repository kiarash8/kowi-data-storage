import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import { Storage } from './storage';

ReactDOM.render(
  <React.StrictMode>
    <Storage.Provider>
      <App />
    </Storage.Provider>
  </React.StrictMode>,
document.getElementById('root'));
