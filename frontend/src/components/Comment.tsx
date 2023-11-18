import { formatDate } from '../helperFunctions';
import { CommentTypes } from '../context/CommentContext';

type CommentProps = {
  comments: CommentTypes[]
}

function Comment({comments}: CommentProps){
  return(
    comments && comments.map(comment => {
      return(
        <div key={comment._id} className='commentCard'>
          <div className='commentInfo'>
            <p className='commentAuthor'>{comment.author}</p>
            <p className='commentDate'>{formatDate(comment.timestamp)}</p>
          </div>
          <p className='commentText'>{comment.text}</p>
        </div>
      )
    })
  )
}

export default Comment