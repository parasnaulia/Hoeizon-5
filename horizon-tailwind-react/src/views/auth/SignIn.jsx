import InputField from "components/fields/InputField";
import { FcGoogle } from "react-icons/fc";
import Checkbox from "components/checkbox";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setName } from "Store/Slice2";
import { setEmail } from "Store/Slice2";
import { setPassword } from "Store/Slice2";
import { useNavigate } from "react-router-dom";
import { add } from "Store/Slice1";
import Cookies from 'js-cookie';
import { useParams } from "react-router-dom";
import { setRole } from "Store/Slice2";

export default function SignIn() {
 const tog= useSelector((state)=>{
    return state.togData
  })

const [data,setData]=  useState(false);
const navigate=useNavigate()
const mainData=useSelector((state)=>{
  return state.cred
});
// console.log(mainData);
const dispatch=useDispatch()
const LogInHandler=()=>{
  // useLatestRef("hELLO")
  // alert("KShkd")
  async function fetching() {
    try{
      const data=await fetch("http://localhost:8000/api/login",
        {
          method:"POST",
          headers:{
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(mainData),

       
       
        }
       
      )
      const resdata=await data.json();
      // console.log(resData.data);
    
      // const resdata=await data.json();
      // console.log(resdata);
      dispatch(setName(resdata.data.Name));
      dispatch(setEmail(resdata.data.Email));
      dispatch(setPassword(resdata.data.Password));
      // dispatch(setRole(resdata.data.Role));
      console.log(resdata.data.Role+"This is The Role")
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
const signUp=()=>{
  // alert("kjdsj")
  // event.preventDefault();
  const posting=async()=>{
    try{
      const data=await fetch("http://localhost:8000/api/signup",
        {
          method:"POST",
          headers:{
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(mainData),

       
       
        }
      )
      const resdata=await data.json();
      console.log("This is sign up res data")
      console.log(resdata);
      dispatch(setName(resdata.data.name));
      dispatch(setEmail(resdata.data.email));
      dispatch(setPassword(resdata.data.password));
      dispatch(setRole(resdata.data.role));
      

      console.log(resdata.data.token)
      dispatch(add(false));
      Cookies.set('jwt',resdata.data.token, {  secure: true, sameSite: 'strict' });

      navigate("/")
     
      


      // console.log("data is send")

    }
    catch(e)
    {
      console.log("There is an error"+e);
      dispatch(add(true))
    }

  }
  posting();




}
const {id}=useParams();
console.log("This sis the is"+id)
  return (
    <div className="mt-16 mb-16 flex h-full w-full items-center justify-center px-2 md:mx-0 md:px-0 lg:mb-10 lg:items-center lg:justify-start">
      {/* Sign in section */}
      <div className="mt-[4vh] w-full max-w-full flex-col items-center md:pl-4 lg:pl-0 xl:max-w-[420px]">
        <h4 className="mb-2.5 text-4xl font-bold text-navy-700 dark:text-white">
         {data===false?" Log In":"Sign In"}
        </h4>
        <p className="mb-9 ml-1 text-base text-gray-600">
          Enter your email and password to sign in!
        </p>
        <div className="mb-6 flex h-[50px] w-full items-center justify-center gap-2 rounded-xl bg-lightPrimary hover:cursor-pointer dark:bg-navy-800">
          <div className="rounded-full text-xl">
            <FcGoogle />
          </div>
          <h5 className="text-sm font-medium text-navy-700 dark:text-white">
            Sign In with Google
          </h5>
        </div>
        <div className="mb-6 flex items-center  gap-3">
          <div className="h-px w-full bg-gray-200 dark:bg-navy-700" />
          <p className="text-base text-gray-600 dark:text-white"> or </p>
          <div className="h-px w-full bg-gray-200 dark:bg-navy-700" />
        </div>
        <div>
          <div className="flex flex-col gap-2">
          <div className="mb-2.5 text-lg font-bold text-navy-700 dark:text-white">
            {
              data&& <InputField
               variant="auth"
               extra="mb-3"
               label="Name*"
               placeholder="Name"
               id="name"
               type="text"
             />
            }

          </div>
       


            </div>
         
        </div>
        {/* Email */}
        <InputField
          variant="auth"
          extra="mb-3"
          label="Email*"
          placeholder="mail@simmmple.com"
          id="email"
          type="text"
        />

        {/* Password */}
        <InputField
          variant="auth"
          extra="mb-3"
          label="Password*"
          placeholder="Min. 8 characters"
          id="password"
          type="password"
        />
        <div className="text-red-500 text-lg" >{tog===true?"Something went wrong":""}</div>
        {/* Checkbox */}
        <div className="mb-4 flex items-center justify-between px-2">
          <div className="flex items-center">
            <Checkbox />
            <p className="ml-2 text-sm font-medium text-navy-700 dark:text-white">
              Keep me logged In
            </p>
          </div>
          <a
            className="text-sm font-medium text-brand-500 hover:text-brand-600 dark:text-white"
            href=" "
          >
            Forgot Password?
          </a>
        </div>
        {data===false?  <button onClick={LogInHandler} className="linear mt-2 w-full rounded-xl bg-brand-500 py-[12px] text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200">
          Log In
        </button>:  <button onClick={signUp} className="linear mt-2 w-full rounded-xl bg-brand-500 py-[12px] text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200">
          Sign In
        </button>}
        <div className="mt-4">
          <span className=" text-sm font-medium text-navy-700 dark:text-gray-600">
            {data===false?"Not registered yet?":"Already Register"}
          </span>
          <span onClick={()=>{
            // alert("asd")
            setData(!data);
          }}
          
            className="ml-1 cursor-pointer text-sm font-medium text-brand-500 hover:text-brand-600 dark:text-white"
          >
            {data===false?"Create an account":"Log In"}
          </span>
        </div>
      </div>
    </div>
  );
}
