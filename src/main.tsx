import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import AppRoutes from './routers/index.tsx'
import { BrowserRouter as Router } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext.tsx'
import { CategoryProvider } from './contexts/CategoryContext.tsx'

createRoot(document.getElementById('root')!).render(
  <Router>
    <AuthProvider>
      <CategoryProvider>
        <AppRoutes />
      </CategoryProvider>
    </AuthProvider>
  </Router>
)
