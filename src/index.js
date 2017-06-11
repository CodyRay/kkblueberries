import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App'

const render = (window && window.reactSnapshotRender) ? window.reactSnapshotRender : ReactDOM.render;

render(
  <BrowserRouter basename="/kkblueberries">
    <App />
  </BrowserRouter>,
  document.getElementById('root')
);
