import React from 'react';
import ShoeActionButtons from '../ShoeActionButtons';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {
  deleteShoeAsync,
  setShoe,
  likeShoe,
} from '../../redux/features/shoeSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/pro-regular-svg-icons';

const GridItem = ({ shoe }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function handleShoeClick(id) {
    navigate(`/shoes/${id}`);
    dispatch(setShoe({ ...shoe }));
  }

  return (
    <div className='grid-item'>
      <div className='grid-item-num-likes'>
        <FontAwesomeIcon icon={faHeart} size='1x' />
        <span>{shoe.numLikes}</span>
      </div>
      <img
        src={shoe.imgUrl}
        className='grid-img'
        alt={`${shoe.name + ' ' + shoe.version}`}
      />
      <ShoeActionButtons shoe={shoe} />
      <div
        className='grid-text-container'
        onClick={() => handleShoeClick(shoe._id)}
      >
        <h4 className='grid-item-text grid-item-text-title'>{shoe.name}</h4>
        <p className='grid-item-text'>{shoe.version}</p>
      </div>
    </div>
  );
};

export default GridItem;
