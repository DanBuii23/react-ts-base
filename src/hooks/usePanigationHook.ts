import { useState } from 'react'

export const usePagination = (initialPage = 1, initialPageSize = 10) => {
  const [page, setPage] = useState(initialPage)
  const [pageSize, setPageSize] = useState(initialPageSize)
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('')

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
