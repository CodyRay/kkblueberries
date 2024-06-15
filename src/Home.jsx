import React from 'react'
import { Link } from 'react-router-dom'
import rowsOfBlueberries from './assets/rows_of_blueberries.jpg'
import largeBlueberry from './assets/large_blueberries_one_sitting_on_nickle.jpg'
import twoBuckets from './assets/two_buckets_of_blueberries.jpg'
import packageBlueberries from './assets/package_of_blueberries.jpg'
import truck from './assets/truck.jpg'

export default () => (
  <div id="home" className="text-center">
    <h1>Welcome to {'K & K Blueberries'}</h1>
    <div className="row">
      <div className="col-sm-3 col-sm-offset-1 hidden-xs">
        <img
          width="241"
          height="250"
          className="img-responsive img-thumbnail"
          src={largeBlueberry}
          alt="a bunch of large blueberries, one is sitting on a nickle"
        />
      </div>
      <div className="col-sm-4 kk-m-0-auto">
        <img
          width="333"
          height="250"
          className="img-responsive img-thumbnail"
          src={truck}
          alt="a blue truck that says K and K Blueberries on the side"
        />
      </div>
      <div className="col-sm-3 hidden-xs">
        <img
          width="241"
          height="250"
          className="img-responsive img-thumbnail"
          src={twoBuckets}
          alt="two buckets of blueberries"
        />
      </div>
    </div>
    <h2>
      <span className="icon-blueberries" />
      U-Pick Price
    </h2>
    <span className="h4">$2.75 per pound</span>
    <p>
      Please note that we <strong>do not accept credit or debit cards</strong>.
      Cash is preferred, but checks are accepted with ID
    </p>
    <hr />
    <div className="row kk-center-vertical">
      <div className="col-sm-6">
        <p>
          K {'&'} K Blueberries offers u-pick blueberries in Hermiston, Oregon.
          Our farm has 20 acres of Dukes; an early, large, easy to pick variety.
          Our season typically runs mid June to mid July (depending on the
          weather). We are{' '}
          <a
            href="https://www.globalgap.org/uk_en/who-we-are/about-us/"
            rel="noopener noreferrer"
            target="_blank"
          >
            GAP certified
          </a>{' '}
          and we water and fertilize using drip lines to limit contact with the
          berries. We have parking on both sides of the driveway heading in
          towards the bushes. Please watch out for sprinklers. We have portable
          toilets and a hand washing station available for our customers.
        </p>
      </div>
      <div className="col-sm-6">
        <img
          width="469"
          height="250"
          className="img-thumbnail img-responsive"
          src={rowsOfBlueberries}
          alt={'Rows of Blueberries at K & K Blueberries'}
        />
      </div>
    </div>
    <div className="kk-mt-20 kk-blue-box">
      <strong>Questions?</strong> Checkout{' '}
      <Link to={{ pathname: '/info' }}>our information page</Link> for common
      questions or give us a call at (541) 567-3146
    </div>
    <hr />
    <div className="row kk-center-vertical">
      <div className="col-md-8 col-sm-6">
        <h2>Pre-Ordering</h2>
        <p>
          You can pre-order flats of blueberries via email. Pre-packaged flats
          are $40 each. Please contact us for availability.
        </p>
      </div>
      <div className="col-md-4 col-sm-6">
        <img
          width="255"
          height="200"
          className="img-responsive img-thumbnail"
          src={packageBlueberries}
          alt="a plastic container of blueberries that says K and K blueberries on the front"
        />
      </div>
    </div>
  </div>
)
