import imgContent from '../../../../public/images/bgtechno.jpg'
import imgTech from '../../../../public/images/login.jpg'
import imgJ97 from '../../../../public/images/j97.jpg'

const HomePage = () => {
  return (
    <div className='p-4'>
      <div className='relative font-bold text-6xl'>
        <img src={imgContent} alt='Content' className='bg-center flex items-center w-screen' />
        <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
          <h1 className='text-sky-800'>Welcome to Techno</h1>
          <p className='text-sky-600'>The best place to buy electronics</p>
        </div>
      </div>
      <div className='grid grid-cols-2 gap-2'>
        <div className='bg-green-200 border-green-500 hover:border-blue-500 rounded-lg p-4 m-6 flex flex-1 justify-center cursor-default'>
          <img src={imgTech} alt='Tech' className='object-fill' />
        </div>
        <div className='bg-green-200 border-green-500 hover:border-blue-500 rounded-lg p-4 m-6 flex flex-1 justify-center cursor-default'>
          <img src={imgJ97} alt='Tech' className='object-fill' />
        </div>
      </div>
      <div className='grid grid-cols-3 gap-4'>
        <button className='bg-sky-100 border-sky-500 hover:border-blue-500 rounded-lg p-4 m-6 flex flex-1 justify-center cursor-default'>
          <div className='text-2xl font-bold'>Tín nhiệm</div>
        </button>
        <button className='bg-sky-100 border-sky-500 hover:border-blue-500 rounded-lg p-4 m-6 flex flex-1 justify-center cursor-default'>
          <div className='text-2xl font-bold'>Thân thiện</div>
        </button>
        <button className='bg-sky-100 border-sky-500 hover:border-blue-500 rounded-lg p-4 m-6 flex flex-1 justify-center cursor-default'>
          <div className='text-2xl font-bold'>Sáng tạo</div>
        </button>
      </div>
    </div>
  )
}

export default HomePage
