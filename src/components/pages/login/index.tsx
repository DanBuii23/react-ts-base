import React, { useState } from 'react'
import { Form, Input, Button, message } from 'antd'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../../contexts/AuthContext'
import imgLogin from '../../../../public/images/login.jpg'
import icGG from '../../../../public/images/icGG.jpg'
import icFB from '../../../../public/images/icFB.jpg'

const Login = () => {
  const { login } = useAuth()
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate() // Hook để điều hướng

  const onFinish = (values: any) => {
    setLoading(true)
    const { username, password } = values

    // Gọi hàm login từ context
    login(username, password)

    // Kiểm tra nếu đăng nhập thành công
    if (username === 'ad' && password === '1') {
      message.success('Đăng nhập thành công!')
      // Điều hướng đến trang sau sau khi đăng nhập thành công
      navigate('/')
    } else {
      message.error('Mời nhập lại')
    }

    setLoading(false)
  }

  return (
    <div className='container mx-auto flex gap-10 justify-between items-center h-screen'>
      <div className='w-1/2 mx-auto'>
        <h2 className='flex justify-center text-3xl font-bold'>Login</h2>
        <Form name='login' initialValues={{ remember: true }} onFinish={onFinish} layout='vertical'>
          <Form.Item label='Tài Khoản' name='username' rules={[{ required: true, message: 'Mời nhập tài khoản!' }]}>
            <Input />
          </Form.Item>
          <Form.Item label='Mật khẩu' name='password' rules={[{ required: true, message: 'Mời nhập mật khẩu!' }]}>
            <Input.Password />
          </Form.Item>
          <a href='#'>
            <span className='underline underline-offset-1'></span>Quên mật khẩu?
          </a>
          <div className='w-2/3 m-auto mt-5'>
            <Form.Item>
              <Button type='primary' htmlType='submit' block loading={loading}>
                Login
              </Button>
            </Form.Item>
          </div>
        </Form>
        <div className='flex gap-5 justify-between'>
          <div className='flex-1'>
            <Button>
              <img src={icFB} alt='facebook' className='h-6' />
              Login with Facebook
            </Button>
          </div>
          <div className='flex-1'>
            <Button>
              <img src={icGG} alt='google' className='h-6' />
              Login with Google
            </Button>
          </div>
        </div>
        <h1 className='mt-5 text-center'>
          Bạn chưa có tài khoản?{' '}
          <a href='#'>
            <span className='hover:text-blue-500'>Đăng ký</span>
          </a>
        </h1>
      </div>
      <div className='w-1/2 bg-gray-200 rounded-3xl my-16'>
        <div className='flex justify-center items-center my-auto p-32'>
          <img src={imgLogin} alt='login' className='object-cover rounded-2xl h-[500px]' />
        </div>
      </div>
    </div>
  )
}

export default Login
