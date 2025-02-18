import { Navigate, Outlet, Route, Routes } from 'react-router-dom'
import HomePage from '../components/pages/homepage'
import Login from '../components/pages/login'
import Sidebar from '../components/organisms/Sidebar'
import AppHeader from '../components/organisms/Header'
import AppFooter from '../components/organisms/Footer'
import ProductList from '../components/organisms/Content'
import { useAuth } from '../contexts/AuthContext'

const ProtectedRoute = () => {
  const { accessToken } = useAuth() // Kiểm tra người dùng đã đăng nhập hay chưa (kiểm tra accessToken)

  // Nếu không có accessToken, tức là chưa đăng nhập thì chuyển hướng tới trang login
  if (!accessToken) {
    return <Navigate to='/login' replace />
  }

  // Nếu có accessToken, cho phép người dùng truy cập vào route cần bảo vệ
  return <Outlet />
}

const Layout = () => {
  return (
    <div>
      <AppHeader />
      <div className='flex'>
        <Sidebar />
        <Outlet />
      </div>
      <AppFooter />
    </div>
  )
}

function AppRoutes() {
  return (
    <Routes>
      <Route path='/login' element={<Login />} />
      <Route element={<ProtectedRoute />}>
        <Route element={<Layout />}>
          <Route path='/' element={<HomePage />} />
          <Route path='/categories/:id' element={<ProductList />} />
        </Route>
      </Route>
    </Routes>
  )
}

export default AppRoutes
