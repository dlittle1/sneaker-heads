import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/pro-regular-svg-icons';
import { faHeart as faHeartSolid } from '@fortawesome/pro-solid-svg-icons';

const NumLikesCard = ({ includesUser, numLikes }) => {
  return (
    <div className='grid-item-num-likes'>
      <FontAwesomeIcon icon={includesUser ? faHeartSolid : faHeart} size='1x' />
      <span>{numLikes}</span>
    </div>
  );
};

export default NumLikesCard;
