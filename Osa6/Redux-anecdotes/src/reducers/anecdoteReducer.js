import { createSlice } from '@reduxjs/toolkit'

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
      const anecdote = state.find(a => a.id === action.payload)
      const changedAnecdote = {
        ...anecdote, votes: anecdote.votes + 1
      }
      return state
        .map(a => a.id !== action.payload ? a : changedAnecdote)
        .sort((a, b) => a.votes > b.votes ? -1 : 1)
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  }
})

export const { addAnecdote, voteAnecdote, setAnecdotes } = anecdoteSlice.actions
export default anecdoteSlice.reducer