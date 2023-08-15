import { useParams } from "react-router-dom";
import { useState } from "react";

function CreateComment() {
  const [comment, setComment] = useState({
    text: '',
    author: '',
  })
  const [error, setError] = useState()
  const {id} = useParams();

  const handleInput = (e) => {
    setComment({
      ...comment,
      [e.target.name] : e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const response = await fetch(`http://localhost:3000/posts/${id}/comments`, {
      method: 'POST',
      body: JSON.stringify(comment),
      headers: {
        'Content-type': 'application/json'
      }
    })
    const json = await response.json()
    if (!response.ok) {
      setError(json.error)
    }
    if (response.ok) {
      setComment({
        text: '',
        author: '',
      })
      setError(null)
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit} id="commentForm">
        <input 
          type="text" 
          placeholder="Enter name" 
          name="author"
          onChange={handleInput}
          id="nameInput"
          value={comment.author}
        >
        </input>
        <textarea 
          placeholder="Say it" 
          name="text" 
          onChange={handleInput}
          id="textInput"
          value={comment.text}
        >
        </textarea>
        <button className="button">Reply</button>
      </form>
      {error && <p>{error}</p>}
    </>
  )
}

export default CreateComment