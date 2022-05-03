import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification, removeNotification } from '../reducers/notificationReducer'

const AnecdoteVotes = ({ anecdote, vote }) => {
  return (
    <div>
    has {anecdote.votes}
    <button onClick={() => vote(anecdote)}>vote</button>
  </div>
  )
}

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(({ anecdotes, filter }) => {
    return filter === ''
      ? anecdotes
      : anecdotes.filter(a => a.content.toLowerCase().includes(filter.toLowerCase())) 
  })

  const vote = (anecdote) => {
    dispatch(voteAnecdote(anecdote.id))
    dispatch(setNotification({
      message: `you voted ${anecdote.content}`,
      type: 'normal'
    }))
    setTimeout(() => {
      dispatch(removeNotification())
    }, 5000)
  }

  return (
    <div>
      {anecdotes
        .map(anecdote =>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <AnecdoteVotes anecdote={anecdote} vote={vote} />
          </div>
        )}
    </div>
  )
}

export default AnecdoteList