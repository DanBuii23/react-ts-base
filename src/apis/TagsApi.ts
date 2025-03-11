import { API_VERSION } from '../constants'
import { ParamsType } from '../hooks/useTagHook'
import apiClient from './ApiClient'

export interface TagData {
  name: string
  description?: string
}

export const tagsApi = async (params: ParamsType) => {
  const response = await apiClient.get(`${API_VERSION}/tags`, {
    params
  })
  return response.data
}

export const getTagDetailApi = async (tagId: string) => {
  const response = await apiClient.get(`${API_VERSION}/tags/${tagId}`)
  return response.data
}

export const createTagApi = async (tagData: TagData) => {
  const response = await apiClient.post(`${API_VERSION}/tags`, tagData)
  return response.data
}

export const updateTagApi = async (tagId: string, tagData: TagData) => {
  const response = await apiClient.put(`${API_VERSION}/tags/${tagId}`, tagData)
  return response.data
}

export const deleteTagApi = async (tagId: string) => {
  const response = await apiClient.delete(`${API_VERSION}/tags/${tagId}`)
  return response.data
}
