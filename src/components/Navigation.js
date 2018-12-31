import React from 'react'
import { Link } from 'gatsby'
import logo from '../img/logo.png'

export default () => (
  <nav className="navbar navbar-default">
    <div className="container">
      <div className="container-fixed">
        <div className="navbar-header">
          <Link className="navbar-brand" to="/">
            <img src={logo} alt="K and K Blueberries" />
          </Link>
        </div>
        <div className="navbar-collapse">
          {(() => {
            // Quick component to create navigation links with 'active' on
            // the <li> instead of the <a>
            const LiLink = class extends React.PureComponent {
              constructor(props) {
                super(props)
                this.state = {
                  active: false,
                }
              }
              render() {
                const { to, ...rest } = this.props
                return (
                  <li
                    role="presentation"
                    className={this.state.active ? 'active' : null}
                  >
                    <Link
                      to={to}
                      {...rest}
                      getProps={({ isCurrent }) => {
                        // A Hack, but less hacky than the alternatives :)
                        setTimeout(() => {
                          this.setState({ active: isCurrent })
                        }, 1)
                      }}
                    />
                  </li>
                )
              }
            }
            return (
              <ul className="nav navbar-nav navbar-right">
                <LiLink to="/">
                  <span className="kk-icon-lg-green icon-leaves" />
                  Home
                </LiLink>
                <LiLink to="/info">
                  <span className="kk-icon-lg-green icon-leaves" />
                  Information
                </LiLink>
                <LiLink to="/photos">
                  <span className="kk-icon-lg-green icon-leaves" />
                  Photos
                </LiLink>
              </ul>
            )
          })()}
        </div>
      </div>
    </div>
  </nav>
)
