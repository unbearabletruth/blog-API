import { formatDate } from '../helperFunctions';
import { useState, useEffect } from 'react';

type CommentsProps = {
  postId: string
}

type Comment = {
  author: string
  text: string
  post: string
  timestamp: string
  _id: string
}

type CommentInput = {
  author: string
  text: string
  _id: string
} | null

function Comments({postId}: CommentsProps) {
  const [comments, setComments] = useState<Comment[]>([])
  const [commentInput, setCommentInput] = useState<CommentInput>(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchComments = async () => {
      const response = await fetch(`http://localhost:3000/posts/${postId}/comments`)
      const json = await response.json()
      if (response.ok) {
        setComments(json)
      }
    }

    fetchComments()
  }, [])

  const deleteComment = async (id: string) => {
    const response = await fetch(`http://localhost:3000/posts/${postId}/comments/${id}`, {
      method: 'DELETE'
    })
    if (response.ok) {
      setComments(comments.filter(comment => comment._id !== id))
    }
  }

  const updateComment = async (e, id: string) => {
    e.preventDefault()
    const response = await fetch(`http://localhost:3000/posts/${postId}/comments/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(commentInput),
      headers: {
        'Content-type': 'application/json'
      }
    })
    const json = await response.json()
    if (!response.ok) {
      setError(json.error)
    }
    if (response.ok) {
      setCommentInput(null)
      setError(null)
      setComments(comments.map(comment => {
        if (comment._id === id) {
          return {
            ...comment, 
            text: commentInput!.text,
            author: commentInput!.author
          };
        }
        return comment;
      }));
    }
  }

  const handleInput = (e) => {
    setCommentInput({
      ...commentInput,
      [e.target.name] : e.target.value
    } as CommentInput)
  }

  return (
    <>
      {error && <p>{error}</p>}
      {comments && comments.map(comment => {
        return(
          commentInput && comment._id === commentInput._id ?
            <form key={comment._id} onSubmit={(e) => updateComment(e, commentInput._id)} id="commentForm">
              <input 
                type="text" 
                placeholder="Enter name" 
                name="author"
                onChange={handleInput}
                id="nameInput"
                value={commentInput.author}
              >
              </input>
              <textarea 
                placeholder="Say it" 
                name="text" 
                onChange={handleInput}
                id="textInput"
                value={commentInput.text}
              >
              </textarea>
              <div className='postFormButtons'>
                <button type='button' className='shallowButton' onClick={() => setCommentInput(null)}>Cancel</button>
                <button className="button">Change</button>
              </div>
            </form>
            :
            <div key={comment._id} className='commentCard'>
              <div className='commentInfo'>
                <div className='commentAuthorAndDate'>
                  <p className='commentAuthor'>{comment.author}</p>
                  <p className='commentDate'>{formatDate(comment.timestamp)}</p>
                </div>
                <p className='commentText'>{comment.text}</p>
              </div>
              <div className='commentButtons'>
                <button className='smallButton' onClick={() => deleteComment(comment._id)}>Delete</button>
                <button className='smallButton' onClick={() => setCommentInput(comment)}>Update</button>
              </div>
            </div>
          )
      })}
    </>
  )
}

export default Comments