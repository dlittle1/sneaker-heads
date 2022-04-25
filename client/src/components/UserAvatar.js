import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BigHead } from '@bigheads/core';

const UserAvatar = ({ userId, avatar }) => {
  const navigate = useNavigate();

  const handleUserClick = (id) => {
    navigate(`/users/${id}`);
  };

  return (
    <BigHead
      {...avatar}
      onClick={() => handleUserClick(userId)}
      style={{ cursor: 'pointer' }}
    />
  );
};

export default UserAvatar;
