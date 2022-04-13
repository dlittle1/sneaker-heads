import React from 'react';
import '../styles/landingPage.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faPersonToPortal } from '@fortawesome/pro-regular-svg-icons';
import { useNavigate } from 'react-router-dom';
import LoginSignupForm from '../components/LoginSignupForm';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className='landing-page-body'>
      <div className='landing-page-image'></div>
      <div className='landing-page-heading'>
        <h2 className='landing-page-heading-welcome'>welcome to</h2>
        <h1 className='landing-page-heading-title'>Sneaker-Heads</h1>
        <p className='landing-page-heading-subtitle'>
          we{' '}
          <FontAwesomeIcon
            icon={faHeart}
            style={{
              color: 'rgb(236, 122, 122)',
            }}
          />{' '}
          shoes
        </p>
        <div className='landing-page-login-signup-form'>
          <LoginSignupForm />
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
