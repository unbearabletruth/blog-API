import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { CommentContextProvider } from './context/CommentContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <CommentContextProvider>
      <App />
    </CommentContextProvider>
  </React.StrictMode>,
)
