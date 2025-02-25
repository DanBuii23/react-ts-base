import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getTagDetailService, tagsService } from '../templates/Tags/services'
import { createTagApi, deleteTagApi, updateTagApi } from '../apis/TagsApi'

export const useTagsHook = (page: number, pageSize: number, search: string, filter?: string) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['tags', page, pageSize, search, filter],
    queryFn: () => tagsService(page, pageSize, search, filter)
  })

  return { data, isLoading, error }
}
export const useGetTagDetail = (tagId: string) => {
  console.log('useGetTagDetail gọi API với ID:', tagId)
  return useQuery({
    queryKey: ['tagDetail', tagId],
    queryFn: () => getTagDetailService(tagId),
    enabled: !!tagId
  })
}

export const useCreateTag = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createTagApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tags'] })
    }
  })
}

export const useUpdateTag = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ tagId, tagData }: { tagId: string; tagData: any }) => updateTagApi(tagId, tagData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tags'] })
    }
  })
}

export const useDeleteTag = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (tagId: string) => deleteTagApi(tagId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tags'] })
    }
  })
}
