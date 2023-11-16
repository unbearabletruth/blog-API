import { useEffect, useState } from 'react'
import { useParams, Link } from "react-router-dom";
import Comment from '../components/Comment';
import CreateComment from '../components/CreateComment';
import '../assets/styles/Post.css'
import { formatDate } from '../helperFunctions';
import { useCommentContext } from '../hooks/useCommentContext';

type Post = {

}

function Post(){
  const [post, setPost] = useState()
  const { comments, dispatch } = useCommentContext()
  const { id } = useParams();
console.log(post)
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
        dispatch({type: 'set_comments', payload: json})
      }
    }

    fetchPost()
    fetchComments()
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
      {comments && <p>{comments.length} {comments.length === 1 ? 'Comment' : 'Comments'}</p>}
      <CreateComment />
      {comments && <Comment comments={comments} />}
    </div>
  )
}

export default Post