import React from 'react'
import Helmet from 'react-helmet'
import Modal from 'react-modal'
import { Route, Switch, Redirect } from 'react-router'
import Body from './Body'
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
    We are opening for the 2024 U-pick season on{' '}
    <strong>Monday, June 17th</strong>! Looking forward to seeing our
    returning customers and meeting our new ones!
  </p>
)

// const statusMessage = (
//   <p>
//     We're <strong>closed for the 2023 season.</strong> Thank you to everyone who came out to support my small business this year. I truly love seeing old friends and meeting new ones! Remember to start checking the website around Father's Day next year or follow K {'&'} K Blueberries on <a href="https://www.facebook.com/K-and-K-Blueberries-104303779663777/" target="_blank" rel="noopener noreferrer">Facebook</a> to find out when we will open for the 2024 season. I will be selling all my syrups and jams at local markets this winter.
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
//     We are closing evening picks due to high temperatures starting Thursday June 27th. Sorry for the inconvenience.
//   </p>
// )

//const warningMessage = (
//  <p>
//    Please remember that we close in high temperatures for our patrons safety.
//    Call or visit our{' '}
//    <a
//      href="https://www.facebook.com/K-and-K-Blueberries-104303779663777/"
//      target="_blank"
//      rel="noopener noreferrer"
//    >
//      Facebook page
//    </a>{' '}
//    for up to date information.
//  </p>
//)

const warningMessage = undefined

Modal.setAppElement('#root')

function App() {
  return (
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
}

export default App
