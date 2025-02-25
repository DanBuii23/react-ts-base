import React, { useEffect, useState } from 'react'
import { useTagsHook, useCreateTag, useUpdateTag, useDeleteTag, useGetTagDetail } from '../../hooks/useTagsHook'
import { Input, Table, Select, Spin, Alert, Button, Popconfirm, message, Modal } from 'antd'
import TagForm from '../../organisms/FormTags'

const { Option } = Select

const TagsList = () => {
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState<string | undefined>(undefined)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedTag, setSelectedTag] = useState<any>(null)
  const [selectedTagId, setSelectedTagId] = useState<string | null>(null)
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false)

  // Fetch danh sách tags
  const { data, isLoading, error } = useTagsHook(page, pageSize, search, filter)
  const createTag = useCreateTag()
  const updateTag = useUpdateTag()
  const deleteTag = useDeleteTag()

  const { data: tagDetail, isLoading: isDetailLoading, error: detailError } = useGetTagDetail(selectedTagId || '')

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
    setPage(1)
  }

  const handleFilter = (value: string) => {
    setFilter(value)
    setPage(1)
  }

  const openCreateModal = () => {
    setSelectedTag(null)
    setIsModalOpen(true)
  }

  const openUpdateModal = (tag: any) => {
    setSelectedTag(tag)
    setIsModalOpen(true)
  }

  const handleDetail = (tagId: string) => {
    setSelectedTagId(tagId)
    setIsDetailModalOpen(true)
  }

  const handleSubmit = async (values: any) => {
    const formData = { ...values, group: 'TAG' }

    if (selectedTag) {
      updateTag.mutate({ tagId: selectedTag.id, tagData: formData })
    } else {
      createTag.mutate(formData)
    }
    setIsModalOpen(false)
  }

  const handleDelete = (tagId: string) => {
    deleteTag.mutate(tagId, {
      onSuccess: () => {
        message.success('Xóa tag thành công!')
      },
      onError: () => {
        message.error('Xóa tag thất bại!')
      }
    })
  }
  const tag = tagDetail?.data || tagDetail
  return (
    <div className='container mx-auto p-6'>
      <h1 className='text-2xl font-bold mb-4'>Danh sách Tags</h1>
      <Button type='primary' onClick={openCreateModal} className='mb-4'>
        Thêm Tag
      </Button>

      <Input.Search placeholder='Tìm kiếm tag...' value={search} onChange={handleSearch} enterButton className='mb-4' />
      <Select placeholder='Chọn trạng thái' onChange={handleFilter} allowClear className='mb-4'>
        <Option value='active'>Trạng thái 1</Option>
        <Option value='inactive'>Trạng thái 2</Option>
      </Select>

      {error && <Alert message='Lỗi khi lấy dữ liệu!' type='error' showIcon />}
      {isLoading ? (
        <Spin size='large' className='flex justify-center' />
      ) : (
        <Table
          dataSource={data?.tags.map((tag) => ({ ...tag, key: tag.id })) || []}
          columns={[
            { title: 'Tên Tag', dataIndex: 'name', key: 'name' },
            { title: 'Slug', dataIndex: 'slug', key: 'slug' },
            { title: 'Tổng bài viết', dataIndex: 'totalPost', key: 'totalPost' },
            {
              title: 'Thao tác',
              key: 'actions',
              render: (_, tag) => (
                <>
                  <Button onClick={() => handleDetail(tag.id)}>Chi tiết</Button>
                  <Button onClick={() => openUpdateModal(tag)}>Sửa</Button>
                  <Popconfirm title='Bạn có chắc chắn muốn xóa?' onConfirm={() => handleDelete(tag.id)}>
                    <Button danger>Xóa</Button>
                  </Popconfirm>
                </>
              )
            }
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
      )}

      {/* Modal chi tiết tag */}
      {isDetailModalOpen && (
        <Modal title='Chi tiết Tag' open={isDetailModalOpen} onCancel={() => setIsDetailModalOpen(false)} footer={null}>
          {isDetailLoading ? (
            <Spin size='large' />
          ) : detailError ? (
            <Alert message='Lỗi khi tải chi tiết Tag' type='error' />
          ) : tag && Object.keys(tag).length > 0 ? (
            <div>
              <p>
                <strong>ID:</strong> {tag.id}
              </p>
              <p>
                <strong>Tên:</strong> {tag.name}
              </p>
              <p>
                <strong>Slug:</strong> {tag.slug}
              </p>
              <p>
                <strong>Tổng bài viết:</strong> {tag.totalPost}
              </p>
              <p>
                <strong>Ngày tạo:</strong> {new Date(tag.createdAt).toLocaleString()}
              </p>
            </div>
          ) : (
            <p>Không có dữ liệu hiển thị.</p>
          )}
        </Modal>
      )}

      {/* Modal Thêm/Sửa tag */}
      <TagForm
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmit}
        initialValues={selectedTag}
      />
    </div>
  )
}

export default TagsList
