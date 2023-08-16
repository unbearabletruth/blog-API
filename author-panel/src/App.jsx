import { useState } from 'react'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
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
