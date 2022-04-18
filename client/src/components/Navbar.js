import React, { useState } from 'react';
import './componentStyles/navbar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouseBlank } from '@fortawesome/pro-duotone-svg-icons';
import { faUsers } from '@fortawesome/pro-duotone-svg-icons';
import { faUser } from '@fortawesome/pro-duotone-svg-icons';
import { faBars } from '@fortawesome/pro-duotone-svg-icons';
import { faHouse } from '@fortawesome/pro-duotone-svg-icons';
import { faRightFromBracket } from '@fortawesome/pro-duotone-svg-icons';
import { faAngleDown } from '@fortawesome/pro-solid-svg-icons';
import { Link, Outlet } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/features/currentUserSlice';
import { BigHead } from '@bigheads/core';
const Navbar = () => {
  const dispatch = useDispatch();
  const [drawerIsOpen, setDrawerIsOpen] = useState(false);
  const [dropdownIsOpen, setDropdownIsOpen] = useState(false);

  const currentUser = useSelector((state) => state.currentUser.user);

  const handleLogout = () => {
    dispatch(logout());
  };

  const handleDropdown = () => {
    setDropdownIsOpen((prevState) => !prevState);
  };

  const handleDrawer = () => {
    setDrawerIsOpen((prevState) => !prevState);
  };

  const dropdownTransition = dropdownIsOpen
    ? {
        opacity: 1,
      }
    : {
        opacity: 0,
      };

  const drawerTransition = drawerIsOpen
    ? {
        transform: 'translateX(0)',
      }
    : {
        transform: 'translateX(-100%)',
      };

  return (
    <>
      <nav className='navbar'>
        <ul className='nav-list'>
          <Link to='/' className='nav--logo'>
            <div className='nav-item'>
              <p className='nav--logo-name'>Sneaker-Heads</p>
            </div>
          </Link>
          <div className='nav-menu nav-item' onClick={handleDrawer}>
            <FontAwesomeIcon icon={faBars} className='nav-item-icon' />
          </div>
          <div className='nav-items'>
            <li className='nav-item'>
              <Link to='/'>
                <FontAwesomeIcon
                  icon={faHouse}
                  className='nav-item-icon'
                  size='xl'
                />
              </Link>
            </li>
            <li className='nav-item'>
              <Link to='/users/shoes'>
                <FontAwesomeIcon
                  icon={faUsers}
                  className='nav-item-icon'
                  size='xl'
                />
              </Link>
            </li>
            <BigHead {...currentUser.avatar} />
            <li className='nav-item' onClick={handleDropdown}>
              <FontAwesomeIcon icon={faAngleDown} className='nav-item-icon' />
              <div className='nav-item-dropdown' style={dropdownTransition}>
                <p onClick={handleLogout} className='nav-item-dropdown-logout'>
                  Sign-Out
                </p>
                <FontAwesomeIcon
                  icon={faRightFromBracket}
                  className='nav-item-icon'
                />
              </div>
            </li>
          </div>
        </ul>
      </nav>
      <div style={{ paddingBottom: '50px' }}></div>

      <div className='nav-drawer' style={drawerTransition}>
        <ul className='nav-drawer-items'>
          <li className='nav-drawer-item'>
            <Link to='/'>
              <FontAwesomeIcon icon={faHouseBlank} className='nav-item-icon' />
              Home
            </Link>
          </li>
          <li className='nav-drawer-item'>
            <FontAwesomeIcon icon={faUsers} className='nav-item-icon' />
            Users
          </li>
          <li className='nav-drawer-item'>
            <FontAwesomeIcon icon={faUser} className='nav-item-icon' />
            Profile
          </li>
          <li className='nav-drawer-item' onClick={handleLogout}>
            <FontAwesomeIcon
              icon={faRightFromBracket}
              className='nav-item-icon'
            />
            Sign-Out
          </li>
        </ul>
      </div>
      <Outlet />
    </>
  );
};

export default Navbar;
