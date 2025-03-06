import { useTagsHook, useCreateTag, useUpdateTag, useDeleteTag, useGetTagDetail } from './useTagHook'
import { message } from 'antd'
import { useEffect, useState } from 'react'
import { useDebounce } from '../hooks/useDebounce'

interface TagServiceParams {
  page: number
  pageSize: number
  s: string
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
  const [searchInput, setSearchInput] = useState(params.s || '')
  const debouncedSearch = useDebounce(searchInput)

  const { data, isLoading } = useTagsHook({
    ...params,
    s: debouncedSearch
  })

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
    if (params.s !== searchInput) {
      setSearchInput(params.s || '')
    }
  }, [params.s])
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
    searchInput,
    setSearchInput,
    handleSubmit,
    handleDelete
  }
}
