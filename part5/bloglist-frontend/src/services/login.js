import axios from 'axios'
const baseUrl = '/api/login'

const login = async (username, password) => {
  const loginData = {
    username,
    password
  }

  const response = await axios.post(baseUrl, loginData)
  return response.data
}

export default { login }