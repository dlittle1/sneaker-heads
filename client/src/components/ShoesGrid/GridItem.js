import React from 'react';
import GridItemButtons from './GridItemButtons';
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

  const handleDelete = (id) => {
    dispatch(deleteShoeAsync(id));
  };

  function handleEdit(id) {
    navigate(`/shoes/edit/${id}`);
    dispatch(setShoe({ ...shoe }));
  }

  function handleLike(id) {
    dispatch(likeShoe(id));
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
      <GridItemButtons
        handleDelete={handleDelete}
        handleEdit={handleEdit}
        handleLike={handleLike}
        shoe={shoe}
      />
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
