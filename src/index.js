import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import React from 'react';
import { render } from 'react-snapshot';
import { BrowserRouter } from 'react-router-dom';
import App from './App'

render(
  <BrowserRouter basename="/kkblueberries">
    <App />
  </BrowserRouter>,
  document.getElementById('root')
);
