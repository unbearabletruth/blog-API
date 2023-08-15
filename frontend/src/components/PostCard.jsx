import { Link } from "react-router-dom";

function PostCard({posts}){
  return(
    posts && posts.map(post => {
      return(
        <Link to={`posts/${post._id}`} key={post._id} className='postCard'>
          <div className='cardInfo'>
            <p className='cardTitle'>{post.title}</p>
            <p className='cardText'>{post.text}</p>
            <p className='cardAuthor'>{post.author}</p>
          </div>
          <p className='cardDate'>{post.timestamp}</p>
        </Link>
      )
    })
  )
}

export default PostCard