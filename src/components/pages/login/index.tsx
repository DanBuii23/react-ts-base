import { Form } from 'antd'
import { Navigate } from 'react-router-dom'
import bgtech from '../../../../public/images/bgtechno.jpg'
import imgLogin from '../../../../public/images/login.jpg'
import { useAuth } from '../../../contexts/AuthContext'
import { MButton } from '../../atoms'
import MForm from '../../organisms/MForm'

const Login = () => {
  const { login, accessToken, loading } = useAuth()
  const [form] = Form.useForm()

  if (accessToken) return <Navigate to='/' replace />

  const handleLogin = (values: { email: string; password: string }) => {
    login(values.email, values.password)
  }

  return (
    <div className='bg-cover bg-center h-screen' style={{ backgroundImage: `url(${bgtech})` }}>
      <div className='container mx-auto flex items-center justify-center h-screen px-8'>
        <div className='w-full max-w-3xl bg-white shadow-xl rounded-lg flex p-8 gap-8'>
          <div className='w-1/2 flex flex-col justify-center'>
            <h2 className='text-3xl font-bold text-center text-gray-800 mb-6'>Login</h2>
            <MForm
              form={form}
              name='login'
              onFinish={handleLogin}
              loading={loading}
              fields={[
                { label: 'Tài khoản', name: 'email', rules: [{ required: true, message: 'Mời nhập tài khoản!' }] },
                {
                  label: 'Mật khẩu',
                  name: 'password',
                  type: 'password',
                  rules: [{ required: true, message: 'Mời nhập mật khẩu!' }]
                }
              ]}
              buttonText='Login'
            />

            <div className='flex gap-4 my-4'>
              <MButton block className='border shadow-md p-3 hover:bg-gray-100'>
                Login với Facebook
              </MButton>
              <MButton block className='border shadow-md p-3 hover:bg-gray-100'>
                Login với Google
              </MButton>
            </div>

            <h1 className='text-center text-gray-600'>
              Bạn chưa có tài khoản?{' '}
              <a href='#' className='text-blue-500 hover:underline'>
                Đăng ký
              </a>
            </h1>
          </div>
          <div className='w-1/2 flex justify-center items-center'>
            <img src={imgLogin} alt='login' className='object-contain rounded-lg shadow-lg' />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
