import { Button, ButtonProps } from 'antd'

const MButton = ({ children, ...props }: ButtonProps) => {
  return (
    <Button {...props} className={`py-3 ${props.className || ''}`}>
      {children}
    </Button>
  )
}

export default MButton
