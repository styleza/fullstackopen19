import axios from 'axios'
import config from '../config'
const getAll = async (token) => {
  const res = await axios.get(`${config.api}/api/blogs`, {headers:{Authorization: `Bearer ${token}`}})
  return res.data
}

const post = async (blog, token) => {
  const res = await axios.post(
      `${config.api}/api/blogs`,
      blog,
      {headers:{Authorization: `Bearer ${token}`}})
    return res.data
}

export  { getAll, post }