import axios from 'axios'

// Base axios instance
const http = axios.create({
  baseURL: '/api/v2',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor — attach JWT token
http.interceptors.request.use((config) => {
  const token = localStorage.getItem('tk_token')
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`
  }
  return config
})

// Response interceptor — unified error handling
http.interceptors.response.use(
  (response) => {
    const data = response.data
    if (data.code !== undefined && data.code !== 0) {
      return Promise.reject(new Error(data.message || '請求失敗'))
    }
    return data
  },
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('tk_token')
      localStorage.removeItem('tk_user')
      window.location.href = '/'
    }
    return Promise.reject(error)
  }
)

export default http
