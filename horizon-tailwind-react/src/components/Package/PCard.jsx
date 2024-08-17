import React, { useState } from 'react';
import { FaAnglesDown } from "react-icons/fa6";
import { IoMdAddCircleOutline } from "react-icons/io";
import { MdDelete } from "react-icons/md";

const PCard = ({data,setAtt1}) => {
   const [tog,setTog]= useState(false);
  
    console.log("This is Data")
    console.log(data)
    const deletePAckage=()=>{
      
            const deletingData=async()=>{
                try{
                    const data1= await fetch("http://localhost:8000/api/package",{
                        method:"DELETE",
                        headers:{
                            "Content-Type":"application/json"
                        },
                        body:JSON.stringify({name:data.Name})
                    })
                    const dataJson=await data1.json();
                    console.log(dataJson);
                    console.log("Api is Hitted");
                    // window.location.reload();
                    setAtt1();

                }

                catch(e)
                {
                    console.log("there is error in delete Package"+e);
                }
                
            
        }
        deletingData();
       


        }

        
       
     
        
    
  return (
    <div className='mt-5 flex flex-col justify-center items-center border-4 p-4 w-[50vw] gap-4 text-xl font-bold'>
        <div className='flex justify-between items-center w-[100%]'>
            <div>{data.Name}</div>
            <div className='flex justify-between items-center gap-2 text-navy-500 text-4xl'>
                <div className='cursor-pointer'><IoMdAddCircleOutline onClick={()=>{
                    alert("Hello")
                }} /></div>
                <div  className='cursor-pointer'><MdDelete onClick={deletePAckage}/></div>
            </div>
            
        </div>
        <div className='text-navy-500 text-lg cursor-pointer flex gap-2 items-center justify-center' onClick={()=>{setTog(!tog)}}>
            <div>Show Details</div>
            <div><FaAnglesDown/></div>
            
         </div>
     




        {tog===true&&<div className=' flex flex-col border-4 w-[70%] gap-3 p-3'  >
            <div className='flex justify-between items-center text-bold '>


            <div>Start</div>
            <div> End</div>
            </div>
            
           <div className='flex justify-between items-center font-light'>
            <div>{data.Start_Date}</div>
            <div> {data.End_Date}</div>

           </div>
           <div className='flex justify-between items-center font-light'>
            <div>{data.Start_Time}<span className='ml-2'>AM</span></div>
            <div>{data.End_Time} <span className='mr-2'>PM</span></div>
           </div>
           <div className='font-light m-auto'>   <span className='font-bold mr-3' >Total Projects Allowed</span>{data.Project}</div>
           <div className='font-light m-auto'>  <span className='font-bold mr-3' >Total Users Allowed</span>{data.Users}</div>
        </div>}

      
    </div>
  )
}

export default PCard
