// TODO
// Page Not found
// Looks like you've followed a broken link or entered a URL that doesn't exist on this site.
// < Back to our site
import React from 'react'
import { Link } from 'gatsby'

import Layout from '../components/Layout'
import Home from '../components/Home'

export default () => (
  <Layout>
    <h1>Page Not Found</h1>
    <p>
      Looks like you've followed a broken link or entered a URL that doesn't
      exist on this site.
    </p>
    <Link to="/">Back to our site</Link>
  </Layout>
)
