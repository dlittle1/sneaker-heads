import React, { useEffect, useState } from 'react';
import '../styles/shoeForm.css';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {
  createShoeAsync,
  getOneShoeAsync,
  updateShoeAsync,
} from '../redux/features/shoeSlice';

const ShoeForm = () => {
  const navigate = useNavigate();
  const params = useParams();
  const dispatch = useDispatch();
  const year = new Date().getFullYear();
  const years = Array.from(new Array(101), (val, index) => index - 100 + year);
  const [shoe, setShoe] = useState({
    name: '',
    version: '',
    condition: 'new',
    year: 2022,
    imgUrl: '',
  });

  useEffect(() => {
    if (params.id) {
      dispatch(getOneShoeAsync(params.id)).then((shoe) => {
        setShoe(shoe.payload);
      });
    }
  }, [dispatch, params.id]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setShoe((prevShoe) => {
      return {
        ...prevShoe,
        [name]: value,
      };
    });
  };

  const createShoe = () => {
    dispatch(createShoeAsync(shoe))
      .then(() => navigate('/'))
      .catch((err) => console.error(err));
  };

  const editShoe = () => {
    dispatch(updateShoeAsync(shoe))
      .then(() => navigate('/'))
      .catch((err) => console.error(err));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (params.id) {
      editShoe();
    } else {
      createShoe();
    }
  };

  return (
    <div className='shoe-form-body'>
      <div className='shoe-form-card'>
        <div className='shoe-form-container'>
          <h3 className='shoe-form-heading'>
            {params.id ? 'Edit' : 'Add'} Your Sneaker
          </h3>
          <form onSubmit={handleSubmit}>
            <div className='shoe-form-field'>
              Name <br />
              <input
                name='name'
                className='shoe-form-input'
                placeholder='...Jordan 1 Retro High OG'
                value={shoe.name}
                onChange={handleChange}
              />
            </div>
            <div className='shoe-form-field'>
              <label>
                Version <br />
                <input
                  name='version'
                  className='shoe-form-input'
                  placeholder='...Rebellionaire'
                  value={shoe.version}
                  onChange={handleChange}
                />
              </label>
            </div>
            <div className='shoe-form-field'>
              Condition <br />
              <div className='shoe-form-radio-button-group'>
                <label>
                  New
                  <input
                    type='radio'
                    checked={shoe.condition === 'new'}
                    value='new'
                    name='condition'
                    onChange={handleChange}
                  />
                </label>
                <label>
                  Good
                  <input
                    type='radio'
                    checked={shoe.condition === 'good'}
                    value='good'
                    name='condition'
                    onChange={handleChange}
                  />
                </label>
                <label>
                  Used
                  <input
                    type='radio'
                    checked={shoe.condition === 'used'}
                    value='used'
                    name='condition'
                    onChange={handleChange}
                  />
                </label>
              </div>
            </div>
            <div className='shoe-form-field'>
              <label>
                Year <br />
                <select
                  className='shoe-form-year-select'
                  onChange={handleChange}
                  value={shoe.year}
                  name='year'
                >
                  {years
                    .slice(0)
                    .reverse()
                    .map((year, index) => {
                      return (
                        <option key={`year${index}`} value={year}>
                          {year}
                        </option>
                      );
                    })}
                </select>
              </label>
            </div>
            <div className='shoe-form-field'>
              Image URL <br />
              <input
                name='imgUrl'
                className='shoe-form-input'
                placeholder='https://someImgUrl.com/image_adress'
                value={shoe.imgUrl}
                onChange={handleChange}
              />
            </div>
            <button className='shoe-form-button'>Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ShoeForm;
