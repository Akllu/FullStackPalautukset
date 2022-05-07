import React from 'react'
import { useNavigate } from "react-router-dom"
import  { useField } from '../hooks'

const CreateNew = (props) => {
  const navigate = useNavigate()
  const content = useField('content')
  const author = useField('author')
  const info = useField('info')

  const handleSubmit = (e) => {
    e.preventDefault()
    props.addNew({
      content: content.input.value,
      author: author.input.value,
      info: info.input.value,
      votes: 0
    })
    props.setNotification(`a new anecdote ${content.input.value} created!`)
    setTimeout(() => {
      props.setNotification('')
    }, 5000)
    navigate('/anecdotes')
  }

  const handleReset = () => {
    content.resetField()
    author.resetField()
    info.resetField()
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input {...content.input} />
        </div>
        <div>
          author
          <input {...author.input} />
        </div>
        <div>
          url for more info
          <input {...info.input} />
        </div>
        <button type="submit">create</button>
        <button type="button" style={{ marginLeft: 5 }} onClick={handleReset}>reset</button>
      </form>
    </div>
  )
}

export default CreateNew