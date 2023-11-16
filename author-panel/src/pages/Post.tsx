import { useEffect, useState } from 'react'
import { useParams, Link } from "react-router-dom";
import { formatDate } from '../helperFunctions';
import '../assets/styles/Post.css'
import Comments from '../components/Comments';

export type PostData = {
  author: string
  is_published: Boolean
  text: string
  title: string
  _id: string
  timestamp: string
}

type FormData = {
  title: string
  text: string
}

function Post(){
  const [postData, setPostData] = useState<PostData | null>(null)
  const [formData, setFormData] = useState<FormData | null>(null)
  const { id } = useParams();
  const [status, setStatus] = useState('')
  const [isForm, setIsForm] = useState(false)
  const [error, setError] = useState(null)
  const [popup, setPopup] = useState(false)

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
      setPopup(false)
    }
  }

  const updatePost = async (e) => {
    e.preventDefault()
    const response = await fetch(`http://localhost:3000/posts/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(formData),
      headers: {
        'Content-type': 'application/json'
      }
    })
    const json = await response.json()
    if (!response.ok) {
      setError(json.error)
    }
    if (response.ok) {
      setPostData(json)
      setPost(json)
      setError(null)
      setStatus('Updated')
      setIsForm(false)
    }
  }

  const handleInput = (e) => {
    setFormData({
      ...formData,
      [e.target.name] : e.target.value
    } as FormData)
  }

  return(
      <div className='postPage'>
        {popup && 
          <div className='popupWrapper'>
            <div className='popup'>
              <p>Delete this post?</p>
              <div className='popupButtons'>
                <button className='shallowButton' onClick={() => setPopup(false)}>Cancel</button>
                <button className='button' onClick={deletePost}>Delete</button>
              </div>
            </div>
          </div>
        }
        <Link to='/' className='link'>Home</Link>
        {postData && isForm ?
          <form onSubmit={updatePost} id="postForm">
            <input 
              type="text" 
              placeholder="Enter title" 
              name="title"
              onChange={handleInput}
              id="titleInput"
              value={formData?.title}
            >
            </input>
            <textarea 
              placeholder="Say it" 
              name="text" 
              onChange={handleInput}
              id="textPostInput"
              value={formData?.text}
            >
            </textarea>
            <div className='postFormButtons'>
              <button type='button' className='shallowButton' onClick={() => setIsForm(false)}>Cancel</button>
              <button className="button">Update</button>
            </div>
          </form>
          : postData ?
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
            <div className='postButtons'>
              <button className='bigButton' onClick={() => setPopup(true)}>Delete Post</button>
              <button className='bigButton' onClick={() => setIsForm(true)}>Update Post</button>
            </div>
          </>
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
        {postData && <Comments postId={postData._id} />}
      </div>
  )
}

export default Post