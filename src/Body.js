import React, { Component } from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import logo from './logo.png';
import chamber from './hermiston_chamber.png';
import facebook from './find_us_on_facebook.png';
import './Body.css';
import './fontello/css/fontello.css'
import { LinkContainer } from 'react-router-bootstrap';
import { Link } from 'react-router-dom';

class Body extends Component {
  render() {
    return (
      <div className="kk-body">
        <Navbar className="" collapseOnSelect>
          <div className="container-fixed">
            <Navbar.Header>
              <Navbar.Brand>
                <Link to={{ pathname: '/' }}>
                  <img className="" src={logo} alt="K and K Blueberries"></img>
                </Link>
              </Navbar.Brand>
              <Navbar.Toggle />
            </Navbar.Header>
            <Navbar.Collapse>
              <Nav pullRight>
                <LinkContainer exact to={{ pathname: '/' }}>
                  <NavItem><span className="kk-icon-lg-green icon-leaves" />Home</NavItem>
                </LinkContainer>
                <LinkContainer exact to={{ pathname: '/info' }}>
                  <NavItem><span className="kk-icon-lg-green icon-leaves" />Information</NavItem>
                </LinkContainer>
                <LinkContainer exact to={{ pathname: '/photos' }}>
                  <NavItem><span className="kk-icon-lg-green icon-leaves" />Photos</NavItem>
                </LinkContainer>
              </Nav>
            </Navbar.Collapse>
          </div>
        </Navbar>
        <div className="kk-body-background">
          {
            this.props.statusMessage &&
            <div className='kk-status container text-center'>
              <div>
                {this.props.statusMessage}
              </div>
            </div>
          }
          <div className="container kk-body-container">
            {this.props.children}
          </div>
        </div>
        <div className="kk-contact-footer">
          <section className="container">
            <p className="h3 kk-m-0-auto">Contact Us</p>
            <div className="row" itemScope itemType="http://schema.org/LocalBusiness">
              <div className="col-sm-6 text-center">
                <a itemProp="url" href="http://www.kandkblueberries.com/">
                  <img width='225' height='140' itemProp="logo"
                    className="kk-footer-logo" src={logo} alt="" />
                </a>
                <div>
                  <strong itemProp="name">{'K & K Blueberries'}</strong>
                </div>
                <div>
                  <em>U-Pick Blueberries in Hermiston, Oregon</em>
                </div>
                <hr />
                <div itemProp="address" itemScope itemType="http://schema.org/PostalAddress">
                  <span itemProp="streetAddress">29555 Minnehaha Rd</span><br />
                  <span itemProp="addressLocality">Hermiston</span>, <span itemProp="addressRegion">Oregon</span> <span itemProp="postalCode">97838</span>
                </div>
                <div itemProp="geo" itemScope itemType="http://schema.org/GeoCoordinates">
                  <meta itemProp="latitude" content="45.810609" />
                  <meta itemProp="longitude" content="-119.335015" />
                </div>
                <hr />
                <div>
                  <span><strong>Open in the Summer</strong></span><br />
                  <meta itemProp="openingHours" dateTime="Sa-Su 06:30-11:30" />
                  <meta itemProp="openingHours" dateTime="Sa-Su 07:00-20:00" />
                  Everyday: 6:30am-11am <em>and</em> 5pm-8pm
                <hr className="invisible" />
                  <p className="kk-m-0-auto kk-max-width-345"><em>We close in high temperatures for our patrons safety. Please call for up to date information</em></p>
                </div>
                <hr />
                <div>
                  <strong>Phone: </strong><span itemProp="telephone">(541) 567-3146</span>
                </div>
                <div>
                  <strong>Email: </strong><a itemProp="email" href="mailto:kathy@kandkblueberries.com">kathy@kandkblueberries.com</a>
                </div>
              </div>
              <div className="col-sm-6 text-center">
                <div className="kk-m-10-auto">
                  <a itemProp="sameAs" href="https://www.facebook.com/K-and-K-Blueberries-104303779663777/" target="_blank">
                    <img width='144' height='27'
                      src={facebook} alt="Find us on Facebook" />
                  </a>
                </div>
                <div className="kk-m-10-auto">
                  <strong className="kk-display-block"><em>Proud Member of: </em></strong>
                  <a href="http://www.hermistonchamber.com/">
                    <img width='160' height='85' src={chamber} alt="Hermiston Chamber of Commerce" />
                  </a>
                </div>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d22246.702057730934!2d-119.347709712581!3d45.814507580433556!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x54a2b833eaa0c995%3A0x6da8252442c526dc!2sK+and+K+Blueberries!5e0!3m2!1sen!2sus!4v1494357215378"
                  frameBorder="0"
                  style={{ border: '0', width: '100%', maxWidth: '395px', height: '230px', margin: '10px auto' }}
                  allowFullScreen>
                </iframe>
                <link itemProp="hasMap" href="https://goo.gl/maps/FtEFbnttPW22" />
              </div>
              <meta itemProp="MakesOffer" content="U-Pick Blueberries" />
            </div>
          </section>
        </div>
        <footer className="kk-footer">
          <div className="container">
            {'K & K Blueberries © ' + new Date().getFullYear() + '. All Rights Reserved'}
          </div>
        </footer>
      </div >
    );
  }
}

export default Body;