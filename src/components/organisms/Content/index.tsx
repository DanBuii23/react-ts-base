import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

interface Product {
  id: number
  image: string
  alt: string
}

interface Category {
  name: string
  products: Product[]
}

export default function Content() {
  const { id } = useParams<{ id: string }>()
  const [category, setCategory] = useState<Category | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string>('')

  useEffect(() => {
    if (id) {
      setLoading(true)
      fetch(`http://localhost:5000/categories/${id}`)
        .then((res) => res.json())
        .then((data) => {
          setCategory(data)
          setLoading(false)
        })
        .catch((error) => {
          setError('Lỗi khi lấy dữ liệu')
          setLoading(false)
          console.error('Error fetching category:', error)
        })
    }
  }, [id])

  if (loading) return <p>Đang tải...</p>
  if (error) return <p>{error}</p>
  if (!category) return <p>Không tìm thấy danh mục</p>

  return (
    <div className='container p-20 grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3'>
      <div className='border-2 border-gray-200 hover:border-gray-400 active:border-gray-600 rounded-lg p-2'>
        {category.products.map((product) => (
          <div key={product.id} className='border p-4 shadow-md rounded-lg'>
            <img src={`images/${product.image}`} alt={product.alt} className='mx-auto object-contain w-80 h-80' />
            <p className='justify-self-center pt-5'>{product.alt}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
