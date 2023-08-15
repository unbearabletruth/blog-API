import { useEffect, useState } from 'react'
import { useParams, Link } from "react-router-dom";
import Comment from '../components/Comment';
import CreateComment from '../components/CreateComment';

function Post(){
  const [post, setPost] = useState()
  const [comments, setComments] = useState()
  const {id} = useParams();

  useEffect(() => {
    const fetchPost = async () => {
      const response = await fetch(`http://localhost:3000/posts/${id}`)
      const json = await response.json()
      if (response.ok) {
        setPost(json)
      }
    }

    const fetchComments = async () => {
      const response = await fetch(`http://localhost:3000/posts/${id}/comments`)
      const json = await response.json()
      if (response.ok) {
        setComments(json)
      }
    }

    fetchPost()
    fetchComments()
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
      {comments && <Comment comments={comments} />}
      <CreateComment />
      <Link to='/' className='link'>Home</Link>
    </>
  )
}

export default Post