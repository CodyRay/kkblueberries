import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App'

const trackingId = 'UA-101612945-1';

const isSnapshot = (window && window.reactSnapshotRender)
const render = isSnapshot ? window.reactSnapshotRender : ReactDOM.render;

render(
  <BrowserRouter basename="/">
    <App />
  </BrowserRouter>,
  document.getElementById('root')
);

if (!isSnapshot) {
  import('./analytics')
    .then(({ load }) => {
      load(trackingId)
      console.log('Google Analytics Loaded');
    })
    .catch((e) => console.log('Google Analytics Failed to Load:', e));
}
