import { useState } from "react"
import { useAuthContext } from "./useAuthContext"
import { useNavigate } from "react-router-dom";

export const useLogin = () => {
  const [error, setError] = useState() 
  const [isLoading, setIsLoading] = useState()
  const {dispatch} = useAuthContext()
  let navigate = useNavigate();  

  const login = async (user) => {
    setIsLoading(true)
    setError(null)

    const response = await fetch(`http://localhost:3000/user/login`, {
      method: 'POST',
      body: JSON.stringify(user),
      headers: {
        'Content-type': 'application/json'
      }
    })
    const json = await response.json()
    if (!response.ok) {
      setIsLoading(false)
      setError(json.error)
    }
    if (response.ok) {
      localStorage.setItem('user', JSON.stringify(json))
      dispatch({type: 'login', payload: json})
      setIsLoading(false)
      navigate('/');
    }
  }
  return {login, isLoading, error}
}