import React from 'react'
import shoeLogo from '../assets/shoe_logo.png'

const Navbar = () => {
  return (
    <navbar>
      <ul className='nav-list'>
        <div className='nav-item nav--logo'>
          <img src={shoeLogo} alt='shoe logo' />
        </div>
        <div className='nav-items'>
          <li className='nav-item'>
            <a href='#'>Home</a>
          </li>
          <li className='nav-item'>
            <a href='#'>Users</a>
          </li>
          <li className='nav-item'>
            <a href='#'>Profile</a>
          </li>
        </div>
      </ul>
    </navbar>
  )
}

export default Navbar
