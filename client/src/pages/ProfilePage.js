import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../styles/profilePage.css';
import TimeAgo from 'javascript-time-ago';
import { BigHead } from '@bigheads/core';

const ProfilePage = () => {
  const { id } = useParams();
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(true);

  const timeAgo = new TimeAgo('en-US');

  let userTokenAxios = axios.create({
    baseURL: '/api/users/shoes',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });

  userTokenAxios.interceptors.response.use((response) => {
    if (response.data.errorMessage === 'jwt expired') {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.reload();
      return Promise.reject({
        message: 'Your session has expired. Please log in again.',
        response,
      });
    }
    return response;
  });

  useEffect(() => {
    const fetchUserShoes = async () => {
      const res = await userTokenAxios.get(`/${id}`);
      setUserData(res.data);
    };
    fetchUserShoes().then(() => setLoading(false));
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className='user-profile'>
      <div className='user-profile-info-container'>
        <BigHead {...userData.user.avatar} className='user-profile-avatar' />
        <div className='user-profile-user-data'>
          <h1>{userData.user.username}</h1>
          <div className='user-profile-user-data-info'>
            <h4>
              Became a member: <br />
              {timeAgo.format(new Date(userData.user.memberSince))}
            </h4>
            <h4>
              Owns: <br /> {userData.shoes && userData.shoes.length} shoe
              {userData.shoes.length > 1 && 's'}
            </h4>
            <h4>
              Has a total of: <br /> {userData.totalNumLikes} like
              {userData.totalNumLikes !== 1 && 's'}
            </h4>
          </div>
        </div>
      </div>
      <div className='user-shoes-container user-profile-shoes-container'>
        {userData.shoes.map((shoe) => {
          return (
            <div key={shoe._id} className='user-shoe-data'>
              <div
                style={{ backgroundImage: `url(${shoe.imgUrl})` }}
                alt={shoe.name + ' ' + shoe.version}
                className='user-shoe-image'
              ></div>
              <div className='user-shoe-info'>
                <h3>{shoe.name}</h3>
                <p>{shoe.version}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProfilePage;
