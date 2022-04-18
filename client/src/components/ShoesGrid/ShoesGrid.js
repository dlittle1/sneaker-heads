import React, { useState, useEffect, useMemo } from 'react';
import Masonry from 'react-masonry-css';
import GridItem from './GridItem';
import { useDispatch, useSelector } from 'react-redux';
import { getShoesAsync } from '../../redux/features/shoeSlice';
import { NavLink } from 'react-router-dom';

const ShoesGrid = (props) => {
  const shoes = useSelector((state) => state.shoes.shoes);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const { sortby } = props;
  useEffect(() => {
    dispatch(getShoesAsync(sortby)).then((response) => {
      setLoading(false);
    });
  }, [dispatch, sortby]);

  if (loading && !shoes) {
    return <div>Loading...</div>;
  }

  const breakpoints = {
    default: 5,
    1700: 5,
    1500: 4,
    1200: 3,
    890: 2,
    592: 1,
  };

  return (
    <div className='grid'>
      <div className='grid-options'>
        <NavLink to='/' className='grid-options-item'>
          {' '}
          Popular{' '}
        </NavLink>
        <NavLink to='/shoes/new' className='grid-options-item'>
          {' '}
          Newest{' '}
        </NavLink>
      </div>

      <Masonry
        breakpointCols={breakpoints}
        className='my-masonry-grid'
        columnClassName='my-masonry-grid_column'
      >
        {shoes.map((shoe) => (
          <GridItem {...props} shoe={shoe} key={shoe._id} />
        ))}
      </Masonry>
    </div>
  );
};

export default ShoesGrid;
