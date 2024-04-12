import axios from 'axios'
import exp from 'constants'

const request = axios.create({})

request.interceptors.response.use(
  response => {
    return response
  },
  error => {
    return Promise.reject(error.message)
  }
)

export default request
