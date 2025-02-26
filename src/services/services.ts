import { message } from 'antd'
import { loginApi } from '../apis/AuthApi'
import { ACCESS_TOKEN } from '../constants'

export const loginServices = async (email: string, password: string) => {
  try {
    const response = await loginApi({ email, password })
    // Lấy token đúng key từ API
    const token = response?.data?.accessToken
    if (!token) {
      throw new Error('Không nhận được token từ server!')
    }

    sessionStorage.setItem(ACCESS_TOKEN, token)
    message.success('Đăng nhập thành công!')
    return token
  } catch (error: unknown) {
    console.error('Lỗi đăng nhập:', error)
    if (error instanceof Error) {
      message.error(error.message || 'Đăng nhập thất bại!')
    } else {
      message.error('Đăng nhập thất bại!')
    }
    throw error
  }
}

export const logout = () => {
  sessionStorage.removeItem(ACCESS_TOKEN)
  message.success('Đăng xuất thành công!')
}
