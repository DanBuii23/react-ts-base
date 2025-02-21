import { Form, Input, FormProps } from 'antd'
import { MButton } from '../../atoms'

interface MFormProps extends FormProps {
  loading?: boolean
  fields: {
    label: string
    name: string
    type?: 'text' | 'password'
    rules?: object[]
  }[]
  buttonText?: string
}

const MForm = ({ loading, fields, buttonText = 'Submit', ...formProps }: MFormProps) => {
  return (
    <Form {...formProps} layout='vertical'>
      {fields.map(({ label, name, type = 'text', rules }) => (
        <Form.Item key={name} label={label} name={name} rules={rules}>
          {type === 'password' ? <Input.Password /> : <Input />}
        </Form.Item>
      ))}
      <MButton type='primary' htmlType='submit' block loading={loading}>
        {buttonText}
      </MButton>
    </Form>
  )
}

export default MForm
