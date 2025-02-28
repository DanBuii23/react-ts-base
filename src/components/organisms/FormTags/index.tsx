import { Form, Input, Button, Modal } from 'antd'
import { useEffect } from 'react'

interface TagFormProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (values: any, onClose: () => void) => Promise<void>
  initialValues?: any
}

const TagForm = ({ isOpen, onClose, onSubmit, initialValues }: TagFormProps) => {
  const [form] = Form.useForm()

  useEffect(() => {
    if (isOpen) {
      console.log('📌 Received initialValues:', initialValues)
      form.setFieldsValue(initialValues || {})
    }
  }, [isOpen, initialValues, form])

  return (
    <Modal title={initialValues?.id ? 'Cập nhật Tag' : 'Thêm Tag'} open={isOpen} onCancel={onClose} footer={null}>
      <Form form={form} onFinish={(values) => onSubmit(values, onClose)} layout='vertical'>
        <Form.Item name='name' label='Tên Tag' rules={[{ required: true, message: 'Vui lòng nhập tên tag!' }]}>
          <Input />
        </Form.Item>

        <Form.Item name='slug' label='Slug' rules={[{ required: true, message: 'Vui lòng nhập slug!' }]}>
          <Input />
        </Form.Item>

        <Form.Item name='featureImage' label='Ảnh nổi bật'>
          <Input />
        </Form.Item>

        <Form.Item>
          <Button type='primary' htmlType='submit' className='w-full'>
            {initialValues?.id ? 'Cập nhật' : 'Thêm mới'}
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default TagForm
