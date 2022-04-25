import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setShoe } from '../../redux/features/shoeSlice';
import NumLikesCard from './NumLikesCard';
import '../componentStyles/gridItem.css';
import ShoeCardInfo from './ShoeCardInfo';

const GridItem = ({ shoe }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.currentUser);

  function handleShoeClick(id) {
    navigate(`/shoes/${id}`);
    dispatch(setShoe({ ...shoe }));
  }

  return (
    <div className='grid-item'>
      <NumLikesCard
        includesUser={shoe.likes.includes(user._id)}
        numLikes={shoe.numLikes}
      />
      <img
        src={shoe.imgUrl}
        className='grid-item-img'
        alt={`${shoe.name + ' ' + shoe.version}`}
        onClick={() => handleShoeClick(shoe._id)}
      />
      <ShoeCardInfo
        shoe={shoe}
        name={shoe.name}
        userId={shoe.user._id}
        avatar={shoe.user.avatar}
        username={shoe.user.username}
      />
    </div>
  );
};

export default GridItem;
