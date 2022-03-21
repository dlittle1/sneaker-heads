import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Masonry from 'react-masonry-css';
import { Link } from 'react-router-dom';
import '../styles/home.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/pro-regular-svg-icons';
import { faHeart } from '@fortawesome/pro-regular-svg-icons';
const Home = () => {
  const [shoes, setShoes] = useState([]);

  useEffect(() => {
    axios.get('/shoes').then((res) => setShoes(res.data));
  }, []);

  const breakpoints = {
    default: 5,
    1700: 5,
    1500: 4,
    1200: 3,
    890: 2,
    592: 1,
  };

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
      <div className='grid'>
        <Masonry
          breakpointCols={breakpoints}
          className='my-masonry-grid'
          columnClassName='my-masonry-grid_column'
        >
          {shoes.map((shoe, index) => (
            <div key={index} className='grid-item'>
              <img src={shoe.imgUrl} className='grid-img' />
              <div className='grid-text-container'>
                <a href='#'>
                  <div
                    style={{
                      position: 'absolute',
                      right: '10px',
                      bottom: '10px',
                      background: 'white',
                      borderRadius: '100%',
                      width: '30px',
                      height: '30px',
                    }}
                    title='Add to Wishlist'
                  >
                    <FontAwesomeIcon
                      icon={faHeart}
                      size='1x'
                      style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        color: '#2c2c2c',
                      }}
                    />
                  </div>
                </a>
                <h4 className='grid-item-text grid-item-text-title'>
                  {shoe.name}
                </h4>
                <p className='grid-item-text'>{shoe.version}</p>
              </div>
            </div>
          ))}
        </Masonry>
      </div>
    </div>
  );
};

export default Home;
