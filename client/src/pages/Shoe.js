import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/pro-regular-svg-icons';
import { faTrashCan } from '@fortawesome/pro-regular-svg-icons';
import { faPenToSquare } from '@fortawesome/pro-regular-svg-icons';
import '../styles/shoe.css';
import { useSelector, useDispatch } from 'react-redux';
import { getShoesAsync } from '../redux/features/shoeSlice';
import { BigHead } from '@bigheads/core';

const Shoe = () => {
  const params = useParams();
  const shoeId = params.id;
  const dispatch = useDispatch();
  const [shoe, setShoe] = useState(
    useSelector((state) =>
      state.shoes.shoes.find((shoe) => shoe._id === shoeId)
    )
  );
  const currentUser = useSelector((state) => state.user.user._id);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem('token');
  useEffect(() => {
    // if local storage token exists, get shoes
    console.log(token);
    if (token !== null) {
      if (shoe === undefined) {
        dispatch(getShoesAsync()).then((response) => {
          console.log(response);
          setShoe(response.payload.find((shoe) => shoe._id === shoeId));
          setLoading(false);
        });
      } else {
        setLoading(false);
      }
    }
  }, [shoe, shoeId, token]);
  const navigate = useNavigate();

  function handleEdit(id) {
    navigate(`/shoes/edit/${id}`);
  }

  const handleDelete = (id) => {
    axios
      .delete(`/shoes/${id}`)
      .then((res) => navigate('/shoes'))
      .catch((err) => console.error(err));
  };

  if (loading && !shoe) {
    return <div>Loading...</div>;
  }

  return (
    <div className='shoe-body'>
      <div className='shoe-container'>
        <div className='shoe-image-container'>
          <div
            className='shoe-image-mobile'
            style={{
              backgroundImage: `url(${shoe.imgUrl})`,
            }}
          ></div>
          <div className='shoe-image'>
            <img src={shoe.imgUrl} />
          </div>
        </div>
        <div className='shoe-info-container'>
          <div className='shoe-info'>
            <div className='shoe-info-title'>
              <p>Owned By: {shoe.user.username}</p>
              <BigHead {...shoe.user.avatar} />
            </div>
            <h1 className='shoe-info-name'>{shoe.name}</h1>
            <h2 className='shoe-info-version'>{shoe.version}</h2>
            <div className='shoe-info-year-condition'>
              <h3>Year: {shoe.year}</h3>
              <h3>Condition: {shoe.condition}</h3>
            </div>
          </div>
          <div className='shoe-info-buttons'>
            <div title='Add to Wishlist'>
              <FontAwesomeIcon
                icon={faHeart}
                size='2x'
                style={{ color: 'pink' }}
              />
            </div>
            {currentUser === shoe.user._id && (
              <>
                <div
                  title='Delete'
                  onClick={() => handleDelete(shoe._id)}
                  className='shoe-info-button'
                >
                  <FontAwesomeIcon
                    icon={faTrashCan}
                    size='2x'
                    style={{ color: 'rgb(236, 122, 122)' }}
                  />
                </div>
                <div
                  title='Edit'
                  onClick={() => handleEdit(shoe._id)}
                  className='shoe-info-button'
                >
                  <FontAwesomeIcon
                    icon={faPenToSquare}
                    size='2x'
                    style={{ color: 'rgb(92, 159, 235)' }}
                  />
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shoe;
