import { Button, ButtonProps } from 'antd'

interface MButtonProps extends ButtonProps {}

const MButton = ({ children, ...props }: MButtonProps) => {
  return <Button {...props}>{children}</Button>
}

export default MButton
