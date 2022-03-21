import React from 'react';
import sneakerHeads from '../assets/logo_1_xs.png';
import '../styles/navbar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouseBlank } from '@fortawesome/pro-regular-svg-icons';
import { faUsersLine } from '@fortawesome/pro-regular-svg-icons';
import { faUser } from '@fortawesome/pro-regular-svg-icons';
import { Link } from 'react-router-dom';
const Navbar = () => {
  return (
    <nav>
      <ul className='nav-list'>
        <Link to='/' className='nav--logo'>
          <div className='nav-item'>
            <p className='nav--logo-name'>Sneaker-Heads</p>
          </div>
        </Link>
        <div className='nav-items'>
          <li className='nav-item'>
            <Link to='/'>
              <FontAwesomeIcon icon={faHouseBlank} className='nav-item-icon' />
              <a href='#'>Home</a>
            </Link>
          </li>
          <li className='nav-item'>
            <FontAwesomeIcon icon={faUsersLine} className='nav-item-icon' />
            <a href='#'>Users</a>
          </li>
          <li className='nav-item'>
            <FontAwesomeIcon icon={faUser} className='nav-item-icon' />
            <a href='#'>Profile</a>
          </li>
        </div>
      </ul>
    </nav>
  );
};

export default Navbar;
