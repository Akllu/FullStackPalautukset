import React, { useState } from 'react'

const Button = (props) => {
  return (
    <button onClick={props.handleClick}>
     {props.text}
    </button>
  )
}

const Display = (props) => {
  return (
    <div>
      <h1> Anecdote of the day </h1> 
      {props.anecdote} 
      <p> This anecdote has {props.votes} votes </p>
      <h2> Anecdote with most votes</h2>
      {props.mostVoted}
    </div>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'The goal of Computer Science is to build something that will last at least until we have finished building it.',
    'Why do we never have time to do it right, but always have time to do it over?',
    'A good way to stay flexible is to write less code.',
    'Always code as if the person who ends up maintaining your code will be a violent psychopath who knows where you live.'
  ]
   
  const [selected, nextClicked] = useState(0)
  const [array, voteClicked] = useState(new Uint8Array(10))

  const mostVotes = Math.max(...array)
  const maxIndex = array.indexOf(mostVotes)

  const random = () => Math.floor(Math.random() * 10)
    
  const selectNext = () => nextClicked(random)        

  const selectVote = () => {
    const copy = [...array]
    copy[selected] += 1
    voteClicked(copy)
  }
  return (
    <div>
      <Display anecdote={anecdotes[selected]} votes={array[selected]} mostVoted={anecdotes[maxIndex]} />
      <Button handleClick={selectNext} text={"Next anecdote"} />   
      <Button handleClick={selectVote} text={"Vote"} />
    </div>
  )
}

export default App