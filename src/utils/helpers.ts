import { ACCESS_TOKEN } from '../constants'

export const getAccessToken = () => {
  const accessToken = localStorage.getItem(ACCESS_TOKEN)
  return accessToken
}
