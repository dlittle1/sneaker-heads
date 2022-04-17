import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSelector, useDispatch } from 'react-redux';
import {
  deleteShoeAsync,
  likeShoe,
  setShoe,
} from '../redux/features/shoeSlice';
import { useNavigate } from 'react-router-dom';
import {
  faPenToSquare,
  faHeart,
  faTrashCan,
} from '@fortawesome/pro-regular-svg-icons';
import { faHeart as faHeartSolid } from '@fortawesome/pro-solid-svg-icons';
import './componentStyles/shoeActionButtons.css';

const GridItemButtons = ({ shoe }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.currentUser.user._id);

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
    <div className='shoe-action-buttons'>
      <div
        className='shoe-action-button shoe-action-button-like'
        title='Add to Wishlist'
        onClick={() => handleLike(shoe._id)}
      >
        {shoe.likes.includes(currentUser) ? (
          <FontAwesomeIcon
            icon={faHeartSolid}
            size='1x'
            className='shoe-action-button-icon'
          />
        ) : (
          <FontAwesomeIcon
            icon={faHeart}
            size='1x'
            className='shoe-action-button-icon'
          />
        )}
      </div>
      {shoe.user._id === currentUser && (
        <>
          <div
            className='shoe-action-button shoe-action-button-edit'
            title='Edit'
            onClick={() => handleEdit(shoe._id)}
          >
            <FontAwesomeIcon
              icon={faPenToSquare}
              size='1x'
              className='shoe-action-button-icon'
              style={{
                color: 'white',
              }}
            />
          </div>
          <div
            className='shoe-action-button shoe-action-button-delete'
            title='Delete'
            onClick={() => handleDelete(shoe._id)}
          >
            <FontAwesomeIcon
              icon={faTrashCan}
              size='1x'
              className='shoe-action-button-icon'
              style={{
                color: 'white',
              }}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default GridItemButtons;
