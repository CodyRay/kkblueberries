import React, { Component } from 'react';
import { Navbar, Nav, NavItem, Alert } from 'react-bootstrap';
import logo from './logo.png';
import './Body.css';
import { LinkContainer } from 'react-router-bootstrap';
import { Link } from 'react-router';

class Body extends Component {
  render() {
    return (
      <div>
        <Navbar className="kk-navbar" collapseOnSelect>
          <div className="container-fixed">
            <Navbar.Header>
              <Navbar.Brand>
                <Link to={{ pathname: '/home' }}>
                  <img className="kk-navbar-logo" src={logo} alt="K and K Blueberries"></img>
                </Link>
              </Navbar.Brand>
              <Navbar.Toggle />
            </Navbar.Header>
            <Navbar.Collapse>
              <Nav pullRight>
                <LinkContainer to={{ pathname: '/home' }}>
                  <NavItem>Home</NavItem>
                </LinkContainer>
                <LinkContainer to={{ pathname: '/photos' }}>
                  <NavItem>Photos</NavItem>
                </LinkContainer>
                <LinkContainer to={{ pathname: '/about' }}>
                  <NavItem>About</NavItem>
                </LinkContainer>
                <LinkContainer to={{ pathname: '/contact' }}>
                  <NavItem>Contact</NavItem>
                </LinkContainer>
              </Nav>
            </Navbar.Collapse>
          </div>
        </Navbar>
        {
          this.props.statusMessage &&
          <div className='kk-status'>
            <div className='container'>
              <Alert bsStyle="info">
                {this.props.statusMessage}
              </Alert>
            </div>
          </div>
        }
        <div className="container">
          {this.props.children}
        </div>
      </div >
    );
  }
}

export default Body;