import { Navigate, Outlet, Route, Routes } from 'react-router-dom'
import HomePage from '../components/pages/homepage'
import Login from '../components/pages/login'
import Sidebar from '../components/organisms/Sidebar'
import AppHeader from '../components/organisms/Header'
import AppFooter from '../components/organisms/Footer'
import ProductList from '../components/organisms/Content'
import { useAuth } from '../contexts/AuthContext'

// Layout chính có kiểm tra đăng nhập
const Layout = () => {
  const { accessToken } = useAuth()

  if (!accessToken) return <Navigate to='/login' replace />

  return (
    <div>
      <AppHeader />
      <div className='flex'>
        <Sidebar />
        <div className='flex-1 p-4'>
          <Outlet />
        </div>
      </div>
      <AppFooter />
    </div>
  )
}

// Khai báo Router
const AppRoutes = () => {
  return (
    <Routes>
      <Route path='/login' element={<Login />} />
      <Route element={<Layout />}>
        <Route path='/' element={<HomePage />} />
        <Route path='/categories/:id' element={<ProductList />} />
      </Route>
    </Routes>
  )
}

export default AppRoutes
