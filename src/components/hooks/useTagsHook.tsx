import { useQuery } from '@tanstack/react-query'
import { getTagsService } from '../templates/Tags/services'

export const useTagsHook = (page: number, pageSize: number, search: string, filter?: string) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['tags', page, pageSize, search, filter],
    queryFn: () => getTagsService(page, pageSize, search, filter),
    staleTime: 5 * 60 * 1000 // Cache dữ liệu trong 5 phút
  })

  return { data, isLoading, error }
}
