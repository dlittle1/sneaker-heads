import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../styles/shoe.css';

const Shoe = () => {
  const params = useParams();
  const shoeId = params.id;
  const [shoe, setShoe] = useState({});

  useEffect(() => {
    const sendGetRequest = async () => {
      try {
        const res = await axios.get(`/shoes/${shoeId}`);
        setShoe(res.data.shoe);
      } catch (err) {
        console.error(err);
      }
    };
    sendGetRequest();
  }, []);

  return <div>Shoe</div>;
};

export default Shoe;
