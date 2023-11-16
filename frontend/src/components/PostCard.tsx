import { Link } from "react-router-dom";
import { formatDate } from '../helperFunctions';

function PostCard({posts}){
  return(
    posts && posts.map(post => {
      return(
        post.is_published &&
        <Link to={`posts/${post._id}`} key={post._id} className='postCard'>
          <div className='cardInfo'>
            <p className='cardTitle'>{post.title}</p>
            <p className='cardText'>{post.text}</p>
            <p className='cardAuthor'>{post.author}</p>
          </div>
          <p className='cardDate'>{formatDate(post.timestamp)}</p>
        </Link>
      )
    })
  )
}

export default PostCard