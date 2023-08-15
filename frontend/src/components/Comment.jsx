import { formatDate } from '../helperFunctions';

function Comment({comments}){
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