import { useState } from "react"
import '../assets/styles/Login.css'
import { useLogin } from "../hooks/useLogin"

function Login() {
  const [user, setUser] = useState({
    username: '',
    password: ''
  })
  const {login, error, isLoading} = useLogin()

  const handleInput = (e) => {
    setUser({
      ...user,
      [e.target.name] : e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    await login(user)
  }

  return (
    <div id="formWrapper">
      <form id="loginForm" onSubmit={handleSubmit}>
        <label htmlFor='username'>Username</label>
        <input className="formInput" name="username" onChange={handleInput}></input>
        <label htmlFor='password'>Password</label>
        <input className="formInput" name="password" onChange={handleInput}></input>
        <button disabled={isLoading} className="button">Log in</button>
        {error && <p>{error}</p>}
      </form>
    </div>
  )
}

export default Login