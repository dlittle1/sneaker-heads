import React from 'react';
import ShoeActionButtons from './ShoeActionButtons';
import ShoeComments from './ShoeComments';
import { BigHead } from '@bigheads/core';
import UserAvatar from './UserAvatar';

const ShoeDetails = ({ shoe }) => {
  return (
    <div className='shoe-info-container'>
      <div className='shoe-info-main'>
        <div className='shoe-info'>
          <div className='shoe-info-title'>
            <p>Owned By: {shoe.user.username}</p>
            <UserAvatar avatar={shoe.user.avatar} userId={shoe.user._id} />
          </div>
          <h1 className='shoe-info-name'>{shoe.name}</h1>
          <h2 className='shoe-info-version'>{shoe.version}</h2>
          <div className='shoe-info-year-condition'>
            <h3>Year: {shoe.year}</h3>
            <h3>Condition: {shoe.condition}</h3>
            <h3>Number of Likes: {shoe.numLikes}</h3>
          </div>
        </div>
        <div className='shoe-info-buttons'>
          <ShoeActionButtons shoe={shoe} />
        </div>
        <div className='shoe-info-comments-container'>
          <ShoeComments shoe={shoe} />
        </div>
      </div>
    </div>
  );
};

export default ShoeDetails;
