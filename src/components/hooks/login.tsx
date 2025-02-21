import apiClient from '../apis/ApiClient'

interface LoginParams {
  email: string
  password: string
}

export const loginApi = async ({ email, password }: LoginParams) => {
  const response = await apiClient.post('/api/v1/cms/auths/login', { email, password })
  return response.data
}
