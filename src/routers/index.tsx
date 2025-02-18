import { Navigate, Outlet, Route, Routes } from 'react-router-dom'
import HomePage from '../components/pages/homepage'
import Login from '../components/pages/login'
import Sidebar from '../components/organisms/Sidebar'
import AppHeader from '../components/organisms/Header'
import AppFooter from '../components/organisms/Footer'
import ProductList from '../components/organisms/Content'

const Layout = () => {
  return (
    <div>
      <AppHeader />
      <div className='flex gap-2'>
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

      <Route element={<Layout />}>
        <Route path='/' element={<HomePage />} />
        <Route path='/categories/:id' element={<ProductList />} />
      </Route>
    </Routes>
  )
}

export default AppRoutes
