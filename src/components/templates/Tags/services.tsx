import { ACCESS_TOKEN } from '../../../constants'
import { tagsApi, getTagDetailApi, createTagApi, updateTagApi, deleteTagApi } from '../../apis/TagsApi'

// ✅ Lấy danh sách tags
export const tagsService = async (page: number, pageSize: number, search: string, filter?: string) => {
  try {
    const accessToken = sessionStorage.getItem(ACCESS_TOKEN)
    if (!accessToken) {
      throw new Error('Không thấy accessToken')
    }
    const response = await tagsApi(page, pageSize, search, filter)

    const { data } = response

    if (!data || !Array.isArray(data.datas)) {
      throw new Error('Dữ liệu API không hợp lệ')
    }

    const tagsData = {
      tags: data.datas,
      total: data.total
    }
    localStorage.setItem('tagsData', JSON.stringify(tagsData))

    return tagsData
  } catch (error) {
    console.error('Lỗi khi lấy danh sách tags:', error)
    throw error
  }
}

export const getTagDetailService = async (tagId: string) => {
  const response = await getTagDetailApi(tagId)
  return response.data
}

export const createTagService = async (tagData: any) => {
  const response = await createTagApi(tagData)
  return response.data
}

export const updateTagService = async (tagId: string, tagData: any) => {
  const response = await updateTagApi(tagId, tagData)
  return response.data
}
export const deleteTagService = async (tagId: string) => {
  const response = await deleteTagApi(tagId)
  return response.data
}
