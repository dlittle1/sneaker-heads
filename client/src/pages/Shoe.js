import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../styles/shoe.css';
import { useSelector, useDispatch } from 'react-redux';
import { getOneShoeAsync } from '../redux/features/shoeSlice';
import ImageContainer from '../components/ImageContainer';
import ShoeDetails from '../components/ShoeDetails';

const Shoe = () => {
  const params = useParams();
  const shoeId = params.id;
  const dispatch = useDispatch();
  const shoe = useSelector((state) => state.shoes.shoe);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (Object.keys(shoe).length === 0) {
      dispatch(getOneShoeAsync(shoeId));
    }
  }, [dispatch, shoe, shoeId]);

  useEffect(() => {
    if (Object.keys(shoe).length > 0) {
      setLoading(false);
    }
  }, [shoe]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className='shoe-body'>
      <div className='shoe-container'>
        <ImageContainer
          img={shoe.imgUrl}
          imgAlt={`${shoe.name} ${shoe.version}`}
        />
        <ShoeDetails shoe={shoe} />
      </div>
    </div>
  );
};

export default Shoe;
