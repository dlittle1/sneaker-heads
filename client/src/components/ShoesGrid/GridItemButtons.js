import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSelector } from 'react-redux';

import {
  faPenToSquare,
  faHeart,
  faTrashCan,
} from '@fortawesome/pro-regular-svg-icons';

// if (shoe.likedBy.includes(currentUser)) change style to opposite

const GridItemButtons = ({ shoe, handleDelete, handleEdit, handleLike }) => {
  const currentUser = useSelector((state) => state.user.user._id);
  const likeButtonStyle = !shoe.likes.includes(currentUser)
    ? {
        color: 'rgb(236, 122, 122)',
        background: 'white',
      }
    : {
        color: 'white',
        background: 'rgb(236, 122, 122)',
      };

  return (
    <div className='grid-item-buttons'>
      <div
        className=' grid-item-button'
        title='Add to Wishlist'
        onClick={() => handleLike(shoe._id)}
        style={likeButtonStyle}
      >
        <FontAwesomeIcon
          icon={faHeart}
          size='1x'
          className='grid-item-button-icon'
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
