import { Form, Input, Button, Modal } from 'antd'
import { useEffect } from 'react'
import { useForm } from 'antd/es/form/Form'

interface TagFormProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (values: any, onClose: () => void) => void
  initialValues?: any
}

const TagForm = ({ isOpen, onClose, onSubmit, initialValues }: TagFormProps) => {
  const [form] = useForm()

  useEffect(() => {
    console.log('🔄 Received initialValues:', initialValues) // ✅ Debug
    if (initialValues) {
      form.setFieldsValue(initialValues)
    } else {
      form.resetFields()
    }
  }, [initialValues, form])

  return (
    <Modal
      title={initialValues ? 'Cập nhật Tag' : 'Thêm Tag'}
      open={isOpen}
      onCancel={onClose}
      footer={null}
      destroyOnClose
    >
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
            {initialValues ? 'Cập nhật' : 'Thêm mới'}
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default TagForm
