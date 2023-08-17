import { useState } from "react";
import '../assets/styles/PostForm.css'
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function PostForm({user}) {
  let navigate = useNavigate();  
  const [post, setPost] = useState({
    title: '',
    text: '',
    author: user.username,
  })
  const [error, setError] = useState()

  const handleInput = (e) => {
    setPost({
      ...post,
      [e.target.name] : e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const response = await fetch(`http://localhost:3000/posts`, {
      method: 'POST',
      body: JSON.stringify(post),
      headers: {
        'Content-type': 'application/json'
      }
    })
    const json = await response.json()
    if (!response.ok) {
      setError(json.error)
    }
    if (response.ok) {
      setPost({
        ...post,
        title: '',
        text: ''
      })
      setError(null)
      navigate('/');
    }
  }

  return (
    <>
      <Link to='/' className='link'>Home</Link>
      <form onSubmit={handleSubmit} id="postForm">
        <input 
          type="text" 
          placeholder="Enter title" 
          name="title"
          onChange={handleInput}
          id="titleInput"
          value={post.title}
        >
        </input>
        <textarea 
          placeholder="Say it" 
          name="text" 
          onChange={handleInput}
          id="textInput"
          value={post.text}
        >
        </textarea>
        <button className="button">Post</button>
      </form>
      {error && <p>{error}</p>}
    </>
  )
}

export default PostForm