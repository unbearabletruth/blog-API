import { useEffect, useState } from 'react'
import { useParams, Link } from "react-router-dom";

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
    <>
      {post ?
        <>
          <p>Post details</p>
          <div className='postCard'>
            <div className='cardInfo'>
              <p className='cardTitle'>{post.title}</p>
              <p className='cardText'>{post.text}</p>
              <p className='cardAuthor'>{post.author}</p>
            </div>
            <p className='cardDate'>{post.timestamp}</p>
          </div>
        </>
        :
        null
      }
      <Link to='/' className='link'>Home</Link>
    </>
  )
}

export default Post