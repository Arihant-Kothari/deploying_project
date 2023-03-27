import React,{useState} from 'react'
import logo from '../assets/logo.png'
import {useNavigate} from 'react-router-dom'
const AdminLogin = () => {

    let navigate=useNavigate();
    const[adminid,setAdminid]=useState("");
    const[adminpass,setAdminpass]=useState("");
    const[loginstatus,setLoginstatus]=useState("");
    const[showdash,setShowdash]=useState(false)

    const realadminid=process.env.REACT_APP_ADMIN_ID
    const realadminpass=process.env.REACT_APP_ADMIN_PASSWORD
    const adminlogin =(e)=>{
        e.preventDefault();
        if(adminid===realadminid&&adminpass===realadminpass){
            setShowdash(true)
            navigate("/admin/dashboard",{state:{showdash:showdash}})
        }
        else{
            setLoginstatus("Invalid Login Credentials")
        }
    }
  return (
    <>
    <div className="flex flex-col items-center justify-center mx-auto my-2 w-20 h-20">
        <img src={logo}/>
    </div>
    <section className="my-2">
  <div className="flex flex-col items-center justify-center px-6 py-0 mx-auto lg:py-0">
      <div className="w-full bg-white rounded-lg shadow border-2 border-gray-200 md:mt-0 sm:max-w-md xl:p-0">
          <div className="p-6 space-y-5 md:space-y-5 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                  Admin Login
              </h1>
              <form className="space-y-3 md:space-y-3">
                      <label htmlFor="text" className="block mb-2 text-sm font-medium text-gray-900">Admin ID</label>
                      <input onChange={(e)=>{setAdminid(e.target.value)}} type="text" name="id" id="id" className="bg-gray-50 border border-gray-300 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5" placeholder="Admin ID" required/>
                      <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">Admin Password</label>
                      <input onChange={(e)=>{setAdminpass(e.target.value)}} type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5" required/>
                      <p className="text-red-600 font-semibold hover:text-red-500 p-1">{loginstatus}</p>
                  <button onClick={adminlogin} className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600">Log In</button>
              </form>
          </div>
      </div>
  </div>
</section>
    </>
  )
}

export default AdminLogin