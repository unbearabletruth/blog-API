import { useEffect, useState } from 'react'
import { useParams, Link } from "react-router-dom";
import { formatDate } from '../helperFunctions';
import '../assets/styles/Post.css'

function Post(){
  const [post, setPost] = useState()
  const {id} = useParams();

  useEffect(() => {
    const fetchPost = async () => {
      const response = await fetch(`http://localhost:3000/posts/${id}`)
      const json = await response.json()
      if (response.ok) {
        setPost(json)
      }
    }

    fetchPost()
  }, [])

  return(
    <div className='postPage'>
      <Link to='/' className='link'>Home</Link>
      {post ?
        <div className='post'>
          <p className='postTitle'>{post.title}</p>
          <div className='postAuthorAndDate'>
            <p className='postAuthor'>{post.author}</p>
            <p className='postDate'>{formatDate(post.timestamp)}</p>
          </div>
          <hr></hr>
          <p className='postText'>{post.text}</p>
        </div>
        :
        null
      }
    </div>
  )
}

export default Post