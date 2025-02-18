import { Button, Form, Input } from 'antd'
import { Navigate } from 'react-router-dom'
import bgtech from '../../../../public/images/bgtechno.jpg'
import imgLogin from '../../../../public/images/login.jpg' // Ảnh minh họa
import { useAuth } from '../../../contexts/AuthContext'
const Login = () => {
  const { login, accessToken, loading } = useAuth()

  if (accessToken) return <Navigate to='/' replace />

  return (
    <div className='bg-cover bg-center h-screen' style={{ backgroundImage: `url(${bgtech})` }}>
      <div className='container mx-auto flex items-center justify-center h-screen px-8'>
        <div className='w-full max-w-3xl bg-white shadow-xl rounded-lg flex p-8 gap-8'>
          {/* Form đăng nhập */}
          <div className='w-1/2 flex flex-col justify-center'>
            <h2 className='text-3xl font-bold text-center text-gray-800 mb-6'>Login</h2>
            <Form
              name='login'
              initialValues={{ remember: true }}
              onFinish={({ username, password }) => login(username, password)}
              layout='vertical'
            >
              <Form.Item label='Tài khoản' name='username' rules={[{ required: true, message: 'Mời nhập tài khoản!' }]}>
                <Input />
              </Form.Item>
              <Form.Item label='Mật khẩu' name='password' rules={[{ required: true, message: 'Mời nhập mật khẩu!' }]}>
                <Input.Password />
              </Form.Item>

              <div className='flex justify-between text-sm my-4'>
                <a href='#' className='text-blue-500 hover:underline'>
                  Quên mật khẩu?
                </a>
              </div>

              <Button type='primary' htmlType='submit' block loading={loading} className='py-3'>
                Login
              </Button>
            </Form>

            {/* Login bằng MXH */}
            <div className='flex gap-4 my-4'>
              <Button block className='border shadow-md p-3 hover:bg-gray-100'>
                Login với Facebook
              </Button>
              <Button block className='border shadow-md p-3 hover:bg-gray-100'>
                Login với Google
              </Button>
            </div>

            <h1 className='text-center text-gray-600'>
              Bạn chưa có tài khoản?{' '}
              <a href='#' className='text-blue-500 hover:underline'>
                Đăng ký
              </a>
            </h1>
          </div>

          {/* Hình minh họa */}
          <div className='w-1/2 flex justify-center items-center'>
            <img src={imgLogin} alt='login' className='object-contain rounded-lg shadow-lg' />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
