import React from 'react'
import { withPrefix } from 'gatsby'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import Modal from 'react-modal'
import Body from './Body.js'

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
    We are now <strong>closed for the 2018 season</strong>. Thank you for coming
    out and supporting our small farm. See you next year! Call or visit our{' '}
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

// Modal.setAppElement('#app')

export const Layout = ({ children }) => (
  <div id="app">
    <Helmet titleTemplate={titleTemplate} defaultTitle={defaultTitle}>
      <meta charset="utf-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      {/* <!-- The above 3 meta tags *must* come first in the head; any other head content must come *after* these tags --> */}

      {/* <!-- THANK YOU http://realfavicongenerator.net --> */}
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href={withPrefix('/apple-touch-icon.png?v=GvJ8AGdqzM')}
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href={withPrefix('/favicon-32x32.png?v=GvJ8AGdqzM')}
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href={withPrefix('/favicon-16x16.png?v=GvJ8AGdqzM')}
      />
      {/* Manually update path in file if prefix needed! */}
      <link rel="manifest" href={withPrefix('/manifest.json?v=GvJ8AGdqzM')} />
      <link
        rel="mask-icon"
        href={withPrefix('/safari-pinned-tab.svg?v=GvJ8AGdqzM')}
        color="#2c405e"
      />
      <link
        rel="shortcut icon"
        href={withPrefix('/favicon.ico?v=GvJ8AGdqzM')}
      />
      {/* Manually update path in file if prefix needed! */}
      <meta
        name="msapplication-config"
        content={withPrefix('/browserconfig.xml?v=GvJ8AGdqzM')}
      />
      <meta name="theme-color" content="#ffffff" />
      <meta name="description" content={metaDescription} />
      <meta name="keywords" content={metaKeywords} />
    </Helmet>
    <Body statusMessage={statusMessage}>{children}</Body>
  </div>
)

Layout.propTypes = {
  children: PropTypes.node,
}

export default Layout
