import { Input, Select, Button, Modal, Spin, Alert } from 'antd'
import TagForm from '../../organisms/FormTags'
import MTable from '../../molecules/MTable'
import { usePagination } from '../../../hooks/usePanigationHook'
import { useTagServices } from '../../../hooks/useTagsService'
import { useTagModals } from '../../../hooks/useTagModalHook'
import MActionButtons from '../../molecules/MButtonAction'

const { Option } = Select

const TagsList = () => {
  // Hook quản lý phân trang
  const { page, setPage, pageSize, setPageSize, search, handleSearch, filter, handleFilter } = usePagination()

  // Hook quản lý modal
  const { isModalOpen, openModal, closeModal, isDetailModalOpen, openDetailModal, closeDetailModal, selectedTag } =
    useTagModals()

  // Hook xử lý API Tags
  const { data, isLoading, tagDetail, isDetailLoading, detailError, handleSubmit, handleDelete } = useTagServices({
    page,
    pageSize,
    search,
    filter,
    selectedTag
  })

  return (
    <div className='container mx-auto p-6'>
      <h1 className='text-2xl font-bold mb-4'>Danh sách Tags</h1>

      <Button type='primary' onClick={() => openModal()} className='mb-4'>
        Thêm Tag
      </Button>

      <Input.Search placeholder='Tìm kiếm tag...' value={search} onChange={handleSearch} enterButton className='mb-4' />
      <Select placeholder='Chọn trạng thái' onChange={handleFilter} allowClear className='mb-4'>
        <Option value='active'>Trạng thái 1</Option>
        <Option value='inactive'>Trạng thái 2</Option>
      </Select>

      <MTable
        columns={[
          { title: 'Tên Tag', dataIndex: 'name', key: 'name' },
          { title: 'Slug', dataIndex: 'slug', key: 'slug' },
          { title: 'Image', dataIndex: 'featureImage', key: 'featureImage' },
          { title: 'Tổng bài viết', dataIndex: 'totalPost', key: 'totalPost' },
          {
            title: 'Thao tác',
            key: 'actions',
            render: (_: any, tag: any) => (
              <MActionButtons
                onDetail={() => openDetailModal(tag.id)}
                onEdit={() => openModal(tag)}
                onDelete={() => handleDelete(tag.id)}
              />
            )
          }
        ]}
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
      <Modal title='Chi tiết Tag' open={isDetailModalOpen} onCancel={closeDetailModal} footer={null}>
        {isDetailLoading ? (
          <Spin size='large' />
        ) : detailError ? (
          <Alert message='Lỗi khi tải chi tiết Tag' type='error' />
        ) : tagDetail ? (
          <div>
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
              <strong>Image:</strong> {tagDetail.featureImage}
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
        onSubmit={handleSubmit}
        initialValues={selectedTag ? { ...selectedTag } : undefined}
      />
    </div>
  )
}

export default TagsList
