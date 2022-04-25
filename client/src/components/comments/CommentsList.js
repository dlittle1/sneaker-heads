import React from 'react';

const CommentsList = ({ comments, timeAgo }) => {
  return (
    <div className='comments-container'>
      {comments.map((comment, index) => (
        <div key={comment + index}>
          <hr />
          <div className='shoe-comment'>
            <p>{comment.body}</p>
            <p>
              -{' '}
              <span className='shoe-comment-user'>{comment.user.username}</span>{' '}
              <span className='shoe-comment-created'>
                {timeAgo.format(new Date(comment.createdAt))}
              </span>
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CommentsList;
