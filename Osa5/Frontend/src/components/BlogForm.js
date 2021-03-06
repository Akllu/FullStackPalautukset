import React, { useState } from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({ setMessage, createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [likes, setLikes] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    createBlog({
      title: title,
      author: author,
      url: url,
      likes: likes
    })

    setMessage({ type: 'success', content: `A new blog ${title} by ${author} added!` })
    setTimeout(() => {
      setMessage(null)
    }, 5000)
    setTitle('')
    setAuthor('')
    setUrl('')
    setLikes('')
  }

  return (
    <div>
      <h2>Create a new blog</h2>
      <form onSubmit={handleSubmit}>
        <div>
          Title:
          <input
            type='text'
            value={title}
            name='Title'
            onChange={({ target }) => setTitle(target.value) }
            placeholder='Enter a title'
            id='title-input'
          />
        </div>
        <div>
          Author:
          <input
            type='text'
            value={author}
            name='Author'
            onChange={({ target }) => setAuthor(target.value)}
            placeholder='Enter a author'
            id='author-input'
          />
        </div>
        <div>
          URL:
          <input
            type='text'
            value={url}
            name='Url'
            onChange={({ target }) => setUrl(target.value)}
            placeholder='Enter a URL'
            id='url-input'
          />
        </div>
        <div>
          Likes:
          <input
            type='number'
            value={likes}
            name='Likes'
            onChange={({ target }) => setLikes(target.value)}
            placeholder='Enter likes'
            id='likes-input'
          />
        </div>
        <button type='submit' >Submit</button>
      </form>
    </div>
  )
}

BlogForm.propTypes = {
  setMessage: PropTypes.func.isRequired,
  createBlog: PropTypes.func.isRequired
}

export default BlogForm
