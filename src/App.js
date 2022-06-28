import React from 'react'
import Helmet from 'react-helmet'
import Modal from 'react-modal'
import { Route, Switch, Redirect } from 'react-router'
import Body from './Body.js'
import Home from './Home'
import Products from './Products'
import Photos from './Photos'
import Covid from './Covid'
import Information from './Information'

// Title
const baseTitle = 'K&K  Blueberries - U-Pick Blueberries in Hermiston, Oregon!'
const defaultTitle = 'Welcome to ' + baseTitle
const titleTemplate = '%s ' + baseTitle

// Meta tags
const metaDescription =
  'K & K Blueberries offers u-pick blueberries in Hermiston, Oregon, located in the pacific northwest'
const metaKeywords =
  'blueberries, pick bluberries, u-pick, family blueberry farm, Hermiston bluberries, fun u-pick farms, berry farm pacific northwest, July blueberries, bluberry farm, Umatilla county farm, Minnehaha farm'

// Status message shown at the top of all pages
const statusMessage = (
  <p>
    We are opening for the 2022 fresh blueberry picking season on{' '}
    <strong>Wednesday, June 29th</strong>! Looking forward to seeing our
    returning customers and meeting our new ones!
  </p>
)

// const statusMessage = (
//   <p>
//     K {'&'} K Blueberries has <strong>closed for the 2021 season</strong>. 💜💜💜 I want to thank all the people who came out during this short, hot blueberry season. You supported my small business, got outside with your family and friends, and went home with some delicious blueberries. It was a great season made better for seeing all of you! 💜💜💜. Remember to start looking around Father's Day on our <a href="https://www.facebook.com/K-and-K-Blueberries-104303779663777/" target="_blank" rel="noopener noreferrer">Facebook page</a> - it's when I get a good idea of when I will be able to open. See you next year! Kathy
//   </p>
// )

// const warningMessage = (
//   <p>
//     We'll be open for the 2020 season and following social distancing
//     guidelines. Please read our{' '}
//     <Link to={{ pathname: '/covid19' }}>COVID-19 Policy</Link> before arriving.
//   </p>
// )

// const warningMessage = (
//   <p>
//     Due to extreme heat we are extending our morning hours 6:30 to 2 Monday
//     through Sunday but will NOT be having an evening pick. Sunday is still 7 am
//     to 2. Sorry for the inconvenience.
//   </p>
// )

const warningMessage = (
  <p>
    Please remember that we close in high temperatures for our patrons safety.
    Call or visit our{' '}
    <a
      href="https://www.facebook.com/K-and-K-Blueberries-104303779663777/"
      target="_blank"
      rel="noopener noreferrer"
    >
      Facebook page
    </a>{' '}
    for up to date information.
  </p>
)

// const warningMessage = undefined

Modal.setAppElement('#app')

export default () => (
  <div id="app">
    <Helmet titleTemplate={titleTemplate} defaultTitle={defaultTitle}>
      <meta name="description" content={metaDescription} />
      <meta name="keywords" content={metaKeywords} />
    </Helmet>
    <Body warningMessage={warningMessage} statusMessage={statusMessage}>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/covid19" component={Covid} />
        <Route exact path="/photos" component={Photos} />
        <Route exact path="/products" component={Products} />
        <Route exact path="/info" component={Information} />
        <Redirect to="/" />
      </Switch>
    </Body>
  </div>
)
