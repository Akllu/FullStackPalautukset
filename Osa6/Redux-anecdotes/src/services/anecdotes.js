import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createNew = async (anecdote) => {
  const object = {
    content: anecdote,
    votes: 0 
  }
  const response = await axios.post(baseUrl, object)
  return response.data
}

const addVote = async (anecdote) => {
  const anecdoteID = anecdote.id
  const votedAnecdote = {...anecdote, votes: anecdote.votes + 1}
  const response = await axios.put(`${baseUrl}/${anecdoteID}`, votedAnecdote)
  return response.data
}

const object = {
  getAll,
  createNew,
  addVote
}

export default object