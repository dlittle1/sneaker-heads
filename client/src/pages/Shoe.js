import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import '../styles/shoe.css';
import { useSelector, useDispatch } from 'react-redux';
import { getOneShoeAsync } from '../redux/features/shoeSlice';
import { BigHead } from '@bigheads/core';
import ShoeComments from '../components/ShoeComments';
import ShoeActionButtons from '../components/ShoeActionButtons';

const Shoe = () => {
  const params = useParams();
  const shoeId = params.id;
  const dispatch = useDispatch();
  const shoe = useSelector((state) => state.shoes.shoe);
  const [isCommenting, setIsCommenting] = useState(false);
  const comments = useSelector((state) => state.shoes.shoe.comments);
  const [loading, setLoading] = useState(true);
  const commentRef = useRef();

  useEffect(() => {
    // if local storage token exists, get shoes
    if (Object.keys(shoe).length === 0) {
      dispatch(getOneShoeAsync(shoeId));
    }
  }, [dispatch, shoe, shoeId]);

  useEffect(() => {
    if (Object.keys(shoe).length > 0) {
      setLoading(false);
    }
  }, [shoe]);

  useEffect(() => {
    if (isCommenting) {
      commentRef.current.focus();
      commentRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [isCommenting]);

  if (loading) {
    return <div>Loading...</div>;
  }

  const handleCommentClick = () => {
    setIsCommenting(!isCommenting);
  };

  console.log(shoe);

  return (
    <div className='shoe-body'>
      <div className='shoe-container'>
        <div className='shoe-image-container'>
          <div
            className='shoe-image-mobile'
            style={{
              backgroundImage: `url(${shoe.imgUrl})`,
            }}
          ></div>
          <div className='shoe-image'>
            <img src={shoe.imgUrl} alt={`${shoe.name} ${shoe.version}`} />
          </div>
        </div>
        <div className='shoe-info-container'>
          <div className='shoe-info-main'>
            <div className='shoe-info'>
              <div className='shoe-info-title'>
                <p>Owned By: {shoe.user.username}</p>
                <BigHead {...shoe.user.avatar} />
              </div>
              <h1 className='shoe-info-name'>{shoe.name}</h1>
              <h2 className='shoe-info-version'>{shoe.version}</h2>
              <div className='shoe-info-year-condition'>
                <h3>Year: {shoe.year}</h3>
                <h3>Condition: {shoe.condition}</h3>
              </div>
            </div>
            <div className='shoe-info-buttons'>
              <ShoeActionButtons shoe={shoe} />
            </div>
            <div className='shoe-info-comments-container'>
              <ShoeComments
                shoe={shoe}
                handleCommentClick={handleCommentClick}
                isCommenting={isCommenting}
                comments={comments}
                commentRef={commentRef}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shoe;
