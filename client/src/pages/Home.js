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
    default: 4,
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
          <div key={index}>
            <h1>{shoe.name}</h1>
            <h2>{shoe.version}</h2>
          </div>
        ))}
      </Masonry>
    </div>
  )
}

export default Home
