import { Input } from 'antd'

interface CustomInputProps {
  label: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const MInput = ({ label, value, onChange }: CustomInputProps) => {
  return (
    <div className='mb-4'>
      <label className='block text-gray-700 font-semibold mb-1'>{label}</label>
      <Input value={value} onChange={onChange} />
    </div>
  )
}

export default MInput
