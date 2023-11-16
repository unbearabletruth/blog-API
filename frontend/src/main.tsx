import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { CommentContextProvider } from './context/CommentContext.jsx';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <CommentContextProvider>
      <App />
    </CommentContextProvider>
  </React.StrictMode>,
)
