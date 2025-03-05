import { useTagsHook, useCreateTag, useUpdateTag, useDeleteTag, useGetTagDetail } from './useTagHook'
import { message } from 'antd'
import { useEffect, useState } from 'react'
import { useDebounce } from '../hooks/useDebounce'

interface TagServiceParams {
  page: number
  pageSize: number
  search: string
  status: string
  success: string
  selectedTag?: string | null
  selectedTagId?: string | null
}

export interface TagDetailType {
  id: string
  name: string
  slug: string
  featureImage: string
  totalPost: number
  createdAt: string
}

export const useTagServices = (params: TagServiceParams) => {
  const [searchInput, setSearchInput] = useState(params.search || '') // 🔹 State riêng cho search
  const debouncedSearch = useDebounce(searchInput, 500) // 🔹 Debounce chỉ trên state này

  // ✅ Gọi API với debouncedSearch thay vì params.search
  const { data, isLoading } = useTagsHook({ ...params, search: debouncedSearch })

  const createTag = useCreateTag()
  const updateTag = useUpdateTag()
  const deleteTag = useDeleteTag()

  const {
    data: tagDetail,
    isLoading: isDetailLoading,
    error: detailError
  } = useGetTagDetail(params.selectedTagId || '')

  const [tagDetailData, setTagDetailData] = useState<TagDetailType | null>(null)

  useEffect(() => {
    if (tagDetail) {
      setTagDetailData(tagDetail.data || tagDetail)
    }
  }, [tagDetail])

  useEffect(() => {
    setSearchInput(params.search || '') // 🔹 Đồng bộ search với URL khi params thay đổi
  }, [params.search])

  const handleSubmit = async (values: { name: string; slug: string; featureImage: string }, onClose: () => void) => {
    const formData = { ...values, group: 'TAG' }

    if (params.selectedTagId) {
      updateTag.mutate({ tagId: params.selectedTagId, tagData: formData })
    } else {
      createTag.mutate(formData)
    }

    onClose()
  }

  const handleDelete = (tagId: string) => {
    deleteTag.mutate(tagId, {
      onSuccess: () => message.success('Xóa tag thành công!'),
      onError: () => message.error('Xóa tag thất bại!')
    })
  }

  return {
    data,
    isLoading,
    tagDetail: tagDetailData,
    isDetailLoading,
    detailError,
    searchInput, // 🔹 Trả về state này để dùng trong Input.Search
    setSearchInput, // 🔹 Hàm cập nhật search khi nhập liệu
    handleSubmit,
    handleDelete
  }
}
