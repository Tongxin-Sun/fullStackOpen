import axios from 'axios'
const baseUrl = '/api/blogs'
let token = null

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const create = async newBlog => {
  const config = {
    headers: { Authorization: token }
  }
  const response = await axios.post(baseUrl, newBlog, config)
  return response.data
}

const update = async (updatedBlog, blogId) => {
  const config = {
    headers: { Authorization: token }
  }
  const response = await axios.put(`${baseUrl}/${blogId}`, updatedBlog, config)
  return response.data
}

export default { getAll, setToken, create, update }