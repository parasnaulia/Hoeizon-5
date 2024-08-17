// import InputField from "components/fields/InputField";
import Button from "../Button/Buttton"
import React, { useEffect, useState } from 'react';
import Inputbox from "layouts/auth/Inputbox";
import { useDispatch, useSelector } from "react-redux";
import { AddPackage } from "Store/Package";
import PCard from "../Package/PCard";


const Index = () => {
  const email=useSelector((state)=>{
    return state.cred;
  })
  
    const [tog,setTog]=useState(false);
  const packageData=  useSelector((state)=>{
        return state.Package
    })
    const [att,setAtt]=useState(false);
   const dispatch= useDispatch();

    const handleButton=()=>{
        setTog(!tog);
       
     
    }
    const setAtt1=()=>{
        setAtt(!att)
    }
    const [organization,setOrganizationName]=useState("");
    const [country,setCountry]=useState("");
    const [zip,setZip]=useState("");
    const [companyEmail,setcompanyEmail]=useState("");
    const [package1,setPackage1]=useState("");
    const [contact,setContact]=useState("");
    const [city,setCity]=useState("");
    const [website,setWebsite]=useState("");
    const [defaultPass,setDefaultPass]=useState("")

    const OrganizationApi=()=>{
   
      // alert("kkh")
  
      async function fetching() {
        const emailData=email.email;
        console.log("This is Email"+emailData);
        try{
          const data=await fetch(`http://localhost:8000/api/organizationU/${emailData}`,
            {
              method:"POST",
              headers:{
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({organizationName:{organization},country:{country},zip:{zip},companyEmail:{companyEmail},package1:{package1},contact:{contact},city:{city},website:{website},defaultPass:{defaultPass}}),

            }
           
          )

        
          const resdata=await data.json();
          console.log(resdata)
          // console.log(resdata.data);
          // console.log("login hitt")
          // const resdata=await data.json();
          // console.log(resdata);
          // dispatch(setName(resdata.data.Name));
          // dispatch(setEmail(resdata.data.Email));
          // dispatch(setPassword(resdata.data.Password)); 
          // dispatch(add(false))
          // navigate("/")
          
          
    
    
          // console.log("data is send")
    
        }
        catch(e)
        {
          // dispatch(add(true))
          console.log("There is an error"+e);
        }
    
        
      }
      fetching();
    }

    const setDataPackageOrganziation=(e)=>{
        console.log("name"+e.target.value)
        setOrganizationName(e.target.value);
    }
    const dataCountry=(e)=>{
        console.log("date "+e.target.value)
        setCountry(e.target.value);
    }
    const dataZip=(e)=>{
      setZip(e.target.value);
    }
    const datasetcompanyEmail=(e)=>{
        console.log("Time"+e.target.value)
        setcompanyEmail(e.target.value);
    }
    const datasetPackage1=(e)=>{
      setPackage1(e.target.value)
    }
    const datasetContact=(e)=>{
      setContact(e.target.value);
    }
    const datasetCity=(e)=>{
        setCity(e.target.value);
    }

    // setWebsite
    const dataSetWebsite=(e)=>{
      setWebsite(e.target.value);
  }
  const datasetDefaultPass=(e)=>{
    setDefaultPass(e.target.value);
  }




    // useEffect(()=>{
    //     const fetchingPackages=async()=>{
    //         try{
    //             const data=await fetch("http://localhost:8000/api/package");
    //             const jsonData=await data.json();
    //             console.log(jsonData.data);
    //             console.log("done");
    //             dispatch(AddPackage(jsonData.data));


    //         }
    //         catch(e)
    //         {
    //             console.log("There is an Error in fetching the Package "+e);
    //         }
          


    //     }
    //     fetchingPackages();

    // },[att])




// const SubmitPackage=()=>{
//     // alert("Hello");
//     const packageDataSubmit=async()=>{

//         try{
//             const data=await fetch("http://localhost:8000/api/package",{
//                 method:"POST",
//                 headers:{
//                     "Content-Type":"application/json"
//                 },
//                 body:JSON.stringify({Name:packageName,Start_date:startDate,End_date:endDate,Start_Time:startTime,endTime:endTime,Project:projects,Users:users})
//             });
//             const resData=await data.json();
            
//             console.log(resData);
//             setAtt(!att);

//         }
//         catch(e)
//         {
//             console.log("This is Sending package Error "+e);

//         }
        

//     }
//     packageDataSubmit()
// }


  return (
    <div className='flex justify-center flex-col items-center mt-4'>
      <div className='flex justify-between items-center gap-10'>
        <div className='font-bold text-2xl'>
          Add package
        </div>
        <div onClick={handleButton}>
          <Button name="Orgaization" />
        </div>
      </div>
      {tog===true&&<div className="mt-5 border-gray-200 border-2 p-3 px-8 w-[40vw] ">
        
      <div>
     <Inputbox place="Organization Name" label="Organization name" type="text" setData1={setDataPackageOrganziation}/>
  
     <Inputbox place="Company Email" label="Company Email" type="text" setData1={datasetcompanyEmail}/>

     {/* {Drop Down List} */}
     <div className="flex   items-center gap-4 mb-2">
     <div>Package*</div>
     <div>
  <select className="w-[10vw]" value={package1} onChange={datasetPackage1}>
    {packageData.length > 0 && packageData.map((item, index) => (
      <option key={index}>{item.Name}</option>
    ))}
  </select>
</div>

     </div>
     

    
     <Inputbox place="Contact Number" label="Contact Number " type="text" setData1={datasetContact}/>


    
     <Inputbox place="Website" label="Website" type="text" setData1={dataSetWebsite}/>
     <Inputbox place="City" label="City" type="text" setData1={datasetCity}/>
   
     <Inputbox place="Country" label="Country" type="text" setData1={dataCountry}/>
     <Inputbox place="Zip" label="Zip" type="number" setData1={dataZip}/>


    <Inputbox place="default_Password" label="default_Password" type="text" setData1={datasetDefaultPass}/>

     <div  onClick={OrganizationApi}>
     <Button name="Add"/>

        </div>
      </div>
   
      </div>}


      <div>
        {
            packageData.length>0&&packageData.map((item,index)=>{
                return <PCard key={index} data={item} setAtt1={setAtt1}/>
            })
        }
        
      </div>

    </div>
  );
}

export default Index;
