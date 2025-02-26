import apiClient from './ApiClient'

export interface TagData {
  name: string
  description?: string
}

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
  const response = await apiClient.get(`/api/v1/cms/tags/${tagId}`)
  return response.data
}

export const createTagApi = async (tagData: TagData) => {
  const response = await apiClient.post('/api/v1/cms/tags', tagData)
  return response.data
}

export const updateTagApi = async (tagId: string, tagData: TagData) => {
  const response = await apiClient.put(`/api/v1/cms/tags/${tagId}`, tagData)
  return response.data
}

export const deleteTagApi = async (tagId: string) => {
  const response = await apiClient.delete(`/api/v1/cms/tags/${tagId}`)
  return response.data
}
