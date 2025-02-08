import axios from 'axios'
import Cookies from 'js-cookie'

axios.defaults.baseURL = 'http://localhost:3000/api'

//req攔截器
axios.interceptors.request.use(
  (config) => {
    //帶上Token
    const token = Cookies.get('access_token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

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
