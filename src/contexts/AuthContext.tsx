import { message } from 'antd'
import { createContext, useContext, ReactNode, useState } from 'react'
import { useNavigate } from 'react-router-dom'

interface AuthContextType {
  accessToken: string
  setAccessToken: (token: string) => void
  user: string | null
  login: (username: string, password: string) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [accessToken, setAccessToken] = useState<string>(localStorage.getItem('accessToken') || '')
  const [user, setUser] = useState<string | null>(localStorage.getItem('user') || null)
  const navigate = useNavigate() // Dùng để điều hướng

  const login = (username: string) => {
    // Giả lập đăng nhập thành công và lưu token
    const token = 'dummy-token' // Thay bằng token thực tế từ API
    localStorage.setItem('accessToken', token)
    localStorage.setItem('user', username)
    setAccessToken(token)
    setUser(username)
    navigate('/') // Chuyển về trang chủ sau khi đăng nhập
  }

  const logout = () => {
    // Xóa token khỏi localStorage và reset state
    localStorage.removeItem('accessToken')
    localStorage.removeItem('user')
    setAccessToken('')
    setUser(null)
    message.success('Đăng xuất thành công!')
    navigate('/login') // Chuyển hướng về trang login
  }

  const value = {
    accessToken,
    setAccessToken,
    user,
    login,
    logout
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
