import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getOneShoeAsync, setShoe } from '../redux/features/shoeSlice';
import { BigHead } from '@bigheads/core';
import TimeAgo from 'javascript-time-ago';
import '../styles/users.css';

const Users = () => {
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();

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

  const truncate = (str) => {
    if (str.split(' ').length > 4) {
      return str.split(' ').slice(0, 4).join(' ').concat('...');
    }
    return str;
  };

  useEffect(() => {
    userTokenAxios.get('/').then((res) => {
      setUserData(res.data);
      setLoading(false);
    });
  }, []);

  const handleUserClick = (id) => {
    navigate(`/users/${id}`);
  };

  const handleShoeClick = (shoe) => {
    navigate(`/shoes/${shoe._id}`);
    dispatch(setShoe({ ...shoe }));
    dispatch(getOneShoeAsync(shoe._id));
  };

  console.log(userData);
  return (
    <div className='users'>
      {userData.map((data) => {
        return (
          <div key={data.user._id} className='users-container'>
            <div
              className='user-info'
              onClick={() => handleUserClick(data.user._id)}
            >
              <BigHead {...data.user.avatar} className='user-avatar' />
              <div>
                <h2>{data.user.username}</h2>

                <p>
                  Became a member: <br />
                  {timeAgo.format(new Date(data.user.memberSince))}
                </p>

                <p>
                  Owns {data.shoes.length} shoe
                  {data.shoes.length > 1 ? 's' : ''}{' '}
                </p>
              </div>
            </div>
            <div className='user-shoes-container'>
              {data.shoes.map((shoe) => {
                return (
                  <div
                    key={shoe._id}
                    className='user-shoe-data'
                    onClick={() => handleShoeClick(shoe)}
                  >
                    <div
                      style={{ backgroundImage: `url(${shoe.imgUrl})` }}
                      alt={shoe.name + ' ' + shoe.version}
                      className='user-shoe-image'
                    ></div>
                    <div className='user-shoe-info'>
                      <h3>{truncate(shoe.name)}</h3>
                      <p>{truncate(shoe.version)}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Users;
