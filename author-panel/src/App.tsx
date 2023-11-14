import './App.css'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Post from './pages/Post';
import PostForm from './pages/PostForm';
import Login from './pages/Login';
import { useState } from 'react';

export type User = null | {
  username: string
  password: string
}

function App() {
  const getUserFromLocalStorage = localStorage.getItem("user")
  const initializeState = getUserFromLocalStorage ? JSON.parse(getUserFromLocalStorage) : null
  const [user, setUser] = useState<User>(initializeState)

  const handleUser = (loginData: User) => {
    setUser(loginData)
  }

  const logoutUser = () => {
    setUser(null)
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={user ? <Home user={user} logoutUser={logoutUser}/> : <Navigate to='/login'/>} />   
        <Route path="/posts/new" element={user ? <PostForm user={user}/> : <Navigate to='/login'/>} />   
        <Route path="/posts/:id" element={user ? <Post user={user}/> : <Navigate to='/login'/>} />  
        <Route path="/login" element={<Login user={user} handleUser={handleUser}/>} />              
      </Routes>
    </BrowserRouter>
  )
}

export default App
