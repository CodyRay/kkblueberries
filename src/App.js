import React from 'react';
import Helmet from 'react-helmet';
import Modal from 'react-modal';
import { Route, Switch, Redirect } from 'react-router';
import Body from './Body.js'
import Home from './Home';
import Photos from './Photos';
import Information from './Information';

// Title 
const baseTitle = 'K&K  Blueberries - U-Pick Blueberries in Hermiston, Oregon!';
const defaultTitle = 'Welcome to ' + baseTitle;
const titleTemplate = '%s ' + baseTitle;

// Meta tags
const metaDescription = 'K & K Blueberries offers u-pick blueberries in Hermiston, Oregon, located in the pacific northwest';
const metaKeywords = 'blueberries, pick bluberries, u-pick, family blueberry farm, Hermiston bluberries, fun u-pick farms, berry farm pacific northwest, July blueberries, bluberry farm, Umatilla county farm, Minnehaha farm';

// Status message shown at the top of all pages
const statusMessage = <p>We are now <strong>closed for the 2018 season</strong>. Thank you for coming out and supporting our small farm. See you next year! Call or visit our <a href="https://www.facebook.com/K-and-K-Blueberries-104303779663777/" target="_blank" rel="noopener noreferrer">Facebook page</a> for up to date information.</p>

Modal.setAppElement('#app');

export default () => (
  <div id="app">
    <Helmet titleTemplate={titleTemplate} defaultTitle={defaultTitle}>
      <meta name="description" content={metaDescription} />
      <meta name="keywords" content={metaKeywords} />
    </Helmet>
    <Body statusMessage={statusMessage}>
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path="/photos" component={Photos} />
        <Route exact path="/info" component={Information} />
        <Redirect to='/' />
      </Switch>
    </Body>
  </div >
);
