import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'

export const useFunction = () => {
  const [searchParams, setSearchParams] = useSearchParams()

  const [query, setQuery] = useState({
    search: searchParams.get('search') || '',
    filter: searchParams.get('filter') || ''
  })

  useEffect(() => {
    setSearchParams((prevParams) => {
      const newParams = new URLSearchParams(prevParams)
      if (query.filter) newParams.set('filter', query.filter)
      else newParams.delete('filter')
      if (query.search) newParams.set('search', query.search)
      else newParams.delete('search')

      return newParams
    })
  }, [query, setSearchParams])

  const updateQuery = (key: 'filter' | 'search', value: string) => {
    setQuery((prev) => ({
      ...prev,
      [key]: value
    }))
  }

  return { query, updateQuery }
}
