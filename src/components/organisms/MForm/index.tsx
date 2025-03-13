import { Form, Input, Button, FormProps } from 'antd'
import { useEffect, useState } from 'react'
import MUploadImage from '../../molecules/MUploadImage'

interface MFormProps extends FormProps {
  loading?: boolean
  fields: {
    label: string
    name: string
    type?: 'text' | 'password' | 'upload'
    rules?: object[]
  }[]
  buttonText?: string
}
const MForm = ({ loading, fields, buttonText = 'Submit', initialValues = {}, ...formProps }: MFormProps) => {
  const [form] = Form.useForm()
  const [uploading, setUploading] = useState(false)

  useEffect(() => {
    form.setFieldsValue(initialValues || { name: '', slug: '', featureImage: '' })
  }, [initialValues, form])

  return (
    <Form form={form} layout='vertical' {...formProps} initialValues={initialValues ?? {}}>
      {fields.map(({ label, name, type = 'text', rules }) => (
        <Form.Item key={name} label={label} name={name} rules={rules}>
          {(() => {
            switch (type) {
              case 'password':
                return <Input.Password />
              case 'upload':
                return (
                  <MUploadImage
                    key={initialValues?.id || ''}
                    name={name}
                    label={label}
                    form={form}
                    initialValues={initialValues}
                    setUploading={setUploading}
                  />
                )
              default:
                return <Input />
            }
          })()}
        </Form.Item>
      ))}

      <Form.Item>
        <Button type='primary' htmlType='submit' block loading={loading || uploading}>
          {buttonText}
        </Button>
      </Form.Item>
    </Form>
  )
}

export default MForm
