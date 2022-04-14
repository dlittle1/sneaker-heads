import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import '../styles/home.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/pro-regular-svg-icons';

const Home = () => {
  return (
    <div>
      <Link to='/shoes/create' title='Add Your Shoe'>
        <div className='create-shoe-link'>
          <FontAwesomeIcon
            icon={faPlus}
            size='2x'
            className='create-shoe-plus'
          />
        </div>
      </Link>
      <Outlet />
    </div>
  );
};

export default Home;
