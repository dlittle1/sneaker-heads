import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { deleteShoeAsync } from '../redux/features/shoeSlice';
import {
  faPenToSquare,
  faHeart,
  faTrashCan,
} from '@fortawesome/pro-regular-svg-icons';

const GridItemButtons = ({ shoe }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleDelete = (id) => {
    dispatch(deleteShoeAsync(id));
  };

  function handleEdit(id) {
    navigate(`/shoes/edit/${id}`);
  }

  return (
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
  );
};

export default GridItemButtons;
