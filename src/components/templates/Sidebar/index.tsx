import { useState } from 'react'
import { Menu, Modal, Select, message } from 'antd'
import { Link } from 'react-router-dom'
import { useCategory } from '../../../contexts/CategoryContext'
import MInput from '../../atoms/MInput'
import { AppstoreOutlined } from '@ant-design/icons'

export default function Sidebar() {
  const { categories, addCategory, updateCategory, deleteCategory } = useCategory()

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalType, setModalType] = useState<'add' | 'update' | 'delete' | null>(null)
  const [categoryName, setCategoryName] = useState('')
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null)
  const [openKeys, setOpenKeys] = useState<string[]>([]) // State để mở/đóng submenu

  const openModal = (type: 'add' | 'update' | 'delete') => {
    setModalType(type)
    setIsModalOpen(true)
  }

  const handleOk = () => {
    if (modalType === 'add' && categoryName) {
      addCategory(categoryName)
      message.success('Thêm danh mục thành công')
    } else if (modalType === 'update' && selectedCategoryId && categoryName) {
      updateCategory(selectedCategoryId, categoryName)
      message.success('Cập nhật danh mục thành công')
    } else if (modalType === 'delete' && selectedCategoryId) {
      deleteCategory(selectedCategoryId)
      message.success('Xóa danh mục thành công')
    }
    setIsModalOpen(false)
    setCategoryName('')
    setSelectedCategoryId(null)
  }
  const menuItems = [
    {
      key: 'tags',
      label: <Link to='/tags'>Quản lý Tags</Link>,
      icon: <AppstoreOutlined />
    },
    {
      key: 'categories',
      label: 'Danh mục',
      icon: <AppstoreOutlined />,
      children: categories.map((cat) => ({
        key: cat.id,
        label: <Link to={`/categories/${cat.id}`}>{cat.name}</Link>
      }))
    },
    {
      key: 'manage',
      label: 'Quản lý danh mục',
      icon: <AppstoreOutlined />,
      children: [
        { key: 'add', label: 'Thêm danh mục', onClick: () => openModal('add') },
        { key: 'update', label: 'Sửa danh mục', onClick: () => openModal('update'), disabled: categories.length === 0 },
        { key: 'delete', label: 'Xóa danh mục', onClick: () => openModal('delete'), disabled: categories.length === 0 }
      ]
    }
  ]

  return (
    <div className='flex'>
      <div className={`min-h-screen bg-white shadow-lg transition-all w-auto p-2`}>
        <Menu
          mode='inline'
          theme='light'
          openKeys={openKeys}
          onOpenChange={setOpenKeys}
          items={menuItems}
          className=''
        />
      </div>

      <Modal
        title={modalType === 'add' ? 'Thêm danh mục' : modalType === 'update' ? 'Sửa danh mục' : 'Xóa danh mục'}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={() => setIsModalOpen(false)}
      >
        {modalType === 'add' && (
          <MInput label='Tên danh mục' value={categoryName} onChange={(e) => setCategoryName(e.target.value)} />
        )}

        {(modalType === 'update' || modalType === 'delete') && (
          <Select
            placeholder='Chọn danh mục'
            className='w-full mb-2'
            onChange={(value) => setSelectedCategoryId(value)}
          >
            {categories.map((cat) => (
              <Select.Option key={cat.id} value={cat.id}>
                {cat.name}
              </Select.Option>
            ))}
          </Select>
        )}

        {modalType === 'update' && (
          <MInput label='Tên mới' value={categoryName} onChange={(e) => setCategoryName(e.target.value)} />
        )}
      </Modal>
    </div>
  )
}
