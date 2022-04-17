import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addCommentToShoeAsync } from '../redux/features/shoeSlice';

const CommentForm = ({ isCommenting, shoeId, commentRef }) => {
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
        ref={commentRef}
      />
      <button className='comment-submit-button'>Submit</button>
    </form>
  );
};

export default CommentForm;
