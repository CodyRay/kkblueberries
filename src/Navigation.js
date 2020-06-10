import React from 'react'
import { Link, Route } from 'react-router-dom'
import logo from './logo.png'

export default () => (
  <nav className="navbar navbar-default">
    <div className="container">
      <div className="container-fixed">
        <div className="navbar-header">
          <Link className="navbar-brand" to={{ pathname: '/' }}>
            <img src={logo} alt="K and K Blueberries" />
          </Link>
        </div>
        <div className="navbar-collapse">
          {(() => {
            // Quick component to create navigation links with 'active' on
            // the <li> instead of the <a>
            const LiNavLink = ({ to, exact, ...rest }) => (
              <Route
                path={to.pathname}
                exact={exact}
                children={({ location, match }) => (
                  <li role="presentation" className={!!match && 'active'}>
                    <Link to={to} {...rest} />
                  </li>
                )}
              />
            )
            return (
              <ul className="nav navbar-nav navbar-right">
                <LiNavLink exact to={{ pathname: '/' }}>
                  <span className="kk-icon-lg-green icon-leaves" />
                  Home
                </LiNavLink>
                <LiNavLink exact to={{ pathname: '/info' }}>
                  <span className="kk-icon-lg-green icon-leaves" />
                  Information
                </LiNavLink>
                <LiNavLink exact to={{ pathname: '/photos' }}>
                  <span className="kk-icon-lg-green icon-leaves" />
                  Photos
                </LiNavLink>
              </ul>
            )
          })()}
        </div>
      </div>
    </div>
  </nav>
)
