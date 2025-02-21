import axios from 'axios'

const apiClient = axios.create({
  baseURL: 'https://api-g2.nedytech.com/',
  headers: {
    'Content-Type': 'application/json'
  }
})

// Tự động thêm accessToken vào request nếu có
apiClient.interceptors.request.use((config) => {
  const token = sessionStorage.getItem('accessToken')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export default apiClient
