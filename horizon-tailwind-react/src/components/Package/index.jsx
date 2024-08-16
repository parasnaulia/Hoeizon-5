import InputField from "components/fields/InputField";
import Button from "../Button/Buttton"
import React, { useEffect, useState } from 'react';
import Inputbox from "layouts/auth/Inputbox";
import { useDispatch, useSelector } from "react-redux";
import { AddPackage } from "Store/Package";
import PCard from "./PCard";


const Index = () => {
    const [tog,setTog]=useState(false);
  const packageData=  useSelector((state)=>{
        return state.Package
    })
   const dispatch= useDispatch();

    const handleButton=()=>{
        setTog(!tog);
       
     
    }
    const [packageName,setPackageName]=useState("");
    const [startDate,setStartDate]=useState("");
    const [endDate,setEndDate]=useState("");
    const [startTime,setStartTime]=useState("");
    const [endTime,setEndTime]=useState("");
    const [projects,setProjects]=useState("");
    const [users,setUsers]=useState("");



    const setDataPackageName=(e)=>{
        console.log("name"+e.target.value)
        setPackageName(e.target.value);
    }
    const dataStartDate=(e)=>{
        console.log("date "+e.target.value)
        setStartDate(e.target.value);
    }
    const dataEndDate=(e)=>{
        setEndDate(e.target.value);
    }
    const dataStartTime=(e)=>{
        console.log("Time"+e.target.value)
        setStartTime(e.target.value);
    }
    const dataEndTime=(e)=>{
        setEndTime(e.target.value)
    }
    const dataSetProjects=(e)=>{
        setProjects(e.target.value);
    }
    const dataUsers=(e)=>{
        setUsers(e.target.value);
    }



    useEffect(()=>{
        const fetchingPackages=async()=>{
            try{
                const data=await fetch("http://localhost:8000/api/package");
                const jsonData=await data.json();
                console.log(jsonData.data);
                console.log("done");
                dispatch(AddPackage(jsonData.data));


            }
            catch(e)
            {
                console.log("There is an Error in fetching the Package "+e);
            }
          


        }
        fetchingPackages();

    },[])




const SubmitPackage=()=>{
    // alert("Hello");
    const packageDataSubmit=async()=>{

        try{
            const data=await fetch("http://localhost:8000/api/package",{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({Name:packageName,Start_date:startDate,End_date:endDate,Start_Time:startTime,endTime:endTime,Project:projects,Users:users})
            });
            const resData=await data.json();
            
            console.log(resData);

        }
        catch(e)
        {
            console.log("This is Sending package Error "+e);

        }
        

    }
    packageDataSubmit()
}


  return (
    <div className='flex justify-center flex-col items-center mt-4'>
      <div className='flex justify-between items-center gap-10'>
        <div className='font-bold text-2xl'>
          Add package
        </div>
        <div onClick={handleButton}>
          <Button name="Package" />
        </div>
      </div>
      {tog===true&&<div className="mt-5 border-gray-200 border-2 p-3 px-8 w-[40vw] ">
        
      <div>
     <Inputbox place="Package Name" label=" Package name" type="text" setData1={setDataPackageName}/>
     <div className="flex justify-around">
     <Inputbox place="start Date" label="Start Date" type="date" setData1={dataStartDate}/>
     <Inputbox place="end Date" label="End Date" type="date" setData1={dataEndDate}/>

     </div>
     <div className="flex justify-around">
     <Inputbox place="start Time" label="Start Time" type="time" setData1={dataStartTime}/>
     <Inputbox place="end Time" label="End Time" type="time" setData1={dataEndTime}/>
     </div>
     <Inputbox place="Number Of users" label="Users" type="number" setData1={dataUsers}/>
     <Inputbox place="Number Of Project" label="Project" type="number" setData1={dataSetProjects}/>
     <div  onClick={SubmitPackage}>
     <Button name="Add"/>

        </div>
      </div>
   
      </div>}


      <div>
        {
            packageData.length>0&&packageData.map((item,index)=>{
                return <PCard key={index} data={item}/>
            })
        }
        
      </div>

    </div>
  );
}

export default Index;
