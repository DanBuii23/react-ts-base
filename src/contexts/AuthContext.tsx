import { message } from 'antd'
import { createContext, useContext, ReactNode, useState } from 'react'
import { Navigate, Outlet, useNavigate } from 'react-router-dom'

interface AuthContextType {
  accessToken: string
  user: string | null
  loading: boolean
  login: (username: string, password: string) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const ProtectedRoute = () => {
  const accessToken = localStorage.getItem('accessToken')

  return accessToken ? <Outlet /> : <Navigate to='/login' />
}

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [accessToken, setAccessToken] = useState<string>(localStorage.getItem('accessToken') || '')
  const [user, setUser] = useState<string | null>(localStorage.getItem('user') || null)
  const [loading, setLoading] = useState<boolean>(false)
  const navigate = useNavigate()

  const login = (username: string, password: string) => {
    setLoading(true)
    setTimeout(() => {
      if (username === 'ad' && password === '1') {
        const token = 'dummy-token' // Giả lập token
        localStorage.setItem('accessToken', token)
        localStorage.setItem('user', username)
        setAccessToken(token)
        setUser(username)
        message.success('Đăng nhập thành công!')
        navigate('/')
      } else {
        message.error('Sai tài khoản hoặc mật khẩu!')
      }
      setLoading(false)
    }, 1000) // Giả lập delay API
  }

  const logout = () => {
    localStorage.removeItem('accessToken')
    localStorage.removeItem('user')
    setAccessToken('')
    setUser(null)
    message.success('Đăng xuất thành công!')
    navigate('/login', { replace: true })
  }

  return <AuthContext.Provider value={{ accessToken, user, loading, login, logout }}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
