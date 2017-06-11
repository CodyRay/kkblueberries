import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import rowsOfBlueberries from './rows_of_blueberries.jpg'

class Home extends Component {
  render() {
    return (
      <div id="home" className="text-center">
        <h1>Welcome to {'K & K Blueberries'}</h1>
        <div className="row">
          <div className="col-sm-6" style={{
            display: 'inline-block',
            verticalAlign: 'middle',
            float: 'none',
          }}>
            K {'&'} K Blueberries offers u-pick blueberries in Hermiston, Oregon. Our farm has 20 acres of Dukes; an early, large, easy to pick variety. Our season typically runs mid June to mid July (depending on the weather). We are <a href="http://www.oregon.gov/ODA/CID/ghp_gap.shtml" target="_blank">GAP certified</a> and we water and fertilize using drip lines to limit contact with the berries. We have parking on both sides of the driveway heading in towards the bushes. Please look out for the flagged grass sprinklers. We have portable toilets and a hand washing station available for our customers.
          </div>
          <div className="col-sm-6" style={{
            display: 'inline-block',
            verticalAlign: 'middle',
            float: 'none',
          }}>
            <img style={{ maxHeight: '250px', margin: '20px 0' }} className="img-thumbnail img-responsive" src={rowsOfBlueberries} alt={'Rows of Blueberries at K & K Blueberries'} />
          </div>
        </div>
        <div style={{ display: 'inline-block', padding: '20px 15px', backgroundColor: '#C2CFE3' }}><strong>Questions?</strong> Checkout <Link to={{ pathname: '/info' }}>our information page</Link> for common questions or give us a call at (541) 567-3146</div>

        <h2><span className="icon-blueberries" />U-Pick Price</h2>
        <span className="h3">
          $1.75 per pound
        </span>
        <p>Please note that we <strong>do not accept credit or debit cards</strong>. Cash is preferred, but checks are accepted with ID</p>
        <h2>Pre-Ordering</h2>
        <p>
          You can pre-order flats of blueberries via email. Please contact us for pricing and availability.
        </p>
      </div>
    );
  }
}

export default Home;