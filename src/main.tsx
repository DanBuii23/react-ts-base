import { createRoot } from 'react-dom/client'
import './index.css'
import AppRoutes from './routers/index.tsx'
import { BrowserRouter as Router } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext.tsx'
import { CategoryProvider } from './contexts/CategoryContext.tsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
  <Router>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <CategoryProvider>
          <AppRoutes />
        </CategoryProvider>
      </AuthProvider>
    </QueryClientProvider>
  </Router>
)
