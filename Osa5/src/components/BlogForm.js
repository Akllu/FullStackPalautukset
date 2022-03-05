import React, { useState } from 'react'

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
