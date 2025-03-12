import { Form, Input, Button, Modal, FormProps } from 'antd'
import { useEffect, useState } from 'react'
import MUploadImage from '../../molecules/MUploadImage'

interface MFormProps extends FormProps {
  isOpen?: boolean
  onClose?: () => void
  modalTitle?: string
  loading?: boolean
  fields: {
    label: string
    name: string
    type?: 'text' | 'password' | 'upload'
    rules?: object[]
  }[]
  buttonText?: string
  // initialValues?: Record<string, any>
  resetOnOpen?: boolean
}

const MForm = ({
  isOpen,
  onClose,
  modalTitle,
  loading,
  fields,
  buttonText = 'Submit',
  initialValues = {},
  ...formProps
}: MFormProps) => {
  const [form] = Form.useForm()
  const [uploading, setUploading] = useState(false)

  useEffect(() => {
    if (isOpen) {
      form.setFieldsValue(initialValues || { name: '', slug: '', featureImage: '' }) // Reset nếu thêm mới
    } else {
      form.resetFields()
    }
  }, [isOpen, initialValues, form])

  const handleClose = () => {
    form.resetFields()
    onClose?.()
  }

  const formContent = (
    <Form form={form} layout='vertical' {...formProps}>
      {fields.map(({ label, name, type = 'text', rules }) => (
        <Form.Item key={name} label={label} name={name} rules={rules}>
          {type === 'password' ? (
            <Input.Password />
          ) : type === 'upload' ? (
            <MUploadImage
              key={initialValues?.id || ''}
              name={name}
              label={label}
              form={form}
              initialValues={initialValues}
              setUploading={setUploading}
            />
          ) : (
            <Input />
          )}
        </Form.Item>
      ))}

      <Form.Item>
        <Button type='primary' htmlType='submit' block loading={loading || uploading}>
          {buttonText}
        </Button>
      </Form.Item>
    </Form>
  )

  return isOpen !== undefined ? (
    <Modal title={modalTitle} open={isOpen} onCancel={handleClose} footer={null}>
      {formContent}
    </Modal>
  ) : (
    formContent
  )
}

export default MForm
