import React from 'react'
import { IoMdAdd } from 'react-icons/io'

const Buttton = ({name}) => {
    let pp='';
    if(name==="Add")
    {
        pp=""
    }
    else
    {
        pp=<IoMdAdd className="text-white" />
    }
  return (
    <div>
        <div className="font-bold text-xl bg-blueSecondary  rounded-xl p-1 cursor-pointer" >
              <div className="flex items-center justify-center">
              {/* <IoMdAdd className="text-white" /> */}
              {pp}
           
              <button className="bg-blueSecondary text-white"> {name}</button>
                
            </div>   
            </div>
                
      
    </div>
  )
}

export default Buttton
