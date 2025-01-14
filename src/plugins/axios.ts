import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:3000/api'

axios.interceptors.request.use(
  (config) => {
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.data?.message) {
      console.error(error.response.data.message)
    }
    return Promise.reject(error)
  },
)
