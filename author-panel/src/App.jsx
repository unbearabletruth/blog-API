import './App.css'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Post from './pages/Post';
import NewPost from './pages/NewPost';
import Login from './pages/Login';
import { useState } from 'react';

function App() {
  const initializeState = JSON.parse(localStorage.getItem("user"));
  const [user, setUser] = useState(initializeState)

  const handleUser = (loginData) => {
    setUser(loginData)
  }

  const logoutUser = () => {
    setUser(null)
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={user ? <Home user={user} logoutUser={logoutUser}/> : <Navigate to='/login'/>} />   
        <Route path="/posts/new" element={user ? <NewPost user={user}/> : <Navigate to='/login'/>} />   
        <Route path="/posts/:id" element={user ? <Post user={user}/> : <Navigate to='/login'/>} />  
        <Route path="/login" element={<Login user={user} handleUser={handleUser}/>} />              
      </Routes>
    </BrowserRouter>
  )
}

export default App
