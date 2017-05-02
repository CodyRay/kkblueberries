import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import React from 'react';
import { render } from 'react-snapshot';
import { Router, browserHistory } from 'react-router';
import routes from './routes';

render(
  <Router routes={routes} history={browserHistory} />,
  document.getElementById('root')
);
