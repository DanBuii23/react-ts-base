import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'

export const usePagination = (initialPage = 1, initialPageSize = 10) => {
  const [searchParams, setSearchParams] = useSearchParams()
  const pageFromUrl = Number(searchParams.get('page')) || initialPage

  const [page, setPage] = useState(pageFromUrl)
  const [pageSize, setPageSize] = useState(initialPageSize)

  useEffect(() => {
    setSearchParams((prevParams) => {
      const newParams = new URLSearchParams(prevParams)
      newParams.set('page', String(page))
      return newParams
    })
  }, [page, setSearchParams])

  return { page, setPage, pageSize, setPageSize }
}
