import React from 'react'
import { Button, Layout } from 'antd'

const { Header } = Layout

const AppHeader = () => {
  return (
    <Header className='mx-auto flex justify-between items-center bg-blue-900 shadow-md px-6'>
      {/* Logo */}

      <div className='basis-1/2 flex gap-10 justify-center'>
        <button className='font-black text-white text-2xl items-center'>Techno</button>
      </div>
      <div className='basis-1/2 flex gap-10 items-center'>
        <button className='font-bold text-white hover:text-red-400'>Home</button>
        <button className='font-bold text-white hover:text-red-400'>Product</button>
        <button className='font-bold text-white hover:text-red-400'>About</button>
        <button className='font-bold text-white hover:text-red-400'>Contact</button>
        <div className='font-bold text-white'>
          <Button type='primary'>Đăng nhập</Button>
        </div>
      </div>
    </Header>
  )
}

export default AppHeader
