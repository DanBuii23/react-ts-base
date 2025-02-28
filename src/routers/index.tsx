import { Navigate, Outlet, Route, Routes } from 'react-router-dom'
import HomePage from '../components/pages/homepage'
import Login from '../components/pages/login'
import Sidebar from '../components/templates/Sidebar'
import AppHeader from '../components/templates/Header'
import AppFooter from '../components/templates/Footer'
import ProductList from '../components/templates/Content/productList'
import { ProtectedRoute, useAuth } from '../contexts/AuthContext'
import ProductDetail from '../components/templates/Content/productDetail'
import AboutPage from '../components/pages/about'
import TagsList from '../components/templates/Tags'

// Layout chính có kiểm tra đăng nhập
const LayoutHome = () => {
  const { accessToken } = useAuth()
  if (!accessToken) return <Navigate to='/login' replace />
  return (
    <div className='flex flex-col min-h-screen'>
      <div>
        <AppHeader />
        <div className='container mx-auto flex'>
          <Sidebar />
          <div className='flex-1 p-4'>
            <Outlet />
          </div>
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
      <Route element={<ProtectedRoute />}>
        <Route element={<LayoutHome />}>
          <Route path='/' element={<HomePage />} />
          <Route path='/about' element={<AboutPage />} />
          <Route path='/categories/:id' element={<ProductList />} />
          <Route path='/categories/:id/products/:productId' element={<ProductDetail />} />
          <Route path='/tags' element={<TagsList />} />
        </Route>
      </Route>
    </Routes>
  )
}

export default AppRoutes
