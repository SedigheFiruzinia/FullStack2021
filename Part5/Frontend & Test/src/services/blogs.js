import axios from 'axios'

const baseUrl = '/api/blogs'


let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}


const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const creatBlog = async(newBlog) => {
  const config = {
    headers: { Authorization: token },
  }
  await axios.post(baseUrl,newBlog,config)
  const response = await axios.get(baseUrl)

  return response.data[response.data.length - 1]
}


const updateLikes = async(newBlog, id) => {
  const response = await axios.put(`${baseUrl}/${id}`, newBlog)
  return response.data
}

const deleteBlog = async (id) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.delete(`${baseUrl}/${id}`,config)
  console.log(response.data)
}

export default { getAll, creatBlog , setToken, updateLikes, deleteBlog }