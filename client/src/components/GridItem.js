import React from 'react';
import GridItemButtons from './GridItemButtons';
import { useNavigate } from 'react-router-dom';

const GridItem = ({ shoe, handleDelete, handleEdit }) => {
  const navigate = useNavigate();

  function handleShoeClick(id) {
    navigate(`/shoes/${id}`);
  }

  return (
    <div className='grid-item'>
      <img
        src={shoe.imgUrl}
        className='grid-img'
        alt={`${shoe.name + ' ' + shoe.version}`}
      />
      <GridItemButtons
        handleDelete={handleDelete}
        handleEdit={handleEdit}
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
