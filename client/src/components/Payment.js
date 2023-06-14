import React from 'react'
import logo from '../assets/logo.png'
import qr from '../assets/qrcode.jpeg'
import {useNavigate,useLocation} from 'react-router-dom'

const Payment = () => {
    let navigate=useNavigate();
    let location=useLocation();

    const partnerid=location.state.partnerid;
    const password=location.state.password;
    
  return (
    <>
    <div className="flex flex-col items-center justify-center mx-auto my-2 w-20 h-20">
        <img src={logo}/>
    </div>
    <div className='flex justify-center'>
        <a href="https://youtube.com" target='_blank'><p className='border-2 border-black font-medium text-red-600 text-lg px-3 py-2'>How To Pay With QR?</p></a>
    </div>
    <div className='flex h-4/5 justify-center'>
        <img className='h-3/5' src={qr} /> 
    </div>
    <div className='flex justify-center mt-2 mb-5'>
    <button onClick={()=>{navigate("/success",{state:{partnerid:partnerid,password:password}})}} className="inline-flex items-center justify-center px-5 py-3 mr-3 text-base font-medium text-center text-white rounded-lg bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300">
                Complete Payment
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="mx-2 w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 8.25H9m6 3H9m3 6l-3-3h1.5a3 3 0 100-6M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            </button>
    </div> 
    </>
  )
}

export default Payment