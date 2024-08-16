import React, { useState } from 'react'
import { IoIosArrowBack } from "react-icons/io";
import { FcGoogle } from "react-icons/fc";
import Inputbox from './Inputbox';
import Cookies from 'js-cookie';
import { FaCheck } from "react-icons/fa";
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setName } from 'Store/Slice2';
import { setEmail } from 'Store/Slice2';
import { setPassword } from 'Store/Slice2';
import { add } from 'Store/Slice1';
import { setRole } from 'Store/Slice2';
import { useLatestRef } from '@chakra-ui/hooks';

const Login = () => {
const navigate=  useNavigate();
const dispatch=useDispatch();
const [email,setEmail]=useState("");
const [password,setPassword]=useState("");
const [name,setName]=useState("");
const [error,setError]=useState(true)


const setEmail1=(e)=>{
  console.log(e.target.value)
  setEmail(e.target.value)
}

const setPassword1=(e)=>{
  console.log("this is data pass"+e.target.value)
  setPassword(e.target.value)
}

const setName1=(e)=>{
  console.log("this is data name"+e.target.value)
  setName(e.target.value)
}


    const {id}=useParams();
    // alert(id);
   const [tog,setTog]= useState(false);
   const [sign,setSignup]=useState(true);
   const signupHandler=()=>{
    // alert("Ohh Bhai")



    const posting1=async()=>{
     
      try{
        
  
    
        const data=await fetch(`http://localhost:8000/api/signupD/${id}`,
          {
            method:"POST",
            headers:{
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({name:name,email:email,password:password}),
  
         
         
          }
        )
       
       
        const resdata=await data.json();
       
      
        console.log("This is res data")
        console.log(resdata);
      
        // dispatch(setName(resdata.data.Name));
        // dispatch(setEmail(resdata.data.Email));
        // dispatch(setPassword(resdata.data.Password));
        // dispatch(setRole(resdata.data.Role));
        
        alert("try");
     
        // console.log(resdata.data.token)
        // dispatch(add(false));
        Cookies.set('jwt',resdata.data.token, {  secure: true, sameSite: 'strict' });
       
        // useLatestRef("dsf")
        console.log("data is send")
       

    
        navigate("/")

       
        
  
  
     
      }
      catch(e)
      {
        alert("catch")
        console.log("There is an error"+e);
        // dispatch(add(true));
      
     

      }
  
    }
    posting1();
   }



const loginhandler=()=>{
  async function fetching() {
    try{
      const data=await fetch("http://localhost:8000/api/login",
        {
          method:"POST",
          headers:{
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({name:"paras"}),

       
       
        }
       
      )
      const resdata=await data.json();
      // console.log(resData.data);
    
      // const resdata=await data.json();
      // console.log(resdata);
      // dispatch(setName(resdata.data.Name));
      dispatch(setEmail(resdata.data.Email));
      dispatch(setPassword(resdata.data.Password));
      Cookies.set('jwt',resdata.data.token, {  secure: true, sameSite: 'strict' });

      dispatch(add(false))
      navigate("/");
      
      


      // console.log("data is send")

    }
    catch(e)
    {
     
      dispatch(add(true))
      console.log("There is an error"+e);
    }

    
  }
  fetching();
}


  return (
    <>    <div className='flex  justify-between p-0  m-0'>
        <div className='flex flex-col  pl-10 w-2/5'>
            <div className='mb-20  flex gap-2 justify-center items-center text-gray-400 text-sm'>
                <div>
                <IoIosArrowBack />
                    </div>
                    <div className='cursor-pointer' >
                    Back to dashboard

                    </div>
              
                    </div>
            <div className='mt-[10vh] w-full max-w-full flex-col items-center md:pl-8 lg:pl-0 xl:max-w-[420px] '>
            <h4 className="mb-2.5 text-4xl font-bold text-navy-700 dark:text-white">
          {sign===true?"Sign In":"login"}
        </h4>

            </div>
            <div className='mt-2 text-gray-400' >Enter your email and password to sign in!</div>
            <div className='mt-6 flex justify-center items-center cursor-pointer  bg-gray-100 px-5 py-3 gap-2 rounded-md'>
                <div><FcGoogle /></div>
            <h5 className="text-sm font-medium text-navy-700 dark:text-white ">
            Sign In with Google
          </h5>
            </div>
            <div className="mb-5 flex items-center  gap-3 mt-3">
          <div className="h-px w-full bg-gray-200 dark:bg-navy-700" />
          <p className="text-base text-gray-600 dark:text-white"> or </p>
          <div className="h-px w-full bg-gray-200 dark:bg-navy-700" />
        </div>
            <div className='bg-gray-100 dark:text-white' >
            {sign===true?<Inputbox place="Name" label="Name" type="text" setData1={setName1} />:null}
               <Inputbox setData1={setEmail1} type="text" place="mail@sample.com" label="Email"  />
               <Inputbox setData1={setPassword1} type="text" place="Min .8 Characters" label="Password"/>
             
            </div>
            <div className='mt-2 flex justify-between p-1'>
                <div className={`flex gap-1 justify-center items-center cursor-pointer` }>
                    <div className={` border-2 ${tog ? 'bg-blue-600' : 'bg-white'}`} onClick={()=>{
                        setTog(!tog)
                    }}><div ><FaCheck color='white' size={20}className='p-1' /></div></div>
                    <div> <span className=" text-sm font-medium  dark:text-gray-600">
                        Keep me Login
          </span></div>

                </div>
                <div className='text-red-600'>{error}</div>
                <div className="text-sm font-medium text-brand-500 hover:text-brand-600 text-blue-700  cursor-pointer">Forgot Password?</div>

            </div>
            <div className='mt-4  cursor-pointer'>
                <div>
                  {sign===true? <button onClick={signupHandler} className="linear mt-2 w-full rounded-xl bg-brand-500 py-[12px] text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200">
          Sign In
        </button>: <button onClick={loginhandler} className="linear mt-2 w-full rounded-xl bg-brand-500 py-[12px] text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200">
          Log In
        </button>   }
               </div>

                </div>
                <div className='text-sm font-medium text-navy-700 flex gap-2 dark:text-gray-600 mt-3'> <span className="cursor-pointer">
           {sign===false?"Not registered yet":"Alerady a user"}
          </span>  <div
            
            className="ml-1 text-sm font-medium text-brand-500 hover:text-brand-600 dark:text-white"
             onClick={()=>{setSignup(!sign)}}  >
            {sign===false?<span className='cursor-pointer'>Create an account</span>:<span className='cursor-pointer'>Log In</span>}
          </div></div>
          <div className='flex justify-center items-center mt-8 text-gray-400'>
            <div>©2024 Horizon UI. All Rights Reserved.</div>
          </div>
                
            
        </div>
        
    <div className="flex justify-end items-center flex-col   mb-8 w-[60%]">
  <div className="flex-shrink-0 w-full h-full flex justify-end  ">
    <img src="../../../auth.png" className='w-[75%] h-[98vh] object-cover rounded-bl-[35%]' alt="Auth Image" />
  </div>
 

</div>

      
    </div>
   
    </>

  )
}

export default Login
