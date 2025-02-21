import { message } from 'antd'
import { createContext, useContext, ReactNode, useState } from 'react'
import { Navigate, Outlet, useNavigate } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import apiClient from '../components/Api/ApiClient'

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

// Hàm gọi API đăng nhập
const loginApi = async (email: string, password: string) => {
  const response = await apiClient.post('api/v1/cms/auths/login', { email, password })
  return response.data
}

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [accessToken, setAccessToken] = useState<string | null>(sessionStorage.getItem('accessToken'))
  const navigate = useNavigate()

  const mutation = useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) => loginApi(email, password),
    onSuccess: (data) => {
      sessionStorage.setItem('accessToken', data.data.accessToken)
      setAccessToken(data.data.accessToken)

      message.success('Đăng nhập thành công!')
      navigate('/')
    },
    onError: (error: { response?: { data?: { message?: string } } }) => {
      message.error((error.response?.data?.message as string) || 'Đăng nhập thất bại!')
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
