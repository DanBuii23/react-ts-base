import { Table } from 'antd'
import { TagDetailType } from '../../../hooks/useTagsService'
import { ColumnsType } from 'antd/es/table'

interface MTableProps {
  columns: ColumnsType<TagDetailType>
  dataSource: TagDetailType[]
  loading?: boolean
  pagination?: false | object
  rowKey?: string
}

const MTable = ({ columns, dataSource, loading, pagination, rowKey = 'id' }: MTableProps) => {
  return <Table columns={columns} dataSource={dataSource} loading={loading} pagination={pagination} rowKey={rowKey} />
}

export default MTable
