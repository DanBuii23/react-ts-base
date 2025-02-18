import React, { useState, useEffect } from 'react'
import { Menu } from 'antd'
import { Link } from 'react-router-dom'

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false)
  interface Category {
    id: number
    name: string
  }

  const [categories, setCategories] = useState<Category[]>([])

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch('http://localhost:5000/categories')
        const data = await response.json()
        setCategories(data)
      } catch (error) {
        console.error('Lỗi:', error)
      }
    }
    fetchProduct()
  }, [])

  // Cấu trúc lại items để sử dụng với Menu
  const menuItems = categories.map((cat) => ({
    key: cat.id,
    label: <Link to={`/categories/${cat.id}`}>{cat.name}</Link>
  }))

  return (
    <div className='flex'>
      <div className={`h-full bg-white shadow-lg transition-all ${collapsed ? 'w-24' : 'w-60'} p-2`}>
        <button className='mb-4 p-2 w-full bg-slate-900 text-white rounded-md' onClick={() => setCollapsed(!collapsed)}>
          {collapsed ? '>' : '<'}
        </button>
        <h1>Danh mục</h1>
        <Menu mode='vertical' theme='light' items={menuItems} />
      </div>
    </div>
  )
}
