import React, { useState, useEffect, useMemo } from 'react';
import Masonry from 'react-masonry-css';
import GridItem from '../components/ShoesGrid/GridItem';
import { useDispatch, useSelector } from 'react-redux';
import { getShoesAsync, setSort } from '../redux/features/shoeSlice';
import GridOptions from '../components/ShoesGrid/GridOptions';
import '../components/componentStyles/shoesGrid.css';

const ShoesGrid = (props) => {
  const shoes = useSelector((state) => state.shoes.shoes);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const sortBy = useSelector((state) => state.shoes.sort);

  useEffect(() => {
    if (shoes.length === 0) {
      setLoading(true);
      dispatch(getShoesAsync('-numLikes')).then(() => {
        setLoading(false);
      });
    }
    if (props.sortby !== sortBy && shoes.length > 0) {
      setLoading(true);
      dispatch(setSort(props.sortby));
      setLoading(false);
    } else setLoading(false);
  }, [dispatch, shoes.length, sortBy, props.sortby]);

  const changeSortBy = (newSort) => {
    dispatch(setSort(newSort));
  };

  if (loading) {
    return <></>;
  }

  const breakpoints = {
    default: 5,
    1700: 6,
    1500: 5,
    1200: 4,
    890: 3,
    592: 2,
    420: 1,
  };

  return (
    <div className='grid'>
      <GridOptions changeSortBy={changeSortBy} />
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
