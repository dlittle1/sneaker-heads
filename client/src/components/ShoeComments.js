import TimeAgo from 'javascript-time-ago';
import CommentForm from './CommentForm';
import './componentStyles/comments.css';
const ShoeComments = ({
  shoe,
  handleCommentClick,
  isCommenting,
  comments,
  commentRef,
}) => {
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
      {comments && (
        <div className='comments-container'>
          {comments.map((comment, index) => (
            <div key={comment + index}>
              <hr />
              <div className='shoe-comment'>
                <p>{comment.body}</p>
                <p>
                  {' '}
                  -{' '}
                  <span className='shoe-comment-user'>
                    {comment.user.username}
                  </span>{' '}
                  <span className='shoe-comment-created'>
                    {timeAgo.format(new Date(comment.createdAt))}
                  </span>
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default ShoeComments;
