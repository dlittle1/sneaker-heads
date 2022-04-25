import React from 'react';
import SortButton from './SortButton';

const GridOptions = ({ changeSortBy }) => {
  return (
    <div className='grid-options'>
      <SortButton
        sortBy='numLikes'
        title='Popular'
        changeSortBy={changeSortBy}
        link='/'
      />
      <SortButton
        sortBy='createdAt'
        title='Newest'
        changeSortBy={changeSortBy}
        link='/shoes/new'
      />
    </div>
  );
};

export default GridOptions;
