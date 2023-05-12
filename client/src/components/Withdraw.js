import React,{useState,useEffect,useRef} from 'react'
import logo from '../assets/logo.png'
import axios from 'axios'
import { useNavigate,useLocation } from 'react-router-dom'
import { useDownloadExcel } from 'react-export-table-to-excel';
const Withdraw = () => {

    const baseURL=process.env.REACT_APP_API_URL

    let location = useLocation();
    let navigate = useNavigate();

    const partnerid=location.state.partnerid;
    const showform=location.state.showform;

    const [amount,setAmount]=useState()
    const [date,setDate]=useState("")
    const [remark,setRemark]=useState("WITHDRAW REQUEST")
    const [transdata,setTransdata]=useState([])
    const [message,setMessage]=useState("")

    // const admindash=location.state.admindash
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

    useEffect(()=>{
        setDate(getCurrentDate)
    })
    const withdraw = async(e)=>{
        e.preventDefault();

        if(amount>0){
        navigate(-1)
        const trans= await axios.post(baseURL+"/withdraw",{
            partnerid:partnerid,
            amount:amount,
            date:date,
            remark:remark,
        });
    }
    else{
        setMessage("Please Enter Amount")
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
                  Request Withdrawal
              </h1>
              <form className="space-y-3 md:space-y-3">
                      <label htmlFor="text" className="block mb-2 text-sm font-medium text-gray-900">Remark/Description</label>
                      <input onChange={(e)=>{setRemark((e.target.value).toUpperCase())}} value={remark} type="text" name="id" id="id" className="bg-gray-50 border border-gray-300 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5" placeholder="Add Description" required/>

                      <label htmlFor="amount" className="block mb-2 text-sm font-medium text-gray-900">Amount</label>
                      <input onChange={(e)=>{setAmount(e.target.value)}} type="number" name="amount" id="amount" placeholder="Amount" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5" required/>
                      <div className="my-2">
                      <p className="text-red-600 font-semibold">{message}</p>
                      </div>
                  <button onClick={withdraw} className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600">Request Withdrawl</button>
              </form>
          </div>
      </div>
  </div>
</section>

    </>
  )
}

export default Withdraw