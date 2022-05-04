import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

// const getId = () => (100000 * Math.random()).toFixed(0)

const initialState = []

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState,
  reducers: {
    addAnecdote(state, action) {
      state.push(action.payload)
    },
    voteAnecdote(state, action) {
      const changedAnecdote = action.payload
      return state
        .map(a => a.id !== changedAnecdote.id ? a : changedAnecdote)
        .sort((a, b) => a.votes > b.votes ? -1 : 1)
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  }
})

export const { addAnecdote, voteAnecdote, setAnecdotes } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = anecdote => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(anecdote)
    dispatch(addAnecdote(newAnecdote))
  }
}

export const addVote = anecdote => {
  return async dispatch => {
    const votedAnecdote = await anecdoteService.addVote(anecdote)
    dispatch(voteAnecdote(votedAnecdote))
  }
}

export default anecdoteSlice.reducer