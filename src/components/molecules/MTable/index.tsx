import { Table } from 'antd'

interface MTableProps {
  columns: Array<{ title: string; dataIndex: string; key: string }>
  dataSource: Array<{ [key: string]: string | number | boolean | object }>
  loading?: boolean
  pagination?: false | object
  rowKey?: string
}

const MTable = ({ columns, dataSource, loading, pagination, rowKey = 'id' }: MTableProps) => {
  return <Table columns={columns} dataSource={dataSource} loading={loading} pagination={pagination} rowKey={rowKey} />
}

export default MTable
