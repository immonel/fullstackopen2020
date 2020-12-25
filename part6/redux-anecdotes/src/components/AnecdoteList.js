import React from 'react'
import { connect } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer'
import { notify } from '../reducers/notificationReducer'

const AnecdoteList = (props) => {
  const anecdotes = props.anecdotes

  const vote = (id) => {
    console.log('vote', id)
    props.addVote(id)
    props.notify('Added vote!')
  }

  return (
    <div id='anecdotes'>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

const mapStateToProps = (state) => ({
  anecdotes: state.anecdotes.filter(anecdote => 
    anecdote.content.toLowerCase().includes(state.filter.toLowerCase())
  )
})

const mapDispatchToProps = {
  addVote,
  notify
}

const ConnectedAnecdoteList = connect(
  mapStateToProps, 
  mapDispatchToProps
)(AnecdoteList)

export default ConnectedAnecdoteList