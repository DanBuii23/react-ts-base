import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { tagsApi, getTagDetailApi, createTagApi, updateTagApi, deleteTagApi, TagData } from '../apis/TagsApi'

export interface ParamsType {
  page: number
  pageSize: number
  search: string
  status?: string
  success?: string
}

export const useTagsHook = (params: ParamsType) => {
  return useQuery({
    queryKey: ['tags', { ...params }],
    queryFn: async () => {
      const response = await tagsApi(params)
      return {
        tags: response.data.datas,
        total: response.data.total
      }
    }
  })
}

export const useGetTagDetail = (tagId: string) => {
  return useQuery({
    queryKey: ['tagDetail', tagId],
    queryFn: () => getTagDetailApi(tagId),
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
    mutationFn: ({ tagId, tagData }: { tagId: string; tagData: TagData }) => updateTagApi(tagId, tagData),
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
