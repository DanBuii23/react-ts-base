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

export const getTagDetailApi = async (tagId: string) => {
  return apiClient.get(`/api/v1/cms/tags/${tagId}`)
}

export const createTagApi = async (tagData: any) => {
  return apiClient.post('/api/v1/cms/tags', tagData)
}

export const updateTagApi = async (tagId: string, tagData: any) => {
  return apiClient.put(`/api/v1/cms/tags/${tagId}`, tagData)
}
export const deleteTagApi = async (tagId: string) => {
  return apiClient.delete(`/api/v1/cms/tags/${tagId}`)
}
