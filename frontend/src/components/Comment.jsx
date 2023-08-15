function Comment({comments}){
  return(
    comments && comments.map(comment => {
      return(
        <div key={comment._id} className='postCard'>
          <div className='cardInfo'>
            <p className='cardText'>{comment.text}</p>
            <p className='cardAuthor'>{comment.author}</p>
          </div>
          <p className='cardDate'>{comment.timestamp}</p>
        </div>
      )
    })
  )
}

export default Comment