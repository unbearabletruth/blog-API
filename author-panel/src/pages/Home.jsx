import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { formatDate } from '../helperFunctions';
import '../assets/styles/Home.css'

function Home({logoutUser}) {
  const [posts, setPosts] = useState()
  const [error, setError] = useState()

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
 
  const updatePost = async (e, post) => {
    e.preventDefault()
    let postToPublish = {...post}
    postToPublish.is_published = postToPublish.is_published ? false : true

    const response = await fetch(`http://localhost:3000/posts/${post._id}`, {
      method: 'PATCH',
      body: JSON.stringify(postToPublish),
      headers: {
        'Content-type': 'application/json'
      }
    })
    const json = await response.json()
    if (!response.ok) {
      setError(json.error)
    }
    if (response.ok) {
      setPosts(posts.map(p => {
        if (p._id === post._id) {
          return {
            ...p, 
            is_published: postToPublish.is_published
          };
        }
        return p;
      }));
      setError(null)
    }
  }

  const handleClick = () => {
    localStorage.removeItem('user')
    logoutUser()
  }

  return (
    <div id="homePage">
      <nav>
        <p>Admin panel</p>
        <div id="loginBlock">
          <button className="shallowButton" onClick={handleClick}>Log out</button>
        </div>
      </nav>
      <div id="homeContent">
        <Link className="bigButton" to="/posts/new">Write a new Post</Link>
        {posts && posts.map(post => {
          return (
            <div key={post._id}>
              <Link to={`posts/${post._id}`} className="postCard">
                <div className='cardInfo'>
                  <p className='cardTitle'>{post.title}</p>
                  <p className='cardText'>{post.text}</p>
                  <p className='cardAuthor'>{post.author}</p>
                </div>
                <p className='cardDate'>{formatDate(post.timestamp)}</p>
                {post.is_published ?
                  <button className='shallowButtonBig' onClick={(e) => updatePost(e, post)}>Published</button>
                  :
                  <button className='shallowButtonBig' onClick={(e) => updatePost(e, post)}>Publish</button>
                }
              </Link>
              {error && <p>{error}</p>}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Home