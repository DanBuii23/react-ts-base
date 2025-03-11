import { useMutation } from '@tanstack/react-query'
import { ImageApi } from '../apis/ImageApi'

export const useUploadImage = () => {
  return useMutation({
    mutationFn: ImageApi
  })
}
