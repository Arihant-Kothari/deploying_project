import {useLocation, useNavigate} from 'react-router-dom'
import axios from 'axios'
import React,{useEffect,useState} from 'react'
import logo from '../assets/logo.png'

const EditForm = () => {

    const axiosInstance = axios.create({
        baseURL:process.env.REACT_APP_API_URL
    });

    let location=useLocation();
    let navigate=useNavigate();
    const[name,setName]=useState(location.state.name)
    const[phone,setPhone]=useState(location.state.phone)
    const[address,setAddress]=useState(location.state.address)
    const[sponsor,setSponsor]=useState(location.state.sponsor)
    const partnerid=location.state.partnerid

    const editform=async(e)=>{
        e.preventDefault();
        if(window.confirm("Are You Sure That You Want To Update The Details?")){
            navigate("/admin/dashboard",{state:{showdash:"admin"}})
            const wait = await axiosInstance.post("/editform",{
                name:name,
                phone:phone,
                address:address,
                partnerid:partnerid,
                sponsor:sponsor,
            });
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
                  Edit.</h1>
              <form className="space-y-2">
                
                      <label htmlFor="text" className="block mb-2 text-sm font-medium text-gray-900">Full Name</label>
                      <input type="text" onChange={(e)=>{setName((e.target.value).toUpperCase())}} value={name} name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 :bg-gray-700 :border-gray-600 :placeholder-gray-400 :text-white :focus:ring-blue-500 :focus:border-blue-500" placeholder="Full Name" required/>
                      
                      <label htmlFor="number" className="block mb-2 text-sm font-medium text-gray-900">Phone Number <span className="text-gray-400 font-light">- 10 Digit</span></label>
                      <input type="number" onChange={(e)=>{setPhone((e.target.value))}} value={phone} name="phone" id="phone" placeholder="Your 10 Digit Phone Number" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 :bg-gray-700 :border-gray-600 :placeholder-gray-400 :text-white :focus:ring-blue-500 :focus:border-blue-500" required/>
                      
                      <label htmlFor="text" className="block mb-2 text-sm font-medium text-gray-900">Address <span className="text-gray-400 font-light ">- Address, City, Postal Code</span></label>
                      <input type="text" onChange={(e)=>{setAddress((e.target.value).toUpperCase())}} value={address} name="address" id="address" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 :bg-gray-700 :border-gray-600 :placeholder-gray-400 :text-white :focus:ring-blue-500 :focus:border-blue-500" placeholder="Your Full Address, City, Postal Code" required/>

                      <label htmlFor="text" className="block mb-2 text-sm font-medium text-gray-900">Sponsor</label>
                      <input type="text" onChange={(e)=>{setSponsor((e.target.value).toUpperCase())}} value={sponsor} name="sponsor" id="sponsor" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 :bg-gray-700 :border-gray-600 :placeholder-gray-400 :text-white :focus:ring-blue-500 :focus:border-blue-500" placeholder="Your Full Address, City, Postal Code" required/>

                     <div className="my-2"></div>
                  <button onClick={editform} className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-md px-5 py-2.5 mt-5 text-center :bg-blue-600 :hover:bg-blue-700 :focus:ring-blue-800">Edit</button>
                  <p className="text-red-600 font-semibold hover:text-red-500 pt-2">{}</p>
                  
              </form>
          </div>
      </div>
  </div>
</section>
    </>
  )
}

export default EditForm