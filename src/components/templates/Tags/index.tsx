import { Input, Select, Button, Modal, Spin, Alert, TableColumnsType } from 'antd'
import TagForm from '../../organisms/TagsForm'
import MTable from '../../molecules/MTable'
import { usePagination } from '../../../hooks/usePanigation'
import { TagDetailType, useTagServices } from '../../../hooks/useTagsService'
import { useTagModals } from '../../../hooks/useModal'
import MActionButtons from '../../molecules/MButtonAction'
import { useEffect } from 'react'
import { useFilter } from '../../../hooks/useFilter'

const TagsList = () => {
  const { page, setPage, pageSize, setPageSize } = usePagination()
  const { filter, updateFilter, handleFilterInURL } = useFilter()
  const {
    isModalOpen,
    openModal,
    closeModal,
    isDetailModalOpen,
    openDetailModal,
    closeDetailModal,
    selectedTag,
    selectedTagId
  } = useTagModals()
  // API Tags
  const {
    data,
    isLoading,
    tagDetail,
    isDetailLoading,
    detailError,
    handleSubmit,
    handleDelete,
    searchInput,
    setSearchInput
  } = useTagServices({
    page,
    pageSize,
    selectedTagId,
    s: String(filter.search || ''),
    ...filter
  })

  const columns: TableColumnsType<TagDetailType> = [
    { title: 'Tên Tag', dataIndex: 'name', key: 'name' },
    { title: 'Slug', dataIndex: 'slug', key: 'slug' },
    {
      title: 'Image',
      dataIndex: 'featureImage',
      key: 'featureImage',
      render: (src: string) => (
        <img src={src} alt='Tag Image' style={{ width: 80, height: 50, objectFit: 'cover', borderRadius: 5 }} />
      )
    },
    { title: 'Tổng bài viết', dataIndex: 'totalPost', key: 'totalPost' },
    {
      title: 'Thao tác',
      key: 'actions',
      render: (_, tag: TagDetailType) => (
        <MActionButtons
          onDetail={() => openDetailModal(tag.id)}
          onEdit={() => openModal(tag)}
          onDelete={() => handleDelete(tag.id)}
        />
      )
    }
  ]

  useEffect(() => {
    handleFilterInURL(filter as Record<string, string | null>)
  }, [])

  return (
    <div className='container mx-auto p-6'>
      <h1 className='text-2xl font-bold mb-4'>Danh sách Tags</h1>
      <Button type='primary' onClick={() => openModal()} className='m-2'>
        Thêm Tag
      </Button>

      {/* Tìm kiếm */}
      <Input.Search
        placeholder='Tìm kiếm tag...'
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        enterButton
        className='m-2 w-1/3'
      />

      {/* Lọc */}
      <Select
        placeholder='Chọn trạng thái'
        value={filter.status}
        onChange={(value) => updateFilter('status', String(value))}
        allowClear
        className='m-2'
      >
        <Select.Option value='status1'>Trạng thái 1</Select.Option>
        <Select.Option value='status2'>Trạng thái 2</Select.Option>
      </Select>
      <Select
        placeholder='Chọn trạng thái'
        value={filter.success}
        onChange={(value) => updateFilter('success', String(value))}
        allowClear
        className='m-2'
      >
        <Select.Option value='yes'>Yes</Select.Option>
        <Select.Option value='no'>No</Select.Option>
      </Select>
      <Select
        placeholder='Chọn trạng thái'
        value={filter.isActive}
        onChange={(value) => updateFilter('isActive', String(value))}
        allowClear
        className='m-2'
      >
        <Select.Option value='yes'>lên</Select.Option>
        <Select.Option value='no'>xuống</Select.Option>
      </Select>

      <hr />

      {/* Hiển thị bảng */}
      <MTable
        columns={columns}
        dataSource={data?.tags || []}
        loading={isLoading}
        pagination={{
          current: page,
          pageSize: pageSize,
          total: data?.total || 0,
          onChange: (page: number, pageSize: number) => {
            setPage(page)
            setPageSize(pageSize)
          }
        }}
      />

      {/* Modal chi tiết tag */}
      <Modal
        title='Chi tiết Tag'
        open={isDetailModalOpen}
        onCancel={closeDetailModal}
        footer={null}
        className='text-center'
      >
        {isDetailLoading ? (
          <Spin size='large' />
        ) : detailError ? (
          <Alert message='Lỗi khi tải chi tiết Tag' type='error' />
        ) : tagDetail ? (
          <div className='text-start pt-2'>
            <p>
              <strong>ID:</strong> {tagDetail.id}
            </p>
            <p>
              <strong>Tên:</strong> {tagDetail.name}
            </p>
            <p>
              <strong>Slug:</strong> {tagDetail.slug}
            </p>
            <p>
              <strong>Image:</strong>
              {tagDetail.featureImage ? (
                <img
                  src={tagDetail.featureImage}
                  alt={tagDetail.name}
                  style={{
                    width: '100%',
                    maxHeight: '300px',
                    objectFit: 'cover',
                    borderRadius: '8px',
                    marginTop: '8px'
                  }}
                />
              ) : (
                <p>Không có ảnh</p>
              )}
            </p>

            <p>
              <strong>Tổng bài viết:</strong> {tagDetail.totalPost}
            </p>
            <p>
              <strong>Ngày tạo:</strong> {new Date(tagDetail.createdAt).toLocaleString()}
            </p>
          </div>
        ) : (
          <p>Không có dữ liệu hiển thị.</p>
        )}
      </Modal>

      {/* Modal Thêm/Sửa tag */}
      <TagForm
        isOpen={isModalOpen}
        onClose={closeModal}
        onSubmit={(values, onClose) => handleSubmit({ ...values, featureImage: values.featureImage || '' }, onClose)}
        initialValues={selectedTag ? { ...selectedTag } : { id: '', name: '', slug: '', featureImage: '' }}
      />
    </div>
  )
}

export default TagsList
