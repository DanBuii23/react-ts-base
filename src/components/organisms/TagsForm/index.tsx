import { Form, Input, Button, Modal } from 'antd'
import { useEffect, useState } from 'react'
import MUploadImage from '../../molecules/MUploadImage'

interface TagFormProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (values: { name: string; slug: string; featureImage?: string }, onClose: () => void) => Promise<void>
  initialValues: { id: string; name: string; slug: string; featureImage?: string }
}

const TagForm = ({ isOpen, onClose, onSubmit, initialValues }: TagFormProps) => {
  const [form] = Form.useForm()
  const [uploading, setUploading] = useState(false)

  useEffect(() => {
    if (isOpen) {
      form.setFieldsValue(initialValues || {})
    } else {
      form.resetFields()
    }
  }, [isOpen, initialValues, form])

  const handleClose = () => {
    form.resetFields()
    onClose()
  }

  return (
    <Modal title={initialValues?.id ? 'Cập nhật Tag' : 'Thêm Tag'} open={isOpen} onCancel={handleClose} footer={null}>
      <Form form={form} name='tagForm' onFinish={(values) => onSubmit(values, handleClose)} layout='vertical'>
        <Form.Item name='name' label='Tên Tag' rules={[{ required: true, message: 'Vui lòng nhập tên tag!' }]}>
          <Input />
        </Form.Item>

        <Form.Item name='slug' label='Slug' rules={[{ required: true, message: 'Vui lòng nhập slug!' }]}>
          <Input />
        </Form.Item>

        {/* Sử dụng MUploadImage thay cho input ảnh */}
        <Form.Item name='featureImage' label='Ảnh đại diện'>
          <MUploadImage
            name='featureImage'
            label='Ảnh đại diện'
            form={form}
            initialValues={initialValues}
            setUploading={setUploading}
          />
        </Form.Item>

        <Form.Item>
          <Button type='primary' htmlType='submit' className='w-full' disabled={uploading}>
            {initialValues?.id ? 'Cập nhật' : 'Thêm mới'}
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default TagForm
