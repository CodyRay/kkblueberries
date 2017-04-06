import React, { Component } from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import logo from './logo.png';
import './App.css';
import { LinkContainer } from 'react-router-bootstrap';
import { Link } from 'react-router';

class App extends Component {
  render() {
    return (
      <div id="app">
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
        <div className="container">
          {this.props.children}
        </div>
      </div >
    );
  }
}

export default App;