import React, { Component } from 'react';
import Helmet from 'react-helmet';
import Body from './Body.js'

// Title 
var baseTitle = 'K&K  Blueberries - U-Pick Blueberries in Hermiston, Oregon!';
var defaultTitle = 'Welcome to ' + baseTitle;
var titleTemplate = '%s ' + baseTitle;

// Meta tags
var metaDescription = 'K & K Blueberries offers u-pick blueberries in Hermiston, Oregon, located in the pacific northwest';
var metaKeywords = 'blueberries, pick bluberries, u-pick, family blueberry farm, Hermiston bluberries, fun u-pick farms, berry farm pacific northwest, July blueberries, bluberry farm, Umatilla county farm, Minnehaha farm';

// Status message shown at the top of all pages
var statusMessage = <p>We are <strong>closed for the 2016 season</strong>, we look forward to seeing you next year! Thank you for another wonderful year, the opening date for next season will be posted around Father's Day 2017. Call or visit our <a href="https://www.facebook.com/K-and-K-Blueberries-104303779663777/" target="_blank">Facebook page</a> for up to date information.</p>

class App extends Component {
  render() {
    return (
      <div id="app">
        <Helmet titleTemplate={titleTemplate} defaultTitle={defaultTitle}>
          <link rel="shortcut icon" href={process.env.PUBLIC_URL + '/favicon.ico'} />
          <meta name="description" content={metaDescription} />
          <meta name="keywords" content={metaKeywords} />
        </Helmet>
        <Body statusMessage={statusMessage}>
          {this.props.children}
        </Body>
      </div >
    );
  }
}

export default App;