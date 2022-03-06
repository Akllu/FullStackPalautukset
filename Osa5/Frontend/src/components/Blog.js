import React, { useState } from 'react'

const Blog = ({ blog, updateLikes, deleteBlog, user }) => {
  const [toggleView, setToggleView] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const deleteButton = {
    backgroundColor: '#3b63ff',
    borderRadius: 5,
    marginTop: 5
  }

  const addLike = () => {
    updateLikes({
      user: blog.user.id,
      id: blog.id,
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1
    })
  }

  return (
    <div style={blogStyle} className='testBlogContainer'>
      {blog.title} {blog.author}
      <button style={{ marginLeft: 5 }} onClick={() => setToggleView(!toggleView)}>
        {toggleView ? 'Hide' : 'View'}
      </button>
      {toggleView &&
        <div className='testTogglableContent'>
          {blog.url}
          <div>
            Likes {blog.likes}
            <button id='like-button' style={{ marginLeft: 5 }} onClick={addLike}>Like</button>
          </div>
          {blog.user.name === user.name &&
            <button style={deleteButton} onClick={() => deleteBlog(blog)}>Remove</button>
          }
        </div>
      }
    </div>
  )}

export default Blog