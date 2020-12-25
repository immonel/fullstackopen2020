import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => (await axios.get(baseUrl)).data

const createNew = async (anecdote) => {
  const response = await axios.post(baseUrl, anecdote)
  return response.data
}

const update = async (anecdote) => {
  const id = anecdote.id
  const response = await axios.put(`${baseUrl}/${id}`, anecdote)
  return response.data
}

export default { getAll, createNew, update }