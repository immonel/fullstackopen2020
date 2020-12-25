import React from 'react'
import { connect } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { notify } from '../reducers/notificationReducer'

const AnecdoteForm = (props) => {

  const addAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    props.createAnecdote(content)
    props.notify('Anecdote added!')
  }

  return (
    <form onSubmit={addAnecdote}>
      <h2>create new</h2>
      <div><input name='anecdote' /></div>
      <button type='submit'>create</button>
    </form>
  )
}

const mapDispatchToProps = {
  createAnecdote,
  notify
}

const ConnectedAnecdoteForm = connect(
  null,
  mapDispatchToProps
)(AnecdoteForm)

export default ConnectedAnecdoteForm