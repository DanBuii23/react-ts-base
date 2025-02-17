import { createContext, useContext, ReactNode, useState } from 'react'

interface AuthContextType {
  accessToken: string
  setAccessToken: (token: string) => void
  user: string | null
  login: (username: string, password: string) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [accessToken, setAccessToken] = useState<string>('')

  const [user, setUser] = useState<string | null>(null)

  const login = (username: string) => {
    // Implement login logic here
    setUser(username)
    setAccessToken('dummy-token') // Replace with actual token
  }

  const logout = () => {
    // Implement logout logic here
    setUser(null)
    setAccessToken('')
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
    throw new Error('useAuthContext must be used within a AuthProvider')
  }
  return context
}
