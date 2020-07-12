import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array.apply(null, new Array(anecdotes.length)).map(Number.prototype.valueOf,0))

  const randInt = (until) => Math.floor(Math.random() * until)
  const maxVotes = () => votes.indexOf(Math.max(...votes))

  const vote = (index) => {
    const newVotes = [ ...votes ]
    newVotes[index] += 1
    setVotes(newVotes)
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <Anecdote text={anecdotes[selected]} votes={votes[selected]} />
      <button onClick={() => vote(selected)}>vote</button>
      <button onClick={() => setSelected(randInt(anecdotes.length))}>next anecdote</button>
      <h1>Anecdote with most votes</h1>
      <Anecdote text={anecdotes[maxVotes()]} votes={votes[maxVotes()]} />
    </div>
  )
}

const Anecdote = ({ text, votes }) => (
  <div>
    <p>
      {text}<br />
      has {votes} votes
    </p>
  </div>
)

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)
