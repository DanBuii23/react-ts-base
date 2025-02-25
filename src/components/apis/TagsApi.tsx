import apiClient from './ApiClient'

export const tagsApi = async (page: number, pageSize: number, search?: string, filter?: string) => {
  try {
    const response = await apiClient.get('/api/v1/cms/tags', {
      params: { page, pageSize, s: search, filter }
    })
    return response.data
  } catch (error) {
    console.error('Lỗi khi gọi API:', error)
    throw error
  }
}
