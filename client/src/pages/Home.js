import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Masonry from 'react-masonry-css';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/home.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/pro-regular-svg-icons';
import { faHeart } from '@fortawesome/pro-regular-svg-icons';
import { faTrashCan } from '@fortawesome/pro-regular-svg-icons';
import { faPenToSquare } from '@fortawesome/pro-regular-svg-icons';

const Home = () => {
  const [shoes, setShoes] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get('/api/shoes')
      .then((res) => setShoes(res.data))
      .then(() => setLoading(false))
      .catch((err) => console.error(err));
  }, []);

  const breakpoints = {
    default: 5,
    1700: 5,
    1500: 4,
    1200: 3,
    890: 2,
    592: 1,
  };

  const handleDelete = (id) => {
    axios
      .delete(`/api/shoes/${id}`)
      .then((res) =>
        setShoes((prevShoes) => prevShoes.filter((shoe) => shoe._id !== id))
      )
      .catch((err) => console.error(err));
  };

  function handleEdit(id) {
    navigate(`/shoes/edit/${id}`);
  }

  function handleShoeClick(id) {
    navigate(`/shoes/${id}`);
  }

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
          {shoes.length > 0 ? (
            shoes.map((shoe, index) => (
              <div key={index} className='grid-item'>
                <img
                  src={shoe.imgUrl}
                  className='grid-img'
                  alt={`${shoe.name + ' ' + shoe.version}`}
                />
                <div className='grid-item-buttons'>
                  <div
                    className='grid-item-button-like grid-item-button'
                    title='Add to Wishlist'
                  >
                    <FontAwesomeIcon
                      icon={faHeart}
                      size='1x'
                      className='grid-item-button-icon'
                      style={{
                        color: 'rgb(236, 122, 122)',
                      }}
                    />
                  </div>

                  <div
                    className='grid-item-button grid-item-button-edit'
                    title='Edit'
                    onClick={() => handleEdit(shoe._id)}
                  >
                    <FontAwesomeIcon
                      icon={faPenToSquare}
                      size='1x'
                      className='grid-item-button-icon'
                      style={{
                        color: 'white',
                      }}
                    />
                  </div>
                  <div
                    className='grid-item-button grid-item-button-delete'
                    title='Delete'
                    onClick={() => handleDelete(shoe._id)}
                  >
                    <FontAwesomeIcon
                      icon={faTrashCan}
                      size='1x'
                      className='grid-item-button-icon'
                      style={{
                        color: 'white',
                      }}
                    />
                  </div>
                </div>
                <div
                  className='grid-text-container'
                  onClick={() => handleShoeClick(shoe._id)}
                >
                  <h4 className='grid-item-text grid-item-text-title'>
                    {shoe.name}
                  </h4>
                  <p className='grid-item-text'>{shoe.version}</p>
                </div>
              </div>
            ))
          ) : (
            <h1>There are no shoes</h1>
          )}
        </Masonry>
      </div>
    </div>
  );
};

export default Home;
