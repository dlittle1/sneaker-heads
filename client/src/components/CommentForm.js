import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addCommentToShoeAsync } from '../redux/features/shoeSlice';

const CommentForm = ({ isCommenting, shoeId }) => {
  const [comment, setComment] = useState('');
  const dispatch = useDispatch();

  const commentFormStyle = { display: isCommenting ? 'block' : 'none' };

  const handleChange = (e) => {
    setComment(e.target.value);
  };

  const handleCommentSubmit = (e, comment) => {
    e.preventDefault();
    dispatch(addCommentToShoeAsync({ shoeId, body: comment }));
  };

  return (
    <form
      className='comment-form'
      style={commentFormStyle}
      onSubmit={(e) => {
        handleCommentSubmit(e, comment);
      }}
    >
      <input
        type='text'
        name='body'
        placeholder='Comment...'
        className='comment-input'
        value={comment}
        onChange={handleChange}
      />
      <button className='comment-submit-button'>Submit</button>
    </form>
  );
};

export default CommentForm;
