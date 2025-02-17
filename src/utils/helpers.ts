import { ACCESS_TOKEN } from '../constants'
import type { ClassValue } from 'clsx'
import clsx from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getAccessToken = () => {
  const accessToken = localStorage.getItem(ACCESS_TOKEN)
  return accessToken
}
