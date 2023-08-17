import { useEffect, useState } from 'react'
import { useParams, Link } from "react-router-dom";
import { formatDate } from '../helperFunctions';
import '../assets/styles/Post.css'

function Post(){
  const [postData, setPostData] = useState()
  const [post, setPost] = useState()
  const {id} = useParams();
  const [status, setStatus] = useState()
  const [isForm, setIsForm] = useState(false)
  const [error, setError] = useState()

  useEffect(() => {
    const fetchPost = async () => {
      const response = await fetch(`http://localhost:3000/posts/${id}`)
      const json = await response.json()
      if (response.ok) {
        setPostData(json)
        setPost(json)
      }
    }

    fetchPost()
  }, [])

  const deletePost = async () => {
    const response = await fetch(`http://localhost:3000/posts/${id}`, {
      method: 'DELETE'
    })
    if (response.ok) {
      setPostData(null)
      setStatus('Deleted')
    }
  }

  const updatePost = async (e) => {
    e.preventDefault()
    const response = await fetch(`http://localhost:3000/posts/${id}`, {
      method: 'PATCH',
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
      setStatus('Updated')
    }
  }

  const handleInput = (e) => {
    setPost({
      ...post,
      [e.target.name] : e.target.value
    })
  }

  return(
      <div className='postPage'>
        <Link to='/' className='link'>Home</Link>
        {postData ?
          <>
            <div className='post'>
              <p className='postTitle'>{postData.title}</p>
              <div className='postAuthorAndDate'>
                <p className='postAuthor'>{postData.author}</p>
                <p className='postDate'>{formatDate(postData.timestamp)}</p>
              </div>
              <hr></hr>
              <p className='postText'>{postData.text}</p>
            </div>
            <button className='button' onClick={deletePost}>Delete</button>
            <button className='button' onClick={() => setIsForm(true)}>Update</button>
          </>
          :
          null
        }
        {postData && isForm ?
          <form onSubmit={updatePost} id="postForm">
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
          :
          null
        }
        {status === 'Deleted' ?
          <p>Your post has been successfully deleted</p>
          : status === 'Updated' ?
          <p>Your post has been successfully updated</p>
          :
          null
        }
        {error && <p>{error}</p>}
      </div>
  )
}

export default Post