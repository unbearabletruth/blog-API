import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css'
import Home from './pages/Home.jsx';
import Post from './pages/Post';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />   
        <Route path="/posts/:id" element={<Post />} />                       
      </Routes>
    </BrowserRouter>
  )
}

export default App
