import React from 'react'
import logo from '../assets/logo.png'
import {useNavigate,useLocation} from 'react-router-dom'
const Wait = (props) => {
    let navigate=useNavigate();
    let location=useLocation();
  return (
    <>
    <div className="flex flex-col items-center justify-center mx-auto py-0 my-2 w-20 h-20">
        <img src={logo}/>
    </div>
<section className="text-gray-600 body-font flex flex-col justify-center items-center">
  <div className="container ">
    <div className="flex flex-wrap justify-center items-center ">
      <div className="p-4 lg:w-1/3">
        <div className="h-full bg-gradient-to-tl from-rose-100 to-teal-100 bg-opacity-20 px-8 pt-16 pb-24 rounded-lg overflow-hidden text-center relative">
          <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">SIGN UP SUCCESSFUL</h2>
          <p className="leading-relaxed text-gray-500 text-lg font-semibold mb-5">Please Save This Information.</p>
          <h1 className="title-font sm:text-2xl text-xl font-bold text-gray-900 mb-3">USER ID: <span>{location.state.partnerid}</span></h1>
          <h1 className="title-font sm:text-2xl text-xl font-bold text-gray-900 mb-3">PASSWORD: <span>{location.state.password}</span></h1>
          <div className="mt-10 -mb-10">
          <button onClick={()=>{navigate("/login")}} className=" bg-blue-500 hover:bg-blue-700 w-full text-white font-bold py-2 px-4 border border-blue-700 rounded">Log In</button>
          </div>
        </div>
        
      </div>
      
    </div>
  </div>
</section>
    </>
  )
}

export default Wait