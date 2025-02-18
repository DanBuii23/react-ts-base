import { Button } from 'antd'
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

interface Product {
  id: number
  image: string
  alt: string
}

interface Category {
  id: string
  name: string
  products: Product[]
}

export default function ProductList() {
  const { id } = useParams() // Lấy ID từ URL
  console.log('ID:', id) // Kiểm tra ID
  const [category, setCategory] = useState<Category | null>(null)

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch('http://localhost:5000/categories')
        const data: Category[] = await response.json()
        console.log('Dữ liệu API:', data) // Kiểm tra dữ liệu API

        const selectedCategory = data.find((cat) => cat.id == id)
        console.log('Danh mục tìm thấy:', selectedCategory) // Kiểm tra danh mục

        if (!selectedCategory) {
          console.error('Danh mục không tìm thấy')
        }
        setCategory(selectedCategory!)
      } catch (error) {
        console.error('Lỗi khi lấy dữ liệu API:', error) // Thông báo lỗi khi fetch
      }
    }

    fetchProduct()
  }, [id]) // Gọi lại khi id thay đổi
  console.log('category:', category)
  return (
    <>
      <div className='container p-20 grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
        {category?.products.map((product) => (
          <div className='border-2 border-gray-200 hover:border-gray-400 rounded-lg p-2' key={product.id}>
            <img src={product.image} alt={product.alt} className='mx-auto object-contain w-60 h-60' />
            <p className='text-center font-semibold'>{product.alt}</p>
            <div className='flex gap-2 p-2'>
              <Button
                block
                className='flex items-center justify-center gap-2 border shadow-md p-3 hover:bg-gray-100'
                type='default'
              >
                Xem chi tiết
              </Button>
              <Button
                block
                className='flex items-center justify-center gap-2 border shadow-md p-3 hover:bg-gray-100'
                type='primary'
              >
                Mua ngay
              </Button>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}
