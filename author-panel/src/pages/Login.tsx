import { useState } from "react"
import '../assets/styles/Login.css'
import { useNavigate } from "react-router-dom";
import { User } from "../App";

type LoginProps = {
  handleUser: (loginData: User) => void
}

type LoginData = {
  username: string
  password: string
}

function Login({handleUser}: LoginProps) {
  let navigate = useNavigate();  
  const [error, setError] = useState(null) 
  const [isLoading, setIsLoading] = useState(false)
  const [loginData, setLoginData] = useState<LoginData>({
    username: '',
    password: ''
  })

  const handleInput = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name] : e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    const login = async (user: User) => {
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
        console.log(json)
        handleUser(json)
        setIsLoading(false)
        navigate('/');
      }
    }

    await login(loginData)
  }

  return (
    <div id="formWrapper">
      <form id="loginForm" onSubmit={handleSubmit}>
        <label htmlFor='username'>Username</label>
        <input type='text' className="formInput" name="username" onChange={handleInput}></input>
        <label htmlFor='password'>Password</label>
        <input type='password' className="formInput" name="password" onChange={handleInput}></input>
        <button disabled={isLoading} className="button">Log in</button>
        {error && <p>{error}</p>}
      </form>
    </div>
  )
}

export default Login