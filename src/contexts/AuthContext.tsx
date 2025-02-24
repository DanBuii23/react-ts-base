import { createContext, useContext, ReactNode } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useAuthHook } from '../components/hooks/useAuthHook'

interface AuthContextType {
  accessToken: string | null
  loading: boolean
  login: (email: string, password: string) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const auth = useAuthHook()

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const ProtectedRoute = () => {
  const { accessToken } = useAuth()
  return accessToken ? <Outlet /> : <Navigate to='/login' replace />
}
