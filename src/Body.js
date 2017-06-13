import React from 'react';
import Navigation from './Navigation';
import ContactFooter from './ContactFooter';
import CreditsModal from './CreditsModal'
import './Body.css';


export default ({ statusMessage, children }) => (
  <div className="kk-body">
    <Navigation />
    {
      statusMessage &&
      <div className='kk-status container text-center'>
        <div>
          {statusMessage}
        </div>
      </div>
    }
    <div className="container kk-body-container">
      {children}
    </div>
    <ContactFooter />
    <footer className="kk-footer">
      <div className="container">
        <span>{'K & K Blueberries © ' + new Date().getFullYear() + '. All Rights Reserved'}</span>
        <CreditsModal className="pull-right" />
      </div>
    </footer>
  </div >
);