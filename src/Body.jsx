import React from 'react'
import Navigation from './Navigation'
import ContactFooter from './ContactFooter'
import CreditsModal from './CreditsModal'
import './Body.css'

export default ({ warningMessage, statusMessage, children }) => (
  <div className="kk-body">
    <Navigation />
    <div className="kk-messages">
      {warningMessage && (
        <div className="kk-warning container text-center">
          <div>{warningMessage}</div>
        </div>
      )}
      {statusMessage && (
        <div className="kk-status container text-center">
          <div>{statusMessage}</div>
        </div>
      )}
    </div>
    <div className="container kk-body-container">{children}</div>
    <ContactFooter />
    <footer className="kk-footer">
      <div className="container">
        <span>
          {'K & K Blueberries © ' +
            new Date().getFullYear() +
            '. All Rights Reserved'}
        </span>
        <CreditsModal className="pull-right" />
      </div>
    </footer>
  </div>
)
