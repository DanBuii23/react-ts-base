import { useState, useEffect, useCallback } from 'react'
import { useSearchParams } from 'react-router-dom'

interface Filter {
  search: string
  status?: string
}

export const useFilter = (initialFilters: Record<string, unknown> = {}) => {
  const [searchParams, setSearchParams] = useSearchParams()

  const [filter, setFilter] = useState<Filter>({
    search: searchParams.get('search') || '',
    status: searchParams.get('status') || '',
    ...initialFilters
  })

  const handleFilterInURL = useCallback(() => {
    setSearchParams((prevParams) => {
      const newParams = new URLSearchParams(prevParams)
      Object.entries(filter).forEach(([key, value]) => {
        if (value) {
          newParams.set(key, String(value))
        } else {
          newParams.delete(key)
        }
      })
      return newParams
    })
  }, [filter, setSearchParams])

  useEffect(() => {
    handleFilterInURL()
  }, [filter, handleFilterInURL])

  const updateFilter = (key: keyof Filter, value: string) => {
    setFilter((prev) => ({ ...prev, [key]: value }))
  }

  return {
    filter,
    updateFilter,
    handleFilterInURL
  }
}
