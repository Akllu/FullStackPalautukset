import React, { useState } from 'react'
import blogService from '../services/blogs'

const BlogForm = ({ setMessage, blogs, setBlogs }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [likes, setLikes] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    const blog = {
      title: title,
      author: author,
      url: url,
      likes: likes
    }

    try {
      await blogService.create(blog)
      setMessage({ type: 'success', content: `A new blog ${title} by ${author} added!` })
      setTimeout(() => {
        setMessage(null)
      }, 5000)
      setBlogs(blogs.concat(blog))
      setTitle('')
      setAuthor('')
      setUrl('')
      setLikes('')
      
    } catch (exception) {
      setMessage({ type: 'error', content: 'Something went wrong!' })
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  return (
    <div>
      <h2>Create a new blog</h2>
      <form onSubmit={handleSubmit}>
        <div>
          Title:
          <input type='text' value={title} name='Title' onChange={({ target }) => setTitle(target.value) } />
        </div>
        <div>
          Author:
          <input type='text' value={author} name='Author' onChange={({ target }) => setAuthor(target.value)} />
        </div>
        <div>
          URL:
          <input type='text' value={url} name='Url' onChange={({ target }) => setUrl(target.value)} />
        </div>
        <div>
          Likes:
          <input type='number' value={likes} name='Likes' onChange={({ target }) => setLikes(target.value)} />
        </div>
        <button type='submit' >Submit</button>
      </form>
    </div>
  )
}

export default BlogForm
