import React from 'react'

const Inputbox = ({name,label,place,setData1,type}) => {
  return (
    <div className='mb-3 w-full p-1'>
        <div> <div className='text-sm text-gray-900 font-semibold'>{label}*</div></div>
        <div className='border-2 rounded-md '>
        <input type={type} onChange={setData1} placeholder={place} className='px-2 py-3 w-11/12 focus:outline-none focus:ring-0' />

        </div>
    
      
    </div>
  )
}

export default Inputbox
