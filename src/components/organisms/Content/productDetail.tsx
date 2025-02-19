import React, { useState } from 'react'
import { Modal, message } from 'antd'
import { useParams, useNavigate } from 'react-router-dom'
import { MButton } from '../../atoms'
import { useCategory } from '../../../contexts/CategoryContext'
import MInput from '../../atoms/MInput'

const ProductDetail = () => {
  const { id, productId } = useParams<{ id: string; productId: string }>()
  const navigate = useNavigate()
  const { categories, updateProduct, deleteProduct } = useCategory()

  const category = categories.find((c) => c.id === id)
  const product = category?.products.find((p) => p.id.toString() === productId) || null

  const [productName, setProductName] = useState(product?.alt || '')
  const [productImage, setProductImage] = useState(product?.image || '')
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [error, setError] = useState<string | null>(null)

  if (!category) {
    return <p className='text-center text-red-500'>Danh mục không tồn tại!</p>
  }

  if (!product) {
    return <p className='text-center text-red-500'>Không tìm thấy sản phẩm!</p>
  }

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setImageFile(file)
      setProductImage(URL.createObjectURL(file))
      setError(null)
    }
  }

  const handleUpdate = () => {
    if (!productName.trim() || (!productImage.trim() && !imageFile)) {
      setError('Vui lòng nhập đầy đủ thông tin!')
      return
    }

    Modal.confirm({
      title: 'Xác nhận',
      content: 'Bạn có chắc chắn muốn sửa sản phẩm này?',
      okText: 'Đồng ý',
      cancelText: 'Hủy',
      onOk: async () => {
        await updateProduct(id!, product.id, { id: product.id, alt: productName, image: productImage })
        message.success('Cập nhật sản phẩm thành công!')
        navigate(`/categories/${id}`)
      }
    })
  }

  const handleDelete = () => {
    Modal.confirm({
      title: 'Xác nhận',
      content: 'Bạn có chắc chắn muốn xóa sản phẩm này?',
      okText: 'Đồng ý',
      cancelText: 'Hủy',
      onOk: async () => {
        await deleteProduct(id!, product.id)
        message.success('Xóa sản phẩm thành công!')
        navigate(`/categories/${id}`)
      }
    })
  }

  return (
    <div className='p-6 border rounded-lg shadow-lg bg-white max-w-lg mx-auto'>
      <div className='flex justify-between'>
        <h2 className='text-2xl font-bold mb-4 text-center'>Chi tiết sản phẩm</h2>
        <MButton type='default' onClick={() => navigate(`/categories/${id}`)}>
          Quay lại
        </MButton>
      </div>

      <MInput label='Tên sản phẩm' value={productName} onChange={(e) => setProductName(e.target.value)} />

      <input
        type='file'
        accept='image/png, image/jpeg, image/jpg'
        onChange={handleImageChange}
        className='border p-2 w-full mb-2'
      />

      {productImage && (
        <div className='mt-2 text-center'>
          <p className='text-sm'>Ảnh xem trước:</p>
          <img src={productImage} alt='Preview' className='w-40 h-40 object-cover border mx-auto' />
        </div>
      )}

      {error && <p className='text-red-500 text-sm mt-2'>{error}</p>}

      <div className='flex gap-2 mt-4 justify-center'>
        <MButton type='primary' onClick={handleUpdate}>
          Lưu thay đổi
        </MButton>
        <MButton type='default' danger onClick={handleDelete}>
          Xóa
        </MButton>
      </div>
    </div>
  )
}

export default ProductDetail
