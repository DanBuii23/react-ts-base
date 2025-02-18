import React from 'react'
import { Footer } from 'antd/es/layout/layout'

const AppFooter = () => {
  return (
    <>
      <Footer className='mt-1'>
        <div className='mx-auto h-max flex'>
          <div className='basis-1/2'>
            <h2 className='text-2xl'>Address: </h2>
            <h2 className='text-2xl'>Email: </h2>
            <h2 className='text-2xl'>Phone: </h2>
          </div>
          <div className='basis-1/2'>
            <h2 className='text-2xl'>Social: </h2>
            <div className='flex gap-2'>
              <img src='' alt='facebook' />
              <img src='' alt='youtube' />
              <img src='' alt='tiktok' />
            </div>
          </div>
        </div>
        <div className='text-thin'>@no copyright</div>
      </Footer>
    </>
  )
}

export default AppFooter
