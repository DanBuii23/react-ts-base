import { Input, Select, Button, Modal, Spin, Alert } from 'antd'
import TagForm from '../../organisms/FormTags'
import MTable from '../../molecules/MTable'
import { usePagination } from '../../../hooks/usePanigationHook'
import { useTagServices } from '../../../hooks/useTagsService'
import { useTagModals } from '../../../hooks/useTagModalHook'
import MActionButtons from '../../molecules/MButtonAction'

const { Option } = Select

const TagsList = () => {
  //phân trang
  const { page, setPage, pageSize, setPageSize, search, handleSearch, filter, handleFilter } = usePagination()

  //modal
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

  //API Tags
  const { data, isLoading, tagDetail, isDetailLoading, detailError, handleSubmit, handleDelete } = useTagServices({
    page,
    pageSize,
    search,
    filter,
    selectedTagId
  })

  return (
    <div className='container mx-auto p-6'>
      <h1 className='text-2xl font-bold mb-4'>Danh sách Tags</h1>
      <Button type='primary' onClick={() => openModal()} className='m-2'>
        Thêm Tag
      </Button>
      <Input.Search
        placeholder='Tìm kiếm tag...'
        value={search}
        onChange={handleSearch}
        enterButton
        className='m-2 w-2/3'
      />
      <Select placeholder='Chọn trạng thái' onChange={handleFilter} allowClear className='m-2'>
        <Option value='available'>Trạng thái 1</Option>
        <Option value='unavailable'>Trạng thái 2</Option>
      </Select>
      <hr />
      <MTable
        columns={[
          { title: 'Tên Tag', dataIndex: 'name', key: 'name' },
          { title: 'Slug', dataIndex: 'slug', key: 'slug' },
          { title: 'Image', dataIndex: 'featureImage', key: 'featureImage' },
          { title: 'Tổng bài viết', dataIndex: 'totalPost', key: 'totalPost' },
          {
            title: 'Thao tác',
            key: 'actions',
            render: (
              _: unknown,
              tag: { id: string; name: string; slug: string; featureImage: string; totalPost: number }
            ) => (
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
        initialValues={selectedTag ? { ...selectedTag } : { name: '', slug: '', featureImage: '' }}
      />
    </div>
  )
}

export default TagsList
