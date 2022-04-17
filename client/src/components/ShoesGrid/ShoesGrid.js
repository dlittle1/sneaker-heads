import React, { useState, useEffect } from 'react';
import Masonry from 'react-masonry-css';
import GridItem from './GridItem';
import { useDispatch, useSelector } from 'react-redux';
import { getShoesAsync } from '../../redux/features/shoeSlice';

const ShoesGrid = (props) => {
  const shoes = useSelector((state) => state.shoes.shoes);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const { sortby } = props;
    if (Object.keys(shoes).length === 0) {
      dispatch(getShoesAsync(sortby)).then((response) => {
        setLoading(false);
      });
    }
  }, [dispatch, props, shoes]);

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
      <Masonry
        breakpointCols={breakpoints}
        className='my-masonry-grid'
        columnClassName='my-masonry-grid_column'
      >
        {shoes.length > 0 ? (
          shoes.map((shoe) => (
            <GridItem {...props} shoe={shoe} key={shoe._id} />
          ))
        ) : (
          <h1>There are no shoes</h1>
        )}
      </Masonry>
    </div>
  );
};

export default ShoesGrid;
