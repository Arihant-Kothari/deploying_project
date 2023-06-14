import React,{useState,useEffect,useRef} from 'react'
import logo from '../assets/logo.png'
import axios from 'axios'
import { useNavigate,useLocation } from 'react-router-dom'

const KYC = () => {

    const baseURL=process.env.REACT_APP_API_URL

    let location = useLocation();
    let navigate = useNavigate();

    const partnerid=location.state.partnerid;
    const showform=location.state.showform;

    const [message,setMessage]=useState("")

    const [name,setName]=useState("")
    const [address,setAddress]=useState("")
    const [number,setNumber]=useState()

    const [upinumber,setUpinumber]=useState()

    const [accountnumber,setAccountnumber]=useState("")
    const [ifsc,setIfsc]=useState("")

    useEffect(()=>{
        
    })

    const kyc = async (e) =>{
        e.preventDefault();
        if(name.length>0 && address.length>0 && number.length===10 && upinumber.length===10 && (upinumber.length===10 || (accountnumber.length>0 && ifsc.length>0))){
            navigate(-1)
            window.alert(`KYC Details Updated Successfully`)
            const trans= await axios.post(baseURL+"/kyc",{
                partnerid:partnerid,
                name:name,
                address:address,
                number:number,
                upinumber:upinumber,
                accountnumber:accountnumber,
                ifsc:ifsc
            });
        }
        else{
            setMessage("Please Fill All The Details")
        }
    }

  return (
    <>
    <div className="flex flex-col items-center justify-center mx-auto my-2 w-20 h-20">
        <img src={logo}/>
    </div>
    <section className="my-2 pb-5">
  <div className="flex flex-col items-center justify-center px-6 py-0 mx-auto lg:py-0">
      <div className="w-full bg-white rounded-lg shadow border-2 border-gray-200 md:mt-0 sm:max-w-md xl:p-0">
          <div className="p-6 space-y-5 md:space-y-5 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                  KYC - Form
              </h1>
              <form className="space-y-3 md:space-y-3">
                      <label htmlFor="text" className="block mb-2 text-sm font-medium text-gray-900">Full Name</label>
                      <input onChange={(e)=>{setName((e.target.value).toUpperCase())}} type="text" name="id" id="id" className="bg-gray-50 border border-gray-300 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5" placeholder="Full Name" required/>

                      <label htmlFor="text" className="block mb-2 text-sm font-medium text-gray-900">Full Address<span className="text-gray-400 font-light ">- Address, City, Postal Code</span></label>
                      <input onChange={(e)=>{setAddress((e.target.value).toUpperCase())}} type="text" name="id" id="id" className="bg-gray-50 border border-gray-300 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5" placeholder="Full Address" required/>

                      <label htmlFor="text" className="block mb-2 text-sm font-medium text-gray-900">Contact Number / Phone Number</label>
                      <input onChange={(e)=>{setNumber((e.target.value).toUpperCase())}} type="number" name="id" id="id" className="bg-gray-50 border border-gray-300 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5" placeholder="Contact Number / Phone Number" required/>
                    
                      <label htmlFor="text" className="block mb-2 text-sm font-medium text-gray-900">UPI Number <span className="text-gray-400 font-light ">- PhonePe / GooglePay</span></label>
                      <input onChange={(e)=>{setUpinumber((e.target.value).toUpperCase())}} type="number" name="id" id="id" className="bg-gray-50 border border-gray-300 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5" placeholder="UPI Number" required/>

                      <label htmlFor="text" className="block mb-2 text-sm font-medium text-gray-900">Account Number</label>
                      <input onChange={(e)=>{setAccountnumber((e.target.value).toUpperCase())}} type="text" name="id" id="id" className="bg-gray-50 border border-gray-300 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5" placeholder="Account Number" required/>

                      <label htmlFor="text" className="block mb-2 text-sm font-medium text-gray-900">IFSC Code</label>
                      <input onChange={(e)=>{setIfsc((e.target.value).toUpperCase())}} type="text" name="id" id="id" className="bg-gray-50 border border-gray-300 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5" placeholder="IFSC Code" required/>


                      <div className="my-2">
                        <p className="text-red-600 font-semibold">{message}</p>
                      </div>
                  <button onClick={kyc} className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600">Submit Details</button>
              </form>
          </div>
      </div>
  </div>
</section>
    </>
  )
}

export default KYC