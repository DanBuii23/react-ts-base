import { Form, Input, FormProps, Upload } from 'antd'
import { UploadOutlined } from '@ant-design/icons'
import { MButton } from '../../atoms'

interface MFormProps extends FormProps {
  loading?: boolean
  fields: {
    label: string
    name: string
    type?: 'text' | 'password' | 'file'
    rules?: object[]
  }[]
  buttonText?: string
}

const MForm = ({ loading, fields, buttonText = 'Submit', ...formProps }: MFormProps) => {
  return (
    <Form {...formProps} layout='vertical'>
      {fields.map(({ label, name, type = 'text', rules }) => (
        <Form.Item
          key={name}
          label={label}
          name={name}
          rules={rules}
          valuePropName={type === 'file' ? 'fileList' : 'value'}
        >
          {type === 'password' ? (
            <Input.Password />
          ) : type === 'file' ? (
            <Upload beforeUpload={() => false} listType='picture'>
              <MButton icon={<UploadOutlined />}>Upload</MButton>
            </Upload>
          ) : (
            <Input />
          )}
        </Form.Item>
      ))}
      <MButton type='primary' htmlType='submit' block loading={loading}>
        {buttonText}
      </MButton>
    </Form>
  )
}

export default MForm
