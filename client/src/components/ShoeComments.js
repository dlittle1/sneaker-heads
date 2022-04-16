import TimeAgo from 'javascript-time-ago';
import CommentForm from './CommentForm';
import './componentStyles/comments.css';
const ShoeComments = ({
  shoe,
  handleCommentClick,
  isCommenting,
  handleCommentSubmit,
  comments,
}) => {
  const timeAgo = new TimeAgo('en-US');

  return (
    <>
      <button className='comments-open-button' onClick={handleCommentClick}>
        comment
      </button>
      <CommentForm isCommenting={isCommenting} shoeId={shoe._id} />
      {comments && (
        <div>
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
