import { useState, useEffect } from 'react'
import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { ACCESS_TOKEN } from '../../constants'
import { login, logout } from '../pages/login/services'

export const useAuthHook = () => {
  const [accessToken, setAccessToken] = useState<string | null>(sessionStorage.getItem(ACCESS_TOKEN))
  const navigate = useNavigate()

  const loginMutation = useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) => login(email, password),
    onSuccess: (token) => {
      if (token) {
        setAccessToken(token)
        sessionStorage.setItem(ACCESS_TOKEN, token)
        navigate('/') // Chuyển trang ngay sau khi đăng nhập
      }
    },
    onError: (error) => {
      console.error('Đăng nhập thất bại:', error)
    }
  })

  const handleLogout = () => {
    logout()
    setAccessToken(null)
    sessionStorage.removeItem(ACCESS_TOKEN)
    navigate('/login', { replace: true })
  }

  // Đảm bảo khi token thay đổi, tự động cập nhật state
  useEffect(() => {
    setAccessToken(sessionStorage.getItem(ACCESS_TOKEN))
  }, [])

  return {
    accessToken,
    loading: loginMutation.isPending,
    login: (email: string, password: string) => loginMutation.mutate({ email, password }),
    logout: handleLogout
  }
}
