import React,{useState,useEffect,useRef} from 'react'
import logo from '../assets/logo.png'
import axios from 'axios'
import { useLocation } from 'react-router-dom'
import { useDownloadExcel } from 'react-export-table-to-excel';
const Reward = () => {

    const baseURL=process.env.REACT_APP_API_URL

    let location = useLocation();
    const [partnerid,setPartnerid]=useState("")
    const [amount,setAmount]=useState()
    const [date,setDate]=useState("")
    const [remark,setRemark]=useState("")
    const [rewarddata,setRewarddata]=useState([])
    const admindash=location.state.admindash
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

    const getrewarddetail=async()=>{
        const rewarddetail=await axios.get(baseURL+"/rewarddetails")
        setRewarddata(rewarddetail.data)
    }

    useEffect(()=>{
        setDate(getCurrentDate)
        getrewarddetail()
    })

    const deleteRow=async(number)=>{
        if(window.confirm("Are You Sure That You Want To Delete The Reward?")){
            const del = await axios.post(baseURL+"/deletereward",{
                number:number,
            })
            
        }
    }

    const reward = async(e)=>{
        e.preventDefault();
        if(window.confirm(`Are You Sure That You Want To Continue The Following Transaction? ${"User ID : " + partnerid + " Amount : "+ amount}`)){
        const trans= await axios.post(baseURL+"/reward",{
            partnerid:partnerid,
            amount:amount,
            date:date,
            remark:remark,
        });
    }
    }

    

    const tableRef = useRef(null);
    const { onDownload } = useDownloadExcel({
            currentTableRef: tableRef.current,
            filename: 'reward',
            sheet: 'reward_data'
        })
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
                  New Reward
              </h1>
              <form className="space-y-3 md:space-y-3">
                      <label htmlFor="text" className="block mb-2 text-sm font-medium text-gray-900">Partner ID</label>
                      <input onChange={(e)=>{setPartnerid((e.target.value).toUpperCase())}} type="text" name="id" id="id" className="bg-gray-50 border border-gray-300 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5" placeholder="Partner ID" required/>
                      
                      <label htmlFor="text" className="block mb-2 text-sm font-medium text-gray-900">Remark/Description</label>
                      <input onChange={(e)=>{setRemark((e.target.value).toUpperCase())}} type="text" name="id" id="id" className="bg-gray-50 border border-gray-300 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5" placeholder="Add Description" required/>

                      <label htmlFor="amount" className="block mb-2 text-sm font-medium text-gray-900">Amount</label>
                      <input onChange={(e)=>{setAmount(e.target.value)}} type="number" name="amount" id="amount" placeholder="Amount" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5" required/>
                      
                      <div className="my-2"></div>
                  <button onClick={reward} className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600">Complete Transaction</button>
              </form>
          </div>
      </div>
  </div>
</section>
<div>
<div className='flex justify-center'>
    <h1 className="text-2xl font-bold">
        Reward Details
    </h1>
    <button onClick={onDownload} className="mx-5 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white px-3 py-1 border border-blue-500 hover:border-transparent rounded">Export</button>
    </div>
    <div className='flex justify-center p-4'>
    <table className="border border-black border-collapse px-2" ref={tableRef}>
		<thead>
			<tr>
                <th className="border text-md border-black px-5 py-3 bg-blue-200"></th>
				<th className="border text-md border-black px-5 py-3 bg-blue-200">PARTNER ID</th>
				<th className="border text-md border-black px-5 py-3 bg-blue-200">AMOUNT</th>
                <th className="border text-md border-black px-5 py-3 bg-blue-200">DESCRIPTION</th>
				<th className="border text-md border-black px-5 py-3 bg-blue-200">DATE</th>
                <th className="border text-md border-black px-5 py-3 bg-blue-200">DELETE</th>
			</tr>
		</thead>
		<tbody>
			{rewarddata.map((item,index)=>{
                return(
                    <tr key={item.number}>
                        <td className='border text-md font-semibold border-black px-5 py-3 text-center'>{index+1}</td>
                        <td className='border text-md font-semibold border-black px-5 py-3 text-center'>{item.partner_id}</td>
                        <td className='border text-md font-semibold border-black px-5 py-3 text-center'>{item.amount}</td>
                        <td className='border text-md font-semibold border-black px-5 py-3 text-center'>{item.remark}</td>
                        <td className='border text-md font-semibold border-black px-5 py-3 text-center'>{item.date.slice(8,10)+"/"+item.date.slice(5,7)+"/"+item.date.slice(0,4)}</td>
                        <td className='border text-sm font-semibold border-black p-2'>
                            <div className='flex justify-evenly'>
                            <button onClick={()=>{
                                deleteRow(item.number)
                            }} type="button" title="Delete" className="text-white bg-red-600 hover:bg-red-800 font-medium text-xs p-2 rounded">D</button>
                            </div>
                        </td>
                    </tr>
                )
            })}
		</tbody>
	</table>
    </div>
</div>
    </>
  )
}

export default Reward