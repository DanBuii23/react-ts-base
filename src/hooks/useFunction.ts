import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'

export const useFunction = () => {
  const [searchParams, setSearchParams] = useSearchParams()

  const [query, setQuery] = useState({
    search: searchParams.get('search') || '',
    status: searchParams.get('status') || ''
  })

  useEffect(() => {
    setSearchParams((prevParams) => {
      const newParams = new URLSearchParams(prevParams)
      if (query.status) newParams.set('status', query.status)
      else newParams.delete('status')
      if (query.search) newParams.set('search', query.search)
      else newParams.delete('search')

      return newParams
    })
  }, [query, setSearchParams])

  const updateQuery = (key: 'status' | 'search', value: string) => {
    setQuery((prev) => ({
      ...prev,
      [key]: value
    }))
  }

  return { query, updateQuery }
}
