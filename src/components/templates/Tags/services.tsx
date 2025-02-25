import { tagsApi } from '../../apis/TagsApi'

export const getTagsService = async (page: number, pageSize: number, search: string, filter?: string) => {
  try {
    const accessToken = sessionStorage.getItem('accessToken')
    if (!accessToken) {
      throw new Error('Không thấy accessToken')
    }

    const response = await tagsApi(page, pageSize, search, filter)

    console.log('API Response:', response) // Kiểm tra dữ liệu nhận được

    // Trích xuất data từ response
    const { data } = response

    if (!data || !Array.isArray(data.datas)) {
      throw new Error('Dữ liệu API không hợp lệ')
    }

    // Lưu danh sách tags vào localStorage để tối ưu
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
