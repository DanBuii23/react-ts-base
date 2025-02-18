import React, { useEffect, useState } from 'react'
import { Card, Statistic, Spin, message } from 'antd'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import imgContent from '../../../../public/images/bgtechno.jpg'

const HomePage = () => {
  // const [categoryCounts, setCategoryCounts] = useState<{ id: string; name: string; count: number }[]>([])
  // const [loading, setLoading] = useState(true)

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       setLoading(true)
  //       const response = await fetch('http://localhost:5000/categories')
  //       if (!response.ok) throw new Error('Failed to fetch data')
  //       const data = await response.json()

  //       const formattedData = data.map((item: { id: string; category: string; count: number }) => ({
  //         id: item.id,
  //         name: item.category,
  //         count: item.count
  //       }))

  //       setCategoryCounts(formattedData)
  //     } catch (error) {
  //       message.error('Lỗi khi tải dữ liệu!')
  //     } finally {
  //       setLoading(false)
  //     }
  //   }

  //   fetchData()
  // }, [])

  // return (
  //   <div className='p-4'>
  //     {loading ? (
  //       <div className='flex justify-center items-center h-40'>
  //         <Spin size='large' />
  //       </div>
  //     ) : (
  //       <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
  //         {/* Thẻ thống kê tổng số sản phẩm theo danh mục */}
  //         {categoryCounts.map((item) => (
  //           <Card key={item.id} className='shadow-lg rounded-xl'>
  //             <Statistic title={item.name} value={item.count} />
  //           </Card>
  //         ))}

  //         {/* Biểu đồ thống kê số lượng sản phẩm */}
  //         <div className='col-span-1 md:col-span-2 lg:col-span-4 h-64 bg-white rounded-xl shadow-md p-4'>
  //           <ResponsiveContainer width='100%' height='100%'>
  //             <BarChart data={categoryCounts}>
  //               <XAxis dataKey='name' />
  //               <YAxis />
  //               <Tooltip />
  //               <Bar dataKey='count' fill='#1677ff' radius={[5, 5, 0, 0]} />
  //             </BarChart>
  //           </ResponsiveContainer>
  //         </div>
  //       </div>
  //     )}
  //   </div>
  // )
  return (
    <div className='p-4'>
      <div className='relative font-bold text-6xl'>
        <img src={imgContent} alt='Content' className='bg-center flex items-center h-screen' />
        <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
          <h1 className='text-sky-800'>Welcome to Techno</h1>
          <p className='text-sky-600'>The best place to buy electronics</p>
        </div>
      </div>
      <div className='grid grid-cols-3 gap-4'>
        <div className='bg-sky-100 border-sky-500 hover:border-blue-500 rounded-lg p-4 m-6 flex flex-1 justify-center'>
          <div className='text-2xl font-bold'>Tín nhiệm</div>
        </div>
        <div className='bg-sky-100 border-sky-500 hover:border-blue-500 rounded-lg p-4 m-6 flex flex-1 justify-center'>
          <div className='text-2xl font-bold'>Thân thiện</div>
        </div>
        <div className='bg-sky-100 border-sky-500 hover:border-blue-500 rounded-lg p-4 m-6 flex flex-1 justify-center'>
          <div className='text-2xl font-bold'>Sáng tạo</div>
        </div>
      </div>
    </div>
  )
}

export default HomePage
