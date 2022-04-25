import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import TimeAgo from 'javascript-time-ago';
import CommentForm from './comments/CommentForm';
import CommentsList from './comments/CommentsList';
import './componentStyles/comments.css';
const ShoeComments = ({ shoe }) => {
  const commentRef = useRef();
  const [isCommenting, setIsCommenting] = useState(false);
  const comments = useSelector((state) => state.shoes.shoe.comments);

  useEffect(() => {
    if (isCommenting) {
      commentRef.current.focus();
      commentRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [isCommenting]);

  const handleCommentClick = () => {
    setIsCommenting(!isCommenting);
  };

  const timeAgo = new TimeAgo('en-US');
  return (
    <>
      <button className='comments-open-button' onClick={handleCommentClick}>
        comment
      </button>
      <CommentForm
        commentRef={commentRef}
        isCommenting={isCommenting}
        shoeId={shoe._id}
        handleCommentClick={handleCommentClick}
      />
      {comments && <CommentsList comments={comments} timeAgo={timeAgo} />}
    </>
  );
};

export default ShoeComments;
