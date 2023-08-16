import { createContext, useReducer } from "react";

export const CommentContext = createContext()

export const commentReducer = (state, action) => {
  switch (action.type) {
    case 'set_comments':
      return {
        comments: action.payload
      }
    case 'create_comment':
      return {
        comments: [action.payload, ...state.comments]
      }
    default:
      return state
  }
}

export function CommentContextProvider({ children }) {
  const [state, dispatch] = useReducer(commentReducer, {
    comments: null
  })

  return (
    <CommentContext.Provider value={{...state, dispatch}}>
      { children }
    </CommentContext.Provider>
  )

}