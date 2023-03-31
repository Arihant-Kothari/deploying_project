import React,{useState,useEffect} from 'react'
import logo from '../assets/logo.png'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'

const SignupForm = () => {

    const baseURL=process.env.REACT_APP_API_URL

    let navigate=useNavigate();

    const[partnerid,setPartnerid]=useState("")
    const[password,setPassword]=useState("")
    const[name,setName]=useState("")
    const[sponsor,setSponsorid]=useState("")
    const[phone,setPhone]=useState()
    const[address,setAddress]=useState("")
    const[date,setDate]=useState("")
    const[signupstatus,setSignupstatus]=useState("")

    const tempdigit=(min = 1000, max = 9999)=>{
        let difference = max - min;
        let rand = Math.random();
        rand = Math.floor( rand * difference);
        rand = rand + min;
        return rand;
    }
    const getCurrentDate=()=>{
        let date = new Date();
	    let fullyear = date.getFullYear()
        let month=(date.getMonth()+1)
        if (month<10){
            month="0"+month
        }
        let currentdate=date.getDate()
        if (currentdate<10){
            currentdate="0"+currentdate
        }
        let fulldate=fullyear+"-"+month+"-"+currentdate
        return fulldate
    }
    const incrementID=(lastid)=>{
        let slicedstr=lastid.slice(2)
        let convertnum=Number(slicedstr)
        let incrementnum=convertnum+1
        if (incrementnum<10){
            let finalstring="AB000"+incrementnum
            return finalstring
        }
        if (incrementnum>=10&&incrementnum<100){
            let finalstring="AB00"+incrementnum
            return finalstring
        }
        if (incrementnum>=100&&incrementnum<1000){
            let finalstring="AB0"+incrementnum
            return finalstring
        }
        if (incrementnum>=1000){
            let finalstring="AB"+incrementnum
            return finalstring
        }
    }
    useEffect(()=>{
            axios.get(baseURL+"/lastid").then(res=>{
                setPartnerid(incrementID(res.data[0].partner_id));
            })
            setPassword("user"+tempdigit());
            setDate(getCurrentDate());
    },[date,password])
    
    const signup=async(e)=>{
        e.preventDefault();
        if(phone.length===10 && (sponsor.slice(0,2)==="AB" || sponsor.slice(0,2)==="ab") && name.length>3 && address.length>3)
        {
        navigate("/success",{state:{partnerid:partnerid,password:password}})
        axios.post(baseURL+"/signup",{
            partnerid:partnerid,
            password:password,
            name:name,
            date:date,
            sponsor:sponsor,
            phone:phone,
            address:address,
        });
        }
        else{
            setSignupstatus("Incorrect Details. Please Add Valid Credentials.")
        }
    }
  return (
    <>
    <div className="flex flex-col items-center justify-center mx-auto py-0 my-2 w-20 h-20">
        <img src={logo} alt=""/>
    </div>
    <section>
  <div className="flex flex-col items-center justify-center px-6 py-6 mx-auto lg:py-0">
      <div className="w-full bg-white rounded-lg shadow border-2 border-gray-200 md:mt-0 sm:max-w-md xl:p-0 :bg-gray-800 :border-gray-700">
          <div className="p-5 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl :text-white">
                  Sign Up..</h1>
              <form className="space-y-2">
                
                      <label htmlFor="text" className="block mb-2 text-sm font-medium text-gray-900 :text-white">Full Name</label>
                      <input onChange={(e)=>{setName((e.target.value).toUpperCase())}} type="text" name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 :bg-gray-700 :border-gray-600 :placeholder-gray-400 :text-white :focus:ring-blue-500 :focus:border-blue-500" placeholder="Full Name" required/>
                      
                      <label htmlFor="text" className="block mb-2 text-sm font-medium text-gray-900 :text-white">Sponsor ID</label>
                      <input onChange={(e)=>{setSponsorid((e.target.value).toUpperCase())}} type="text" name="sponsor" id="sponsor" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 :bg-gray-700 :border-gray-600 :placeholder-gray-400 :text-white :focus:ring-blue-500 :focus:border-blue-500" placeholder="Sponsor ID" required/>
                      
                      <label htmlFor="number" className="block mb-2 text-sm font-medium text-gray-900 :text-white">Phone Number <span className="text-gray-400 font-light">- 10 Digit</span></label>
                      <input onChange={(e)=>{setPhone(e.target.value)}} type="number" name="phone" id="phone" placeholder="Your 10 Digit Phone Number" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 :bg-gray-700 :border-gray-600 :placeholder-gray-400 :text-white :focus:ring-blue-500 :focus:border-blue-500" required/>
                      
                      <label htmlFor="text" className="block mb-2 text-sm font-medium text-gray-900 :text-white">Address <span className="text-gray-400 font-light ">- Address, City, Postal Code</span></label>
                      <input onChange={(e)=>{setAddress((e.target.value).toUpperCase())}} type="text" name="address" id="address" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 :bg-gray-700 :border-gray-600 :placeholder-gray-400 :text-white :focus:ring-blue-500 :focus:border-blue-500" placeholder="Your Full Address, City, Postal Code" required/>
                      <div className="my-2">
                        
                  <button onClick={signup} className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mt-5 text-center :bg-blue-600 :hover:bg-blue-700 :focus:ring-blue-800">Sign Up</button>
                  <p className="text-red-600 font-semibold hover:text-red-500 pt-2">{signupstatus}</p>
                  </div>
                  <p className="text-md font-bold pt-2 text-gray-500 :text-gray-400">
                      Log In To Your Account - <button onClick={()=>{navigate("/login")}} className="font-medium text-blue-600 hover:underline :text-blue-500">Log In</button>
                  </p>
              </form>
          </div>
      </div>
  </div>
</section>
    </>
  )
}

export default SignupForm