import React from 'react'
import sneakerHeads from '../assets/logo_1_xs.png'
import '../styles/navbar.css'

const Navbar = () => {
  return (
    <nav>
      <ul className='nav-list'>
        <div className='nav-item nav--logo'>
          <img src={sneakerHeads} alt='sneaker heads logo' />
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
    </nav>
  )
}

export default Navbar
