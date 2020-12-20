import axios from 'axios'
const baseUrl = '/api/blogs'

let token

const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async (title, author, url) => {
  const config = { headers: { Authorization: token } }
  const data = { title, author, url }

  const response = await axios.post(baseUrl, data, config)
  return response.data
}

const deleteBlog = async (blog) => {
  const config = { headers: { Authorization: token } }
  try {
    await axios.delete(`${baseUrl}/${blog.id}`, config)
  } catch (error) {
    console.error('Failed to delete blog', error.message)
  }
}

const addLike = async (blog) => {
  const config = { headers: { Authorization: token } }
  const userId = blog.user.id
  try {
    await axios.put(`${baseUrl}/${blog.id}`, { ...blog, user: userId, likes: blog.likes + 1 }, config)
  } catch (error) {
    console.error('Adding like failed', error.message)
  }
}

export default { getAll, create, setToken, addLike, deleteBlog }