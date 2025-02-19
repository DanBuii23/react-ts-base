import React, { useState } from 'react'
import { Menu, Modal, Select, message } from 'antd'
import { Link } from 'react-router-dom'
import { useCategory } from '../../../contexts/CategoryContext'
import MInput from '../../atoms/MInput'

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false)
  const { categories, addCategory, updateCategory, deleteCategory } = useCategory()

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalType, setModalType] = useState<'add' | 'edit' | 'delete' | null>(null)
  const [categoryName, setCategoryName] = useState('')
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null)

  const openModal = (type: 'add' | 'edit' | 'delete') => {
    setModalType(type)
    setIsModalOpen(true)
  }

  const handleOk = () => {
    if (modalType === 'add' && categoryName) {
      addCategory(categoryName)
      message.success('Thêm danh mục thành công')
    } else if (modalType === 'edit' && selectedCategoryId && categoryName) {
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
      key: 'categories',
      label: 'Danh mục',
      children: categories.map((cat) => ({
        key: cat.id,
        label: <Link to={`/categories/${cat.id}`}>{cat.name}</Link>
      }))
    },
    {
      key: 'manage',
      label: 'Quản lý danh mục',
      children: [
        { key: 'add', label: 'Thêm danh mục', onClick: () => openModal('add') },
        {
          key: 'edit',
          label: 'Sửa danh mục',
          onClick: () => openModal('edit'),
          disabled: categories.length === 0
        },
        {
          key: 'delete',
          label: 'Xóa danh mục',
          onClick: () => openModal('delete'),
          disabled: categories.length === 0
        }
      ]
    }
  ]

  return (
    <div className='flex'>
      <div className={`min-h-screen bg-white shadow-lg transition-all ${collapsed ? 'w-24' : 'w-80'} p-2`}>
        <button className='mb-4 p-2 w-full bg-slate-900 text-white rounded-md' onClick={() => setCollapsed(!collapsed)}>
          {collapsed ? '>' : '<'}
        </button>
        <Menu mode='vertical' theme='light' items={menuItems} />
      </div>

      <Modal
        title={modalType === 'add' ? 'Thêm danh mục' : modalType === 'edit' ? 'Sửa danh mục' : 'Xóa danh mục'}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={() => setIsModalOpen(false)}
      >
        {modalType === 'add' && (
          <MInput label='Tên danh mục' value={categoryName} onChange={(e) => setCategoryName(e.target.value)} />
        )}

        {(modalType === 'edit' || modalType === 'delete') && (
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

        {modalType === 'edit' && (
          <MInput label='Tên mới' value={categoryName} onChange={(e) => setCategoryName(e.target.value)} />
        )}
      </Modal>
    </div>
  )
}
