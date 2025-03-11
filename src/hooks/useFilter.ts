import { useSearchParams, useNavigate } from 'react-router-dom'
import { useMemo, useEffect } from 'react'
import queryString from 'query-string'

export const useFilter = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const navigate = useNavigate()

  const filter = useMemo(() => {
    const searchObj = Object.fromEntries(searchParams.entries())
    return queryString.parse(queryString.stringify(searchObj), {
      parseNumbers: true,
      parseBooleans: true
    })
  }, [searchParams])

  const updateFilter = (key: string, value: string | null) => {
    const newParams = { ...filter }

    if (!value) {
      delete newParams[key] // Xóa nếu giá trị rỗng/null
    } else {
      newParams[key] = value
    }

    const queryStringified = queryString.stringify(newParams, {
      skipEmptyString: true,
      skipNull: true
    })
    setSearchParams(new URLSearchParams(queryStringified))
  }

  const handleFilterInURL = (newFilters: Record<string, string | null>) => {
    const updatedParams = { ...filter, ...newFilters }

    Object.keys(updatedParams).forEach((key) => {
      if (!updatedParams[key]) delete updatedParams[key] // Xóa nếu rỗng
    })

    const queryStringified = queryString.stringify(updatedParams, {
      skipEmptyString: true,
      skipNull: true
    })
    navigate(queryStringified ? `?${queryStringified}` : '', { replace: true })
  }

  useEffect(() => {
    setSearchParams(new URLSearchParams(queryString.stringify(filter)))
  }, [filter])

  return { filter, updateFilter, handleFilterInURL }
}
