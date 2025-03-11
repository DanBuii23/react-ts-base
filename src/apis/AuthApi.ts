import { API_VERSION } from '../constants'
import apiClient from './ApiClient'

interface LoginParams {
  email: string
  password: string
}

export const loginApi = async ({ email, password }: LoginParams) => {
  const response = await apiClient.post(`${API_VERSION}/auths/login`, { email, password })
  return response.data
}
