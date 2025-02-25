import React, { useState } from 'react'
import { useTagsHook } from '../../hooks/useTagsHook'
import { Input, Table, Select, Spin, Alert } from 'antd'

const { Option } = Select

const TagsList = () => {
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState<string | undefined>(undefined)

  const { data, isLoading, error } = useTagsHook(page, pageSize, search, filter)

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
    setPage(1)
  }

  const handleFilterChange = (value: string) => {
    setFilter(value)
    setPage(1)
  }

  return (
    <div className='container mx-auto p-6'>
      <h1 className='text-2xl font-bold mb-4'>Danh sách Tags</h1>

      {/* Tìm kiếm */}
      <Input.Search placeholder='Tìm kiếm tag...' value={search} onChange={handleSearch} enterButton className='mb-4' />

      {/* Bộ lọc */}
      <Select placeholder='Chọn trạng thái' onChange={handleFilterChange} allowClear className='mb-4'>
        <Option value='active'>Trạng thái 1</Option>
        <Option value='inactive'>Trạng thái 2</Option>
      </Select>

      {/* Hiển thị lỗi nếu có */}
      {error && <Alert message='Lỗi khi lấy dữ liệu!' type='error' showIcon />}

      {/* Hiển thị loading */}
      {isLoading ? (
        <Spin size='large' className='flex justify-center' />
      ) : (
        <>
          <Table
            dataSource={data?.tags.map((item: { id: string }) => ({ ...item, key: item.id })) || []}
            columns={[
              { title: 'ID', dataIndex: 'id', key: 'id' },
              { title: 'Tên Tag', dataIndex: 'name', key: 'name' },
              { title: 'Slug', dataIndex: 'slug', key: 'slug' },
              { title: 'Tổng bài viết', dataIndex: 'totalPost', key: 'totalPost' }
            ]}
            pagination={{
              current: page,
              pageSize: pageSize,
              total: data?.total || 0,
              onChange: (page, pageSize) => {
                setPage(page)
                setPageSize(pageSize)
              }
            }}
          />
        </>
      )}
    </div>
  )
}

export default TagsList
