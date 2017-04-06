import React from 'react';
import { Route, IndexRedirect } from 'react-router';
import App from './App';
import Home from './Home';
import Contact from './Contact';
import Photos from './Photos';
import About from './About';

const Routes = (
  <Route path="/" component={App}>
    <IndexRedirect to="home" />
    <Route path="home" component={Home} />
    <Route path="contact" component={Contact} />
    <Route path="photos" component={Photos} />
    <Route path="about" component={About} />
  </Route>
)

export default Routes;