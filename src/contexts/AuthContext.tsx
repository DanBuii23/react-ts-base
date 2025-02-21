import { message } from 'antd'
import { createContext, useContext, ReactNode, useState } from 'react'
import { Navigate, Outlet, useNavigate } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import { loginApi } from '../components/hooks/login'

interface AuthContextType {
  accessToken: string | null
  loading: boolean
  login: (email: string, password: string) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const ProtectedRoute = () => {
  const { accessToken } = useAuth()
  return accessToken ? <Outlet /> : <Navigate to='/login' />
}
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [accessToken, setAccessToken] = useState<string | null>(sessionStorage.getItem('accessToken'))
  const navigate = useNavigate()

  const mutation = useMutation({
    mutationFn: loginApi,
    onSuccess: (data) => {
      const token = data.data.accessToken
      sessionStorage.setItem('accessToken', token)
      setAccessToken(token) // Cập nhật state để re-render component
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

  return (
    <AuthContext.Provider
      value={{
        accessToken,
        loading: mutation.isPending,
        login: (email: string, password: string) => mutation.mutate({ email, password }),
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
