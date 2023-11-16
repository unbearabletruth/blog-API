import { CommentContext } from "../context/CommentContext";
import { useContext } from "react";

export function useCommentContext() {
  const context = useContext(CommentContext)
  if (!context) {
    throw Error('must be used inside CommentContextProvider')
  }
  return context
}