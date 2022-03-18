import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Masonry from 'react-masonry-css'
import '../styles/home.css'
const Home = () => {
  const [shoes, setShoes] = useState([])

  useEffect(() => {
    axios.get('/shoes').then((res) => setShoes(res.data))
  }, [])

  const breakpoints = {
    default: 6,
    1100: 3,
    700: 2,
    400: 1,
  }

  return (
    <div className='grid'>
      <Masonry
        breakpointCols={breakpoints}
        className='my-masonry-grid'
        columnClassName='my-masonry-grid_column'
      >
        {shoes.map((shoe, index) => (
          <div key={index} className='grid-item'>
            <img src={shoe.imgUrl} className='grid-img' />
            <div className='grid-text-container'>
              <h4 className='grid-item-text grid-item-text-title'>
                {shoe.name}
              </h4>
              <p className='grid-item-text'>{shoe.version}</p>
            </div>
          </div>
        ))}
      </Masonry>
    </div>
  )
}

export default Home
