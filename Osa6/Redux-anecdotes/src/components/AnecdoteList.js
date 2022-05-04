import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer'
import { addNotification } from '../reducers/notificationReducer'

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

  const vote = async (anecdote) => {
    dispatch(addVote(anecdote))
    dispatch(addNotification(
      // Notification
      {
        message: `you voted ${anecdote.content}`,
        type: 'normal'
      },
      // Time how long the notification is shown (in seconds)
      5
    ))

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