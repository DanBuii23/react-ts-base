import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'

export const usePagination = (initialPage = 1, initialPageSize = 10) => {
  const [searchParams, setSearchParams] = useSearchParams()
  const pageFromUrl = Number(searchParams.get('page')) || initialPage

  const [page, setPage] = useState(pageFromUrl)
  const [pageSize, setPageSize] = useState(initialPageSize)
  const [search, setSearch] = useState(searchParams.get('search') || '')
  const [filter, setFilter] = useState(searchParams.get('filter') || '')

  useEffect(() => {
    setSearchParams({ page: String(page), filter, search })
  }, [page, search, filter, setSearchParams])

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
    setPage(1)
  }

  const handleFilter = (value: string) => {
    setFilter(value)
    setPage(1)
  }

  return { page, setPage, pageSize, setPageSize, search, handleSearch, filter, handleFilter }
}
