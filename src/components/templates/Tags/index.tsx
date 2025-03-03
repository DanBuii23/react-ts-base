import { Input, Select, Button, Modal, Spin, Alert, TableColumnsType } from 'antd'
import TagForm from '../../organisms/FormTags'
import MTable from '../../molecules/MTable'
import { usePagination } from '../../../hooks/usePanigationHook'
import { TagDetailType, useTagServices } from '../../../hooks/useTagsService'
import { useTagModals } from '../../../hooks/useTagModalHook'
import MActionButtons from '../../molecules/MButtonAction'
import { useFunction } from '../../../hooks/useFunction'

const TagsList = () => {
  //phân trang
  const { page, setPage, pageSize, setPageSize } = usePagination()
  //query param
  const { query, updateQuery } = useFunction()
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
    search: query.search,
    filter: query.filter,
    selectedTagId
  })

  const columns: TableColumnsType<TagDetailType> = [
    { title: 'Tên Tag', dataIndex: 'name', key: 'name' },
    { title: 'Slug', dataIndex: 'slug', key: 'slug' },
    { title: 'Image', dataIndex: 'featureImage', key: 'featureImage' },
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
  return (
    <div className='container mx-auto p-6'>
      <h1 className='text-2xl font-bold mb-4'>Danh sách Tags</h1>
      <Button type='primary' onClick={() => openModal()} className='m-2'>
        Thêm Tag
      </Button>
      <Input.Search
        placeholder='Tìm kiếm tag...'
        value={query.search}
        onChange={(e) => updateQuery('search', e.target.value)}
        enterButton
        className='m-2 w-2/3'
      />
      <Select
        placeholder='Chọn trạng thái'
        value={query.filter}
        onChange={(value) => updateQuery('filter', value)}
        allowClear
        className='m-2'
      >
        <Select.Option value='available'>Trạng thái 1</Select.Option>
        <Select.Option value='unavailable'>Trạng thái 2</Select.Option>
      </Select>
      <hr />
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
        onSubmit={(values, onClose) => handleSubmit({ ...values, featureImage: values.featureImage || '' }, onClose)}
        initialValues={selectedTag ? { ...selectedTag } : { id: '', name: '', slug: '', featureImage: '' }}
      />
    </div>
  )
}

export default TagsList
