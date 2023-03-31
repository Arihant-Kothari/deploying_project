import React,{useState} from 'react'
import logo from '../assets/logo.png'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'


const LoginForm = () => {

    const baseURL=process.env.REACT_APP_API_URL

    let navigate=useNavigate();
    const[username,setUsername]=useState("");
    const[password,setPassword]=useState("");
    const[loginstatus,setLoginstatus]=useState("");

    const login=async(e)=>{
        e.preventDefault();
        axios.post(baseURL+"/login",{
            username:username,
            password:password,
        }).then((response)=>{
            if(response.data.message){
                setLoginstatus(response.data.message)
            }
            else{
                navigate("/dashboard",{state:{partnerid:username}})
            }
        })
    }
  return (
    <>
    <div>
    <div className="flex flex-col items-center justify-center mx-auto my-2 w-20 h-20">
        <img src={logo} alt=""/>
    </div>
    <section className="my-2">
  <div className="flex flex-col items-center justify-center px-6 py-0 mx-auto lg:py-0">
      <div className="w-full bg-white rounded-lg shadow border-2 border-gray-200 md:mt-0 sm:max-w-md xl:p-0">
          <div className="p-6 space-y-5 md:space-y-7 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                  Log In To Your Account
              </h1>
              <form className="space-y-3 md:space-y-3">
                      <label htmlFor="text" className="block mb-2 text-sm font-medium text-gray-900">Your User ID</label>
                      <input onChange={(e)=>{setUsername(e.target.value)}} type="text" name="id" id="id" className="bg-gray-50 border border-gray-300 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5" placeholder="Your ID" required/>
                      <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">Password</label>
                      <input onChange={(e)=>{setPassword(e.target.value)}} type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5" required/>
                  <button onClick={login} className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600">Log In</button>
                  <p className="text-red-600 font-semibold hover:text-red-500 pt-2">{loginstatus}</p>
                  <p className="text-md font-bold pt-2 text-gray-500">
                      Create New Account - <button onClick={()=>{navigate("/signup")}}  className="font-medium text-blue-600 hover:underline dark:text-blue-500">Sign Up</button>
                  </p>
              </form>
          </div>
      </div>
  </div>
</section>
</div>
    </>
  )
}

export default LoginForm