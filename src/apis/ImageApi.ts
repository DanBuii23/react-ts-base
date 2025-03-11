import { API_VERSION } from '../constants'
import apiClient from './ApiClient'

export const ImageApi = async (file: File): Promise<string> => {
  const formData = new FormData()
  formData.append('image', file)
  const config = { headers: { 'content-type': 'multipart/form-data' } }
  const response = await apiClient.post(`${API_VERSION}/commons/upload-images`, formData, config)
  return response.data.data.url // URL ảnh sau khi upload thành công
}
