import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Navbar from "components/navbar";
import Sidebar from "components/sidebar";
import Footer from "components/footer/Footer";
import routes from "routes.js";
import { IoMdAdd } from "react-icons/io";
import Cookies from 'js-cookie';

import { ImCross } from "react-icons/im";
import { useDispatch, useSelector } from "react-redux";
import { setName } from "Store/Slice2";
import { setEmail } from "Store/Slice2";
import { setPassword } from "Store/Slice2";
import { setRole } from "Store/Slice2";

export default function Admin(props) {


const [organizer,setOrganizer]=useState("");
let data1="Admin";
let data2=""

  const email=useSelector((state)=>{
    return state.cred;
  })
  
  if(email.role==="Admin")
    {
      data1="Organization"
  
    }
    else if(email.role==="Organization")
    {
      data1="Manager";
      data2="sales"
    }

 

  const dispatch=useDispatch()
  console.log("this is the cred");
  console.log(email);
  const [pop,setPop]= useState(false);
  const { ...rest } = props;
  const location = useLocation();
  const [open, setOpen] = React.useState(true);
  const [currentRoute, setCurrentRoute] = React.useState("Main Dashboard");
  const OrganizationApi=()=>{
    setPop(false)
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
            body: JSON.stringify({EmailData:organizer,NameData:email.name}),
  
         
         
          }
         
        )
      
        const resdata=await data.json();
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

  React.useEffect(() => {
    window.addEventListener("resize", () =>
      window.innerWidth < 1200 ? setOpen(false) : setOpen(true)
    );
  }, []);
  React.useEffect(() => {
    getActiveRoute(routes);
  }, [location.pathname]);

  const getActiveRoute = (routes) => {
    let activeRoute = "Main Dashboard";
    for (let i = 0; i < routes.length; i++) {
      if (
        window.location.href.indexOf(
          routes[i].layout + "/" + routes[i].path
        ) !== -1
      ) {
        setCurrentRoute(routes[i].name);
      }
    }
    return activeRoute;
  };
  const getActiveNavbar = (routes) => {
    let activeNavbar = false;
    for (let i = 0; i < routes.length; i++) {
      if (
        window.location.href.indexOf(routes[i].layout + routes[i].path) !== -1
      ) {
        return routes[i].secondary;
      }
    }
    return activeNavbar;
  };
  const getRoutes = (routes) => {
    return routes.map((prop, key) => {
      if (prop.layout === "/admin") {
        return (
          <Route path={`/${prop.path}`} element={prop.component} key={key} />
        );
      } else {
        return null;
      }
    });
  };
useEffect(()=>{
   const token = Cookies.get('jwt');
   console.log(token);
   if(token)
   {
    // console.log("token mil Gya bhai");



    const datfetcher=async()=>{
      const data=await fetch("http://localhost:8000/api/auth",{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body: JSON.stringify({token:token}),
      });
      const resdata=await data.json();
      console.log("this is use Effect")
      console.log(resdata);
      console.log("Data is Accepted");
      dispatch(setName(resdata.data.Name));
        dispatch(setEmail(resdata.data.Email));
        dispatch(setPassword(resdata.data.Password));
        dispatch(setRole(resdata.data.Role));
        // dispatch(setRole(resdata.data.Role));

      

    }
    datfetcher();





    console.log(token);
   }
   else
   {
    // console.log("NO Token")

    window.location.replace('/auth/sign-in');

   }


  // const dataFetch=async()=>{

    

  // }
  // dataFetch();

  

},[]);
  document.documentElement.dir = "ltr";
  return (
    <div className="flex h-full w-full">
      <Sidebar open={open} onClose={() => setOpen(false)} />
      {/* Navbar & Main Content */}
      <div className="h-full w-full bg-lightPrimary dark:!bg-navy-900">
        {/* Main Content */}
        <main
          className={`mx-[12px] h-full flex-none transition-all md:pr-2 xl:ml-[313px]`}
        >
         
         
          {/* Routes */}
          <div className="h-full">
            <Navbar
              onOpenSidenav={() => setOpen(true)}
              logoText={"Horizon UI Tailwind React"}
              brandText={currentRoute}
              secondary={getActiveNavbar(routes)}
              {...rest}
            />
            {/* {This is organizatio section} */}
             <div className="flex justify-between  items-center mt-10">
            <div className="font-bold text-xl "> This is The {email.role} DashBoard</div>
            
               
          </div>
          {/* {This is the POp up section} */}
          {pop===true?<div className="fixed z-20 m-auto left-[50vw] top-[30vh] bg-gray-200 h-[25vh] w-[25vw] ">
            <div className="flex justify-between">
              <div>
                <label>Email</label>
                <input placeholder="Organization Email" value={organizer} onChange={(e)=>{
                  setOrganizer(e.target.value)
                }} className="p-1 m-2"/>
                 </div>
              <div className="cursor-pointer" ><ImCross  onClick={()=>setPop(false)} /></div>
             
            </div>
            <div className=" flex justify-center items-center bg-blueSecondary text-white m-7 p-1 rounded-sm" onClick={OrganizationApi}><button >Verify</button></div>
            </div>:null}
             
            <div className="pt-5s mx-auto mb-auto h-full min-h-[84vh] p-2 md:pr-2">
              <Routes>
                {getRoutes(routes)}

                <Route
                  path="/"
                  element={<Navigate to="/admin/default" replace />}
                />
              </Routes>
            </div>
            <div className="p-3">
            
              <Footer />
            </div>
          </div>
        </main>
     </div>
    </div>
      );
}












