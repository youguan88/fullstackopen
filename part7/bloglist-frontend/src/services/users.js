import axios from 'axios'
const baseUrl = '/api/users'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const getUser = async (userID) => {
  const response = await axios.get(`${baseUrl}/${userID}`)
  return response.data
}

export default { getAll, getUser }
