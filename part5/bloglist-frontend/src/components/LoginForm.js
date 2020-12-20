import React, { useContext, useState } from 'react'
import loginService from '../services/login'
import { NotificationContext } from '../App'

const LoginForm = () => {
  const [ username, setUsername ] = useState('')
  const [ password, setPassword ] = useState('')

  const context = useContext(NotificationContext)

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      console.log(event)
      const user = await loginService.login(username, password)
      window.localStorage.setItem('loggedInUser', JSON.stringify(user))
      window.location.reload()

    } catch (error) {
      context.notify('error', 'Invalid username or password!')

    } finally {
      setUsername('')
      setPassword('')
    }
  }


  return (
    <form className='login-form' onSubmit={handleLogin}>
      <h3>Log in to application</h3>
      Username
      <input id='form-username' type='text' value={username} onChange={({ target }) => setUsername(target.value)} />
      <br />
      Password
      <input id='form-password' type='password' value={password} onChange={({ target }) => setPassword(target.value)} />
      <br />
      <button id='login-button' type='submit'>Login</button>
    </form>
  )
}

export default LoginForm