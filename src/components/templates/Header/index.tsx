import React from 'react'
import { Layout } from 'antd'
import { Link, NavLink } from 'react-router-dom'
import Search from 'antd/es/transfer/search'
import { useAuth } from '../../../contexts/AuthContext'
import imglogo from '../../../../public/images/login.jpg'
import imgAvaUser from '../../../../public/images/j97.jpg'
import { MButton } from '../../atoms'
const { Header } = Layout
const AppHeader = () => {
  const { logout } = useAuth()
  return (
    <Header className='mx-auto flex justify-between items-center bg-sky-900 shadow-md px-6'>
      <div className='basis-1/3 flex gap-10 justify-center '>
        <Link className='flex items-center gap-2 text-white text-2xl font-bold' to={'/'}>
          <img src={imglogo} alt='Techno' className='h-14 rounded-md' />
          Techno
        </Link>
      </div>
      <div className='w-[200px]'>
        <Search placeholder='Tìm kiếm' />
      </div>
      <div className='basis-1/2 flex gap-10 items-center'>
        {['Home', 'Product', 'About', 'Contact'].map((item) => (
          <NavLink
            key={item}
            to={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
            className={({ isActive }) => `text-white ${isActive ? 'font-bold' : ''}`}
          >
            {item}
          </NavLink>
        ))}
        <div className='text-white flex gap-4 items-center'>
          <MButton type='link' className='font-bold flex gap-2 items-center hover:text-sky-400'>
            <img src={imgAvaUser} alt='user' className='rounded-full object-contain h-10' />
            Admin
          </MButton>
          <MButton type='default' onClick={logout} className='font-bold'>
            Đăng xuất
          </MButton>
        </div>
      </div>
    </Header>
  )
}
export default AppHeader
