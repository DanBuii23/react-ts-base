import apiClient from '../apis/ApiClient'
import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { message } from 'antd'

interface LoginParams {
  email: string
  password: string
}

export const loginApi = async ({ email, password }: LoginParams) => {
  const response = await apiClient.post('/api/v1/cms/auths/login', { email, password })
  return response.data
}

export const useAuthApi = () => {
  const [accessToken, setAccessToken] = useState<string | null>(sessionStorage.getItem('accessToken'))
  const navigate = useNavigate()

  const loginMutation = useMutation({
    mutationFn: loginApi,
    onSuccess: (data) => {
      const token = data.data.accessToken
      sessionStorage.setItem('accessToken', token)
      setAccessToken(token)
      message.success('Đăng nhập thành công!')
      navigate('/')
    },
    onError: (error: { response?: { data?: { message?: string } } }) => {
      message.error(error.response?.data?.message || 'Đăng nhập thất bại!')
    }
  })

  const logout = () => {
    sessionStorage.removeItem('accessToken')
    setAccessToken(null)
    message.success('Đăng xuất thành công!')
    navigate('/login', { replace: true })
  }

  return {
    accessToken,
    loading: loginMutation.isPending,
    login: (email: string, password: string) => loginMutation.mutate({ email, password }),
    logout
  }
}
