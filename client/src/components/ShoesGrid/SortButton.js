import React from 'react';
import { NavLink } from 'react-router-dom';

const SortButton = ({ changeSortBy, title, sortyBy, link }) => {
  return (
    <NavLink
      to={link}
      className='grid-options-item'
      onClick={() => changeSortBy(sortyBy)}
    >
      {title}
    </NavLink>
  );
};

export default SortButton;
