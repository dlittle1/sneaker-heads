import React from 'react';
import UserAvatar from './UserAvatar';

const UserAvatarAndUsername = ({ avatar, userId, username }) => {
  return (
    <div className='grid-item-info-user'>
      <UserAvatar avatar={avatar} userId={userId} />
      <p>{username}</p>
    </div>
  );
};

export default UserAvatarAndUsername;
