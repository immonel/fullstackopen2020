import anecdoteService from "../services/anecdotes"

const getId = () => (100000 * Math.random()).toFixed(0)


export const asObject = (anecdote) => ({
  content: anecdote,
  id: getId(),
  votes: 0
})

export const addVote = (id) => (
  async dispatch => {
    const anecdote = 
      (await anecdoteService.getAll())
        .find(a => a.id === id)
    
    if (anecdote) {
      anecdote.votes += 1
      await anecdoteService.update(anecdote)
    }
    dispatch({
      type: 'VOTE',
      data: { id }
    })
  }
)

export const createAnecdote = (content) => (
  async dispatch => {
    const anecdote = await anecdoteService.createNew(asObject(content))
    dispatch({
      type: 'NEW',
      data: anecdote
    })
  }
)

export const initAnecdotes = () => (
  async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'SET',
      data: anecdotes
    })
})


const reducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)

  switch (action.type) {

    case 'VOTE':
      return state
        .map(anecdote =>
          anecdote.id === action.data.id
            ? ({ ...anecdote, votes: anecdote.votes + 1 })
            : anecdote
        )
        .sort((a, b) => b.votes - a.votes)

    case 'NEW':
      return [...state, action.data]

    case 'SET':
      return action.data.sort((a, b) => b.votes - a.votes)

    default:
      return state
  }
}

export default reducer