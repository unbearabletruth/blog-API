import PostCard from "../components/PostCard"
import { useEffect, useState } from 'react'
import '../assets/styles/Home.css'
import { PostData } from "./Post"

function Home(){
  const [posts, setPosts] = useState<PostData[]>([])

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

  return(
    <div id='homePage'>
      <div id='header'>
        Admin's blog
      </div>
      <div id='content'>
        <h1>All Posts</h1>
        {posts && <PostCard posts={posts} />}
      </div>
    </div>
  )
}

export default Home