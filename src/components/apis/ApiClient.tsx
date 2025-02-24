import axios from 'axios'
import { ACCESS_TOKEN } from '../../constants'

const apiClient = axios.create({
  baseURL: 'https://api-g2.nedytech.com/',
  headers: {
    'Content-Type': 'application/json'
  }
})

apiClient.interceptors.request.use((config) => {
  const token = sessionStorage.getItem(ACCESS_TOKEN)
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export default apiClient
