import React from 'react';
import ShoeActionButtons from '../ShoeActionButtons';
import UserAvatarAndUsername from '../UserAvatarAndUsername';

const ShoeInfo = ({ name, userId, avatar, username, shoe }) => {
  return (
    <div className='grid-item-info'>
      <p>{name}</p>
      <UserAvatarAndUsername
        avatar={avatar}
        userId={userId}
        username={username}
      />
      <ShoeActionButtons shoe={shoe} />
    </div>
  );
};

export default ShoeInfo;
