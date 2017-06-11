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
      <div>
        <Navbar className="kk-navbar" collapseOnSelect style={{
          marginBottom: '0px',
          boxShadow: '0px 0px 8px rgba(0, 0, 0, 0.20)'
        }}>
          <div className="container-fixed">
            <Navbar.Header>
              <Navbar.Brand>
                <Link to={{ pathname: '/' }}>
                  <img className="kk-navbar-logo" src={logo} alt="K and K Blueberries"></img>
                </Link>
              </Navbar.Brand>
              <Navbar.Toggle />
            </Navbar.Header>
            <Navbar.Collapse>
              <Nav pullRight>
                <LinkContainer exact to={{ pathname: '/' }}>
                  <NavItem><span className="icon-leaves" style={{
                    color: '#669a3e', verticalAlign: 'middle',
                    fontSize: '30px'
                  }} />Home</NavItem>
                </LinkContainer>
                <LinkContainer exact to={{ pathname: '/info' }}>
                  <NavItem><span className="icon-leaves" style={{
                    color: '#669a3e', verticalAlign: 'middle',
                    fontSize: '30px'
                  }} />Information</NavItem>
                </LinkContainer>
                <LinkContainer exact to={{ pathname: '/photos' }}>
                  <NavItem><span className="icon-leaves" style={{
                    color: '#669a3e', verticalAlign: 'middle',
                    fontSize: '30px'
                  }} />Photos</NavItem>
                </LinkContainer>
              </Nav>
            </Navbar.Collapse>
          </div>
        </Navbar>
        <div style={{
          backgroundColor: '#465a78',
          backgroundPosition: 'center top',
          backgroundImage: "url(\"data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='500' height='500' viewBox='0 0 100 125'><g transform='translate(0,-952.36216)'><path fill='#2d4060' stroke='none' d='m 48.23046,962.11418 c -5.3849,0.0179 -10.91626,1.68042 -15.76757,5.09766 -8.70631,6.13269 -12.82045,16.23172 -11.36133,25.58203 3.21194,-1.1605 6.69818,-1.80469 10.34765,-1.80469 5.01988,0 9.73949,1.20546 13.84571,3.32227 5.37187,-5.72887 13.24498,-9.35156 22.03125,-9.35156 1.7996,0 3.55752,0.15482 5.26758,0.44531 -0.0767,-4.63173 -1.45784,-9.21508 -4.26563,-13.20117 C 63.657,965.57265 56.1007,962.08806 48.23046,962.11418 Z m -5.32617,2.84766 2.00391,1.44727 5.5957,-0.84375 -1.51172,2.48437 2.64258,2.12695 -3.89062,1.65821 -2.30274,3.49218 -3.3457,-0.42187 -5.50781,2.23242 -0.27539,-2.17969 -4.57032,-0.70898 3,-2.30274 -0.1875,-3.11718 4.01367,-0.68555 z' style='' /><path fill='#2d4060' stroke='none' d='m 68.55078,987.63762 c -8.01308,0 -15.18928,3.33557 -20.03907,8.60156 7.08441,4.89612 11.67774,12.76282 11.67774,21.63282 0,5.837 -1.98777,11.2428 -5.36719,15.6504 4.00152,2.2759 8.70264,3.5859 13.72852,3.5859 C 83.15763,1037.1083 95,1026.0372 95,1012.3759 95,998.71463 83.15763,987.63762 68.55078,987.63762 Z m 3.22851,3.19922 2.99414,1.99805 4.78711,0.54492 0.35156,2.1914 4.10157,2.86524 -2.55469,0.72656 0.31641,3.02929 -3.53321,-1.2832 -3.70312,0.9141 -1.85156,-2.3262 -4.9336,-1.89258 1.22461,-1.61719 -2.45508,-3.26953 3.38086,0.30469 z' style='' /><path fill='#2d4060' stroke='none' d='M 31.44921,993.13371 C 16.84236,993.13371 5,1004.2107 5,1017.872 c 0,13.6613 11.84236,24.7383 26.44921,24.7383 14.60686,0 26.44922,-11.077 26.44922,-24.7383 0,-13.6613 -11.84236,-24.73829 -26.44922,-24.73829 z m 7.56446,3.31641 1.74023,2.8125 7.28906,1.59378 -3.09961,2.4726 2.17969,3.9844 -5.60742,0.2696 -4.57617,3.3808 -3.89063,-2.1387 -7.88086,0.2286 0.75586,-2.9297 -5.25586,-3.0996 4.82813,-1.5176 1.33008,-4.08988 5.27343,1.03711 6.91407,-2.00391 z' style='' /></g></svg>\")"
        }}>
          {
            this.props.statusMessage &&
            <div className='kk-status container text-center' style={{
              marginBottom: 0, padding: '0', position: 'relative',
              fontSize: '16px'
            }}>
              <div style={{ padding: '20px 15px', backgroundColor: '#91c59c' }}>
                {this.props.statusMessage}
              </div>
            </div>
          }
          <div className="container" style={{
            background: 'white',
            boxShadow: '0px 0px 8px rgba(0, 0, 0, 0.20)',
            paddingBottom: '15px',
            paddingTop: '15px'
          }}>
            {this.props.children}
          </div>
        </div>
        <div style={{
          background: '#E1E8F2',
          borderTop: '1px solid #dadada',
          paddingTop: '20px',
          paddingBottom: '20px',
          boxShadow: '0px 0px 8px rgba(0, 0, 0, 0.20)'
        }}>
          <section className="kk-contact container">
            <p className="h3" style={{ marginTop: 0 }}>Contact Us</p>
            <div className="row" itemScope itemType="http://schema.org/LocalBusiness">
              <div className="col-sm-6 text-center">
                <a itemProp="url" href="http://www.kandkblueberries.com/">
                  <img width='225' height='140' itemProp="logo" style={{
                    maxWidth: '100%', marginBottom: '10px', marginTop: '10px'
                  }} src={logo} alt="" />
                </a>
                <div>
                  <strong itemProp="name">{'K & K Blueberries'}</strong>
                </div>
                <div>
                  <em>U-Pick Blueberries in Hermiston, Oregon</em>
                </div>
                <hr style={{ margin: '5px auto' }} />
                <div itemProp="address" itemScope itemType="http://schema.org/PostalAddress">
                  <span itemProp="streetAddress">29555 Minnehaha Rd</span><br />
                  <span itemProp="addressLocality">Hermiston</span>, <span itemProp="addressRegion">Oregon</span> <span itemProp="postalCode">97838</span>
                </div>
                <div itemProp="geo" itemScope itemType="http://schema.org/GeoCoordinates">
                  <meta itemProp="latitude" content="45.810609" />
                  <meta itemProp="longitude" content="-119.335015" />
                </div>
                <hr style={{ margin: '5px auto' }} />
                <div>
                  <span><strong>Open in the Summer</strong></span><br />
                  <meta itemProp="openingHours" dateTime="Sa-Su 06:30-11:30" />
                  <meta itemProp="openingHours" dateTime="Sa-Su 07:00-20:00" />
                  Everyday: 6:30am-11am <em>and</em> 5pm-8pm
                <hr style={{ margin: '5px auto', visibility: 'hidden' }} />
                  <p style={{ maxWidth: '345px', margin: '0 auto' }}><em>We close in high temperatures for our patrons safety. Please call for up to date information</em></p>
                </div>
                <hr style={{ margin: '5px auto' }} />
                <div>
                  <strong>Phone: </strong><span itemProp="telephone">(541) 567-3146</span>
                </div>
                <div>
                  <strong>Email: </strong><a itemProp="email" href="mailto:kathy@kandkblueberries.com">kathy@kandkblueberries.com</a>
                </div>
              </div>
              <div className="col-sm-6 text-center">
                <div style={{ margin: '10px auto' }}>
                  <a itemProp="sameAs" href="https://www.facebook.com/K-and-K-Blueberries-104303779663777/" target="_blank">
                    <img width='144' height='27'
                      src={facebook} alt="Find us on Facebook" />
                  </a>
                </div>
                <div style={{ margin: '10px auto' }}>
                  <strong style={{ display: 'block' }}><em>Proud Member of: </em></strong>
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
        <footer className="kk-contact" style={{ backgroundColor: '#0f1d0e', padding: '20px' }}>
          <div className="container" style={{ color: 'white' }}>
            {'K & K Blueberries © ' + new Date().getFullYear() + '. All Rights Reserved'}
          </div>
        </footer>
      </div >
    );
  }
}

export default Body;