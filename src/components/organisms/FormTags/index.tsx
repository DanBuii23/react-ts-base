import { Form, Input, Button, Modal } from 'antd'

interface TagFormProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (values: any) => void
  initialValues?: any
}

const TagForm = ({ isOpen, onClose, onSubmit, initialValues }: TagFormProps) => {
  return (
    <Modal title={initialValues ? 'Cập nhật Tag' : 'Thêm Tag'} open={isOpen} onCancel={onClose} footer={null}>
      <Form onFinish={onSubmit} initialValues={initialValues || {}} layout='vertical'>
        <Form.Item name='name' label='Tên Tag' rules={[{ required: true, message: 'Vui lòng nhập tên tag!' }]}>
          <Input />
        </Form.Item>

        <Form.Item name='slug' label='Slug' rules={[{ required: true, message: 'Vui lòng nhập slug!' }]}>
          <Input />
        </Form.Item>

        <Form.Item name='description' label='Mô tả'>
          <Input.TextArea rows={2} />
        </Form.Item>

        <Form.Item name='featureImage' label='Ảnh nổi bật'>
          <Input />
        </Form.Item>

        <Form.Item name='iconUrl' label='Icon URL'>
          <Input />
        </Form.Item>

        <Form.Item name='metaDescription' label='Meta Description'>
          <Input.TextArea rows={2} />
        </Form.Item>

        <Form.Item name='metaTitle' label='Meta Title'>
          <Input />
        </Form.Item>

        <Form.Item name='ogDescription' label='OG Description'>
          <Input.TextArea rows={2} />
        </Form.Item>

        <Form.Item name='ogImage' label='OG Image'>
          <Input />
        </Form.Item>

        <Form.Item name='ogTitle' label='OG Title'>
          <Input />
        </Form.Item>

        <Form.Item name='twitterDescription' label='Twitter Description'>
          <Input.TextArea rows={2} />
        </Form.Item>

        <Form.Item name='twitterImage' label='Twitter Image'>
          <Input />
        </Form.Item>

        <Form.Item name='twitterTitle' label='Twitter Title'>
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
