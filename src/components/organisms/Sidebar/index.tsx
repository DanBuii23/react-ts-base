import React, { useState, useEffect } from 'react'
import { Menu } from 'antd'
import { Link } from 'react-router-dom'

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false)
  const [categories, setCategories] = useState<any[]>([])

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('http://localhost:5000/categories')
        const data = await response.json()
        setCategories(data)
      } catch (error) {
        console.error('Lỗi:', error)
      }
    }
    fetchCategories()
  }, [])

  // Cấu trúc lại items để sử dụng với Menu
  const menuItems = categories.map((cat) => ({
    key: cat.id.toString(),
    label: <Link to={`/categories/${cat.id}`}>{cat.name}</Link>
  }))

  return (
    <div className='flex'>
      <div className={`h-screen bg-white shadow-lg transition-all ${collapsed ? 'w-24' : 'w-60'} p-2`}>
        <button className='mb-4 p-2 w-full bg-blue-500 text-white rounded-lg' onClick={() => setCollapsed(!collapsed)}>
          {collapsed ? '>' : '<'}
        </button>
        <h1>Danh mục</h1>
        <Menu mode='vertical' theme='light' items={menuItems} />
      </div>
    </div>
  )
}
