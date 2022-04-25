import React from 'react';

const ImageContainer = ({ img, imgAlt }) => {
  return (
    <div className='shoe-image-container'>
      <div
        className='shoe-image-mobile'
        style={{
          backgroundImage: `url(${img})`,
        }}
      ></div>
      <div className='shoe-image-desktop-container'>
        <div className='shoe-image'>
          <img src={img} alt={imgAlt} />
        </div>
      </div>
    </div>
  );
};

export default ImageContainer;
