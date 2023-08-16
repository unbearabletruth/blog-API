import './App.css'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Post from './pages/Post';
import Login from './pages/Login';
import { useAuthContext } from './hooks/useAuthContext';

function App() {
  const {user} = useAuthContext()

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={user ? <Home /> : <Navigate to='/login'/>} />    
        <Route path="/posts/:id" element={user ? <Post /> : <Navigate to='/login'/>} />  
        <Route path="/login" element={<Login />} />              
      </Routes>
    </BrowserRouter>
  )
}

export default App
