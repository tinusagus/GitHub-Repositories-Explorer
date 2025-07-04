import axios from 'axios'

const axiosClient = axios.create({
  baseURL: 'https://api.github.com',
  headers: {
    Accept: 'application/vnd.github.v3+json',
  },
  timeout: 10000,
})

export default axiosClient
