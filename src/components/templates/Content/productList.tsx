import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useCategory } from '../../../contexts/CategoryContext'
import { MButton } from '../../atoms'
import MInput from '../../atoms/MInput'
import { message } from 'antd'
const ProductList = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { categories, addProduct } = useCategory()
  const category = categories.find((cat) => cat.id === id) || null
  const [showForm, setShowForm] = useState(false)
  const [newProduct, setNewProduct] = useState({ alt: '', image: '' })
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [error, setError] = useState<string | null>(null)
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setImageFile(file)
      setNewProduct((prev) => ({ ...prev, image: URL.createObjectURL(file) }))
      setError(null)
    }
  }
  const handleAddProduct = () => {
    if (!newProduct.image.trim() || !imageFile) {
      setError('Vui lòng chọn ảnh!')
      return
    }
    addProduct(id!, newProduct)
    setShowForm(false)
    setNewProduct({ alt: '', image: '' })
    setImageFile(null)
    setError(null)
    message.success('Thêm sản phẩm thành công')
  }
  if (!category) {
    return <p className='text-center p-4 text-red-500'>Danh mục không tồn tại!</p>
  }
  return (
    <div className='container p-6'>
      <div className='flex justify-between p-6'>
        <h1 className='text-2xl font-bold'>{category.name}</h1>
        <MButton type='primary' onClick={() => setShowForm(!showForm)}>
          Thêm sản phẩm
        </MButton>
      </div>
      {showForm && (
        <div className='mt-4 p-4 border rounded-lg shadow-md'>
          <MInput
            label='Tên sản phẩm'
            value={newProduct.alt}
            onChange={(e) => setNewProduct({ ...newProduct, alt: e.target.value })}
          />
          <input
            type='file'
            accept='image/png, image/jpeg, image/jpg'
            onChange={handleImageChange}
            className='border p-2 w-full mb-2'
            placeholder='picture'
          />
          {imageFile && (
            <div className='mt-2'>
              <p className='text-sm'>Ảnh xem trước:</p>
              <img src={URL.createObjectURL(imageFile)} alt='Preview' className='w-32 h-32 object-cover border' />
            </div>
          )}
          {error && <p className='text-red-500 text-sm mb-2'>{error}</p>}
          <MButton type='primary' onClick={handleAddProduct}>
            Thêm
          </MButton>
        </div>
      )}
      <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
        {category.products.map((product) => (
          <div className='border border-gray-300 hover:border-gray-500 rounded-lg p-4 shadow-md' key={product.id}>
            <img src={product.image} alt={product.alt} className='mx-auto object-contain w-60 h-60' />
            <p className='text-center font-semibold mt-2'>{product.alt}</p>
            <div className='flex gap-1 p-1'>
              <MButton
                block
                type='default'
                className='border shadow-md'
                onClick={() => navigate(`/categories/${id}/products/${product.id}`)}
              >
                Xem chi tiết
              </MButton>
              <MButton block type='primary'>
                Mua ngay
              </MButton>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
export default ProductList
