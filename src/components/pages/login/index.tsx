import React, { useState } from 'react'
import { Form, Input, Button, message } from 'antd'
import { Navigate, useNavigate } from 'react-router-dom'
import { useAuth } from '../../../contexts/AuthContext'
import imgLogin from '../../../../public/images/login.jpg'
import icGG from '../../../../public/images/icGG.jpg'
import icFB from '../../../../public/images/icFB.jpg'
import bgtech from '../../../../public/images/bgtechno.jpg'

const Login = () => {
  const { login, accessToken } = useAuth()
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  if (accessToken) return <Navigate to='/' replace />

  const onFinish = ({ username, password }: { username: string; password: string }) => {
    setLoading(true)
    if (username === 'ad' && password === '1') {
      login(username, password)
      message.success('Đăng nhập thành công!')
      navigate('/', { replace: true })
    } else {
      message.error('Sai tài khoản hoặc mật khẩu!')
    }
    setLoading(false)
  }

  return (
    <div className='bg-cover bg-center h-screen' style={{ backgroundImage: `url(${bgtech})` }}>
      <div className='container mx-auto flex items-center justify-center h-screen px-8'>
        <div className='w-full w-[60%] max-w-md p-8 bg-white shadow-xl rounded-lg'>
          <h2 className='text-3xl font-bold text-center m-3 text-gray-800'>Login</h2>
          <Form name='login' initialValues={{ remember: true }} onFinish={onFinish} layout='vertical'>
            <Form.Item label='Tài Khoản' name='username' rules={[{ required: true, message: 'Mời nhập tài khoản!' }]}>
              <Input className='p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500' />
            </Form.Item>
            <Form.Item label='Mật khẩu' name='password' rules={[{ required: true, message: 'Mời nhập mật khẩu!' }]}>
              <Input.Password className='p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500' />
            </Form.Item>

            <div className='flex justify-between text-sm my-4'>
              <a href='#' className='text-blue-500 hover:underline'>
                Quên mật khẩu?
              </a>
            </div>

            <Button type='primary' htmlType='submit' block loading={loading} className='py-3 text-lg shadow-lg'>
              Login
            </Button>
          </Form>

          {/* Đăng nhập bằng MXH */}
          <div className='flex gap-4 my-4'>
            <Button block className='flex items-center justify-center gap-2 border shadow-md p-3 hover:bg-gray-100'>
              <img src={icFB} alt='facebook' className='h-6' />
              <span>Login with Facebook</span>
            </Button>
            <Button block className='flex items-center justify-center gap-2 border shadow-md p-3 hover:bg-gray-100'>
              <img src={icGG} alt='google' className='h-6' />
              <span>Login with Google</span>
            </Button>
          </div>

          <h1 className='text-center text-gray-600'>
            Bạn chưa có tài khoản?{' '}
            <a href='#' className='text-blue-500 hover:underline'>
              Đăng ký
            </a>
          </h1>
        </div>

        <div className='flex w-1/2 justify-center'>
          <img src={imgLogin} alt='login' className='object-contain rounded-lg shadow-lg scale-[1.4]' />
        </div>
      </div>
    </div>
  )
}

export default Login
