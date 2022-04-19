import React from 'react';
import ShoeActionButtons from '../ShoeActionButtons';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setShoe } from '../../redux/features/shoeSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/pro-regular-svg-icons';
import { faHeart as faHeartSolid } from '@fortawesome/pro-solid-svg-icons';
import '../componentStyles/gridItem.css';
import { BigHead } from '@bigheads/core';

const GridItem = ({ shoe }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.currentUser);

  function handleShoeClick(id) {
    navigate(`/shoes/${id}`);
    dispatch(setShoe({ ...shoe }));
  }

  const handleUserClick = (id) => {
    navigate(`/users/${id}`);
  };

  return (
    <div className='grid-item'>
      <div className='grid-item-num-likes'>
        <FontAwesomeIcon
          icon={shoe.likes.includes(user._id) ? faHeartSolid : faHeart}
          size='1x'
        />
        <span>{shoe.numLikes}</span>
      </div>
      <img
        src={shoe.imgUrl}
        className='grid-item-img'
        alt={`${shoe.name + ' ' + shoe.version}`}
        onClick={() => handleShoeClick(shoe._id)}
      />
      <div className='grid-item-info'>
        <p>{shoe.name}</p>
        <div className='grid-item-info-user'>
          <BigHead
            {...shoe.user.avatar}
            onClick={() => handleUserClick(shoe.user._id)}
          />
          <p onClick={() => handleUserClick(shoe.user._id)}>
            {shoe.user.username}
          </p>
        </div>
        <ShoeActionButtons shoe={shoe} />
      </div>
    </div>
  );
};

export default GridItem;
