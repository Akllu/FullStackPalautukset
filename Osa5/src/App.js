import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [message, setMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      blogService.setToken(user.token)
      setUser(user)
    }
  }, [])

  const handleLogin = async (e) => {
    e.preventDefault()

    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      setMessage({ type: 'success', content: `Welcome ${user.name}!` })
      setTimeout(() => {
        setMessage(null)
      }, 5000)

    } catch (exception) {
      setMessage({ type: 'error', content: 'Wrong username or password!' })
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedUser')
    blogService.setToken(null)
    setUser(null)
    setMessage({ type: 'success', content: 'You logged out!' })
    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }

  return (
    <div>
      <h1>Blogs</h1>
      <Notification message={message} />
      {user && <p>{user.name} logged in <button onClick={handleLogout} >Logout</button></p>}
      {user === null ? <LoginForm username={username} setUsername={setUsername} password={password} setPassword={setPassword} handleLogin={handleLogin} />
      : <div>
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} />
          )}
          <div><BlogForm setMessage={setMessage} blogs={blogs} setBlogs={setBlogs} /></div>
        </div>
      }
    </div>
  )
}

export default App