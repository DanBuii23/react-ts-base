import { useTagsHook, useCreateTag, useUpdateTag, useDeleteTag, useGetTagDetail } from './useTagsHook'
import { message } from 'antd'
import { useEffect, useState } from 'react'
import { useDebounce } from '../hooks/useDebounce'

interface TagServiceParams {
  page: number
  pageSize: number
  search: string
  filter: string
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
export const useTagServices = ({ page, pageSize, search, filter, selectedTagId }: TagServiceParams) => {
  const debouncedSearch = useDebounce(search)

  const { data, isLoading } = useTagsHook({ page, pageSize, search: debouncedSearch, filter })
  const createTag = useCreateTag()
  const updateTag = useUpdateTag()
  const deleteTag = useDeleteTag()
  const { data: tagDetail, isLoading: isDetailLoading, error: detailError } = useGetTagDetail(selectedTagId || '')

  const [tagDetailData, setTagDetailData] = useState<TagDetailType | null>(null)

  useEffect(() => {
    if (tagDetail) {
      setTagDetailData(tagDetail.data || tagDetail)
    }
  }, [tagDetail])

  const handleSubmit = async (values: { name: string; slug: string; featureImage: string }, onClose: () => void) => {
    const formData = { ...values, group: 'TAG' }

    if (selectedTagId) {
      updateTag.mutate({ tagId: selectedTagId, tagData: formData })
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

  return { data, isLoading, tagDetail: tagDetailData, isDetailLoading, detailError, handleSubmit, handleDelete }
}
