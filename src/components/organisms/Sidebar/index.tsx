import React, { useState } from 'react'
import { Menu, Modal, Select, message } from 'antd'
import { Link } from 'react-router-dom'
import { useCategory } from '../../../contexts/CategoryContext'
import MInput from '../../atoms/MInput'
import { AppstoreOutlined } from '@ant-design/icons'

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false)
  const { categories, addCategory, updateCategory, deleteCategory } = useCategory()

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalType, setModalType] = useState<'add' | 'update' | 'delete' | null>(null)
  const [categoryName, setCategoryName] = useState('')
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null)
  const [openKeys, setOpenKeys] = useState<string[]>([]) // State để mở/đóng submenu

  const openModal = (type: 'add' | 'edit' | 'delete') => {
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

  const toggleSubMenu = (key: string) => {
    setOpenKeys((prevKeys) => (prevKeys.includes(key) ? prevKeys.filter((k) => k !== key) : [...prevKeys, key]))
  }

  return (
    <div className='flex'>
      <div className={`min-h-screen bg-white shadow-lg transition-all ${collapsed ? 'w-24' : 'w-80'} p-2`}>
        <button className='mb-4 p-2 w-full bg-slate-900 text-white rounded-md' onClick={() => setCollapsed(!collapsed)}>
          {collapsed ? '>' : '<'}
        </button>
        <Menu mode='inline' theme='light' openKeys={openKeys} onOpenChange={setOpenKeys}>
          <Menu.SubMenu
            key='categories'
            title='Danh mục'
            icon={<AppstoreOutlined />}
            onTitleClick={() => toggleSubMenu('categories')}
          >
            {categories.map((cat) => (
              <Menu.Item key={cat.id}>
                <Link to={`/categories/${cat.id}`}>{cat.name}</Link>
              </Menu.Item>
            ))}
          </Menu.SubMenu>

          <Menu.SubMenu
            key='manage'
            title='Quản lý danh mục'
            icon={<AppstoreOutlined />}
            onTitleClick={() => toggleSubMenu('manage')}
          >
            <Menu.Item key='add' onClick={() => openModal('add')}>
              Thêm danh mục
            </Menu.Item>
            <Menu.Item key='edit' onClick={() => openModal('edit')} disabled={categories.length === 0}>
              Sửa danh mục
            </Menu.Item>
            <Menu.Item key='delete' onClick={() => openModal('delete')} disabled={categories.length === 0}>
              Xóa danh mục
            </Menu.Item>
          </Menu.SubMenu>
        </Menu>
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
