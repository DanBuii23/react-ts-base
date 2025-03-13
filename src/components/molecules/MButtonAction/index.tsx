import { Button, Popconfirm } from 'antd'
import { memo } from 'react'

interface MActionButtonsProps {
  onDetail: () => void
  onEdit: () => void
  onDelete: () => void
}

const MActionButtons = ({ onDetail, onEdit, onDelete }: MActionButtonsProps) => {
  return (
    <div className='flex gap-2'>
      <Button onClick={onDetail}>Chi tiết</Button>
      <Button type='primary' onClick={onEdit}>
        Sửa
      </Button>
      <Popconfirm title='Bạn có chắc chắn muốn xóa?' onConfirm={onDelete}>
        <Button danger>Xóa</Button>
      </Popconfirm>
    </div>
  )
}

export default memo(MActionButtons)
