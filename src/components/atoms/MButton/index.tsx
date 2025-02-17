import { Button, ButtonProps } from 'antd'

const MButton = ({ children, ...props }: ButtonProps) => {
  return <Button {...props}>{children}</Button>
}

export default MButton
