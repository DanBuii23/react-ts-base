import React, { useState, useEffect } from 'react'
import { FormInstance, Upload, UploadFile, message } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { useUploadImage } from '../../../hooks/useUploadImage'

interface MUploadImageProps {
  name: string
  label: string
  form: FormInstance
  initialValues?: { featureImage?: string }
  setUploading: React.Dispatch<React.SetStateAction<boolean>>
  onUploadSuccess?: (imageUrl: string) => void
}

const MUploadImage: React.FC<MUploadImageProps> = ({ name, initialValues, form, setUploading }) => {
  const [fileList, setFileList] = useState<UploadFile[]>([])

  const { mutate, isPending, isError, isSuccess, data } = useUploadImage()

  // Khi ảnh được chọn, cập nhật fileList và gọi API upload
  const handleChange = ({ fileList: newFileList }: { fileList: UploadFile[] }) => {
    setFileList(newFileList)

    const file = newFileList[0]?.originFileObj
    if (file) {
      setUploading(true)
      mutate(file)
    }
  }

  // Xóa ảnh khỏi danh sách
  const handleRemove = () => {
    setFileList([])
    form.setFieldsValue({ [name]: undefined })
  }

  // Gán giá trị ảnh mặc định từ `initialValues`
  useEffect(() => {
    if (initialValues?.featureImage) {
      setFileList([
        {
          uid: '-1',
          name: 'feature-image.jpg',
          status: 'done',
          url: initialValues.featureImage
        }
      ])
    }
  }, [initialValues])

  // Xử lý khi upload thành công hoặc thất bại
  useEffect(() => {
    if (isSuccess && data) {
      form.setFieldsValue({ [name]: data })
      setFileList([
        {
          uid: '-1',
          name: 'uploaded-image.jpg',
          status: 'done',
          url: data
        }
      ])
      setUploading(false)
      message.success('Tải ảnh lên thành công!')
    } else if (isPending) {
      setUploading(true)
    } else if (isError) {
      message.error('Tải ảnh lên thất bại! Vui lòng thử lại.')
      setUploading(false)
    }
  }, [isPending, isError, isSuccess, data, form])

  return (
    <Upload
      listType='picture-circle'
      fileList={fileList}
      maxCount={1}
      onChange={handleChange}
      onRemove={handleRemove}
      beforeUpload={() => false} // Ngăn Ant Design tự upload
    >
      {fileList.length === 0 && (
        <div>
          <PlusOutlined />
          <div className='mt-8'>Tải ảnh lên</div>
        </div>
      )}
    </Upload>
  )
}

export default MUploadImage
