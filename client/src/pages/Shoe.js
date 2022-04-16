import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/pro-regular-svg-icons';
import { faTrashCan } from '@fortawesome/pro-regular-svg-icons';
import { faPenToSquare } from '@fortawesome/pro-regular-svg-icons';
import '../styles/shoe.css';
import { useSelector, useDispatch } from 'react-redux';
import { getOneShoeAsync } from '../redux/features/shoeSlice';
import { BigHead } from '@bigheads/core';
import ShoeComments from '../components/ShoeComments';

const Shoe = () => {
  const params = useParams();
  const shoeId = params.id;
  const dispatch = useDispatch();
  const [shoeState, setShoeState] = useState(
    useSelector((state) => state.shoes.shoe)
  );
  const [isCommenting, setIsCommenting] = useState(false);
  const comments = useSelector((state) => state.shoes.shoe.comments);
  const currentUser = useSelector((state) => state.currentUser.user._id);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // if local storage token exists, get shoes
    if (Object.keys(shoeState).length === 0) {
      dispatch(getOneShoeAsync(shoeId)).then((response) => {
        setShoeState(response.payload);
      });
    }
  }, [dispatch, shoeState, shoeId]);

  useEffect(() => {
    if (Object.keys(shoeState).length > 0) {
      setLoading(false);
    }
  }, [shoeState]);
  const navigate = useNavigate();

  function handleEdit(id) {
    navigate(`/shoes/edit/${id}`);
  }

  const handleDelete = (id) => {
    axios
      .delete(`/shoes/${id}`)
      .then((res) => navigate('/shoes'))
      .catch((err) => console.error(err));
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  const handleCommentClick = () => {
    setIsCommenting(!isCommenting);
  };

  return (
    <div className='shoe-body'>
      <div className='shoe-container'>
        <div className='shoe-image-container'>
          <div
            className='shoe-image-mobile'
            style={{
              backgroundImage: `url(${shoeState.imgUrl})`,
            }}
          ></div>
          <div className='shoe-image'>
            <img src={shoeState.imgUrl} />
          </div>
        </div>
        <div className='shoe-info-container'>
          <div className='shoe-info'>
            <div className='shoe-info-title'>
              <p>Owned By: {shoeState.user.username}</p>
              <BigHead {...shoeState.user.avatar} />
            </div>
            <h1 className='shoe-info-name'>{shoeState.name}</h1>
            <h2 className='shoe-info-version'>{shoeState.version}</h2>
            <div className='shoe-info-year-condition'>
              <h3>Year: {shoeState.year}</h3>
              <h3>Condition: {shoeState.condition}</h3>
            </div>
          </div>
          <div className='shoe-info-buttons'>
            <div title='Add to Wishlist'>
              <FontAwesomeIcon
                icon={faHeart}
                size='2x'
                style={{ color: 'pink' }}
              />
            </div>
            {currentUser === shoeState.user._id && (
              <>
                <div
                  title='Delete'
                  onClick={() => handleDelete(shoeState._id)}
                  className='shoe-info-button'
                >
                  <FontAwesomeIcon
                    icon={faTrashCan}
                    size='2x'
                    style={{ color: 'rgb(236, 122, 122)' }}
                  />
                </div>
                <div
                  title='Edit'
                  onClick={() => handleEdit(shoeState._id)}
                  className='shoe-info-button'
                >
                  <FontAwesomeIcon
                    icon={faPenToSquare}
                    size='2x'
                    style={{ color: 'rgb(92, 159, 235)' }}
                  />
                </div>
              </>
            )}
          </div>
          <div className='shoe-info-comments-container'>
            <ShoeComments
              shoe={shoeState}
              handleCommentClick={handleCommentClick}
              isCommenting={isCommenting}
              comments={comments}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shoe;
