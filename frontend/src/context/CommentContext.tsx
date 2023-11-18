import { createContext, useReducer } from "react";

enum ActionType {
  set = 'set_comments',
  create = 'create_comment',
}

export type CommentTypes = {
  author: string
  text: string
  post: string
  timestamp: string
  _id: string
}

type State = {
  comments: CommentTypes | CommentTypes[]
}

type Action = {
  type: ActionType
  payload: CommentTypes | CommentTypes[]
}

type Props = {
  children?: React.ReactNode
}

export const CommentContext = createContext({})

export const commentReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'set_comments':
      console.log(action.payload)
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

export function CommentContextProvider({ children }: Props) {
  const [state, dispatch] = useReducer(commentReducer, {
    comments: []
  })

  return (
    <CommentContext.Provider value={{...state, dispatch}}>
      { children }
    </CommentContext.Provider>
  )

}