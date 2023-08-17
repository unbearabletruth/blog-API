import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { formatDate } from '../helperFunctions';
import '../assets/styles/Home.css'

function Home({user, logoutUser}) {
  const [posts, setPosts] = useState()

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch('http://localhost:3000/posts')
      const json = await response.json()
      if (response.ok) {
        setPosts(json)
      }
    }

    fetchPosts()
  }, [])

  const handleClick = () => {
    localStorage.removeItem('user')
    logoutUser()
  }

  return (
    <div>
      <nav>
        <button onClick={handleClick}>Log out</button>
        {user ?
          <p>Logged in</p>
          :
          <p>please log in</p>
        }
      </nav>
      <Link className="button" to="/posts/new">Write a new Post</Link>
      {posts && posts.map(post => {
        return (
          <Link to={`posts/${post._id}`} key={post._id} className="postCard">
            <div className='cardInfo'>
              <p className='cardTitle'>{post.title}</p>
              <p className='cardText'>{post.text}</p>
              <p className='cardAuthor'>{post.author}</p>
            </div>
            <p className='cardDate'>{formatDate(post.timestamp)}</p>
            {post.is_published ?
              <p className='cardPublished'>Published</p>
              :
              <p className='cardPublished'>To be published</p>
            }
          </Link>
        )
      })}
    </div>
  )
}

export default Home