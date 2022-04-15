import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {
  faPenToSquare,
  faHeart,
  faTrashCan,
} from '@fortawesome/pro-regular-svg-icons';

const GridItemButtons = ({ shoe, handleDelete, handleEdit }) => {
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
