import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [message, setMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs.sort((a,b) => (a.likes < b.likes) ? 1 : -1))
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

  const addBlog = (blogObject) => {
    blogFormRef.current.toggleVisibility()
    blogService
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
      })
  }

  const addLike = async (blogObject) => {
    const updatedBlog = await blogService.update(blogObject)
    setBlogs(blogs.map(blog =>
      blog.id === updatedBlog.id ? {...blog, likes: updatedBlog.likes} : blog)
    )
  }

  const deleteBlog = async (blogObject) => {
    const confirm = window.confirm(`Remove blog ${blogObject.title} by ${blogObject.author}?`)
    if (confirm) {
      await blogService.remove(blogObject.id)
      setBlogs(blogs.filter(blog => blog.id !== blogObject.id))
    }
  }

  return (
    <div>
      <h1>Blogs</h1>
      <Notification message={message} />
      {user && <p>{user.name} logged in <button onClick={handleLogout} >Logout</button></p>}
      {user === null ? <LoginForm username={username} setUsername={setUsername} password={password} setPassword={setPassword} handleLogin={handleLogin} />
      : <div>
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} updateLikes={addLike} deleteBlog={deleteBlog} user={user} />
          )}
          <Togglable buttonLabel='Create a new blog' ref={blogFormRef}>
            <BlogForm setMessage={setMessage} createBlog={addBlog} />
          </Togglable>
        </div>
      }
    </div>
  )
}

export default App