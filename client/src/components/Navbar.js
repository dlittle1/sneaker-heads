import React, { useState } from 'react';
import sneakerHeads from '../assets/logo_1_xs.png';
import '../styles/navbar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouseBlank } from '@fortawesome/pro-regular-svg-icons';
import { faUsersLine } from '@fortawesome/pro-regular-svg-icons';
import { faUser } from '@fortawesome/pro-regular-svg-icons';
import { faBars } from '@fortawesome/pro-regular-svg-icons';
import { Link, Outlet } from 'react-router-dom';
const Navbar = () => {
  const [drawerIsOpen, setDrawerIsOpen] = useState(false);

  const handleDrawer = () => {
    setDrawerIsOpen((prevState) => !prevState);
  };

  return (
    <>
      <nav className='navbar'>
        <ul className='nav-list'>
          <Link to='/shoes' className='nav--logo'>
            <div className='nav-item'>
              <p className='nav--logo-name'>Sneaker-Heads</p>
            </div>
          </Link>
          <div className='nav-menu' onClick={handleDrawer}>
            <FontAwesomeIcon icon={faBars} className='nav-item-icon' />
          </div>
          <div className='nav-items'>
            <li className='nav-item'>
              <Link to='/shoes'>
                <FontAwesomeIcon
                  icon={faHouseBlank}
                  className='nav-item-icon'
                />
                Home
              </Link>
            </li>
            <li className='nav-item'>
              <FontAwesomeIcon icon={faUsersLine} className='nav-item-icon' />
              Users
            </li>
            <li className='nav-item'>
              <FontAwesomeIcon icon={faUser} className='nav-item-icon' />
              Profile
            </li>
          </div>
        </ul>
        {drawerIsOpen && (
          <div className='nav-drawer'>
            <ul className='nav-drawer-items'>
              <li className='nav-drawer-item'>
                <Link to='/'>
                  <FontAwesomeIcon
                    icon={faHouseBlank}
                    className='nav-item-icon'
                  />
                  Home
                </Link>
              </li>
              <li className='nav-drawer-item'>
                <FontAwesomeIcon icon={faUsersLine} className='nav-item-icon' />
                <a href='#'>Users</a>
              </li>
              <li className='nav-drawer-item'>
                <FontAwesomeIcon icon={faUser} className='nav-item-icon' />
                <a href='#'>Profile</a>
              </li>
            </ul>
          </div>
        )}
      </nav>
      <div style={{ paddingBottom: '50px' }}></div>
      <Outlet />
    </>
  );
};

export default Navbar;
