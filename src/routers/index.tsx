import { Route, Routes } from 'react-router-dom'
import HomePage from '../components/pages/homepage'

function AppRoutes() {
  return (
    <Routes>
      <Route path='/' element={<HomePage />} />
    </Routes>
  )
}

export default AppRoutes
