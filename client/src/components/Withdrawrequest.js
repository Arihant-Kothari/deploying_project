import React,{useState,useEffect} from 'react'
import axios from 'axios'
import {useLocation} from 'react-router-dom'


const Withdrawrequest = () => {

    const baseURL = process.env.REACT_APP_API_URL

    let location=useLocation();

    const admindash=location.state.showcomponent;

    const[data,setData]=useState([])

    const getdata= async ()=>{
        const result= await axios.get(baseURL+"/withdrawrequest")
        setData(result.data)
    }
    useEffect(()=>{
        getdata()
    })

    const deleteRow=async(number)=>{
            const del = await axios.post(baseURL+"/deletewithdraw",{
                number:number,
            })  
    }

    const accept=async(partner_id,amount,remark,date,number)=>{
            deleteRow(number)
            const accept = await axios.post(baseURL+"/acceptwithdraw",{
                partner_id:partner_id,
                amount:amount,
                remark:remark,
                date:date
            })
    }

  return (
    <>
    
    <div className='flex justify-center'>
  <h1 className='text-2xl font-bold border-b-2 border-dashed border-gray-500 inline-block pb-1 mx-5 my-5'>Withdraw Request</h1>
  </div>
    
    
    <div className='flex justify-center px-10 py-5'>
    <table className="border border-black border-collapse w-full">
		<thead>
			<tr>
                <th className="border text-sm border-black p-2 bg-blue-200"></th>
				<th className="border text-sm border-black p-2 bg-blue-200">PARTNER ID</th>
				<th className="border text-sm border-black p-2 bg-blue-200">AMOUNT</th>
				<th className="border text-sm border-black p-2 bg-blue-200">DESCRIPTION</th>
				<th className="border text-sm border-black p-2 bg-blue-200">DATE</th>
                <th className="border text-sm border-black p-2 bg-blue-200">ACTION</th>
			</tr>
		</thead>
		<tbody>
			{data.map((item,index)=>{
                return(
                    <tr key={item.number}>
                        <td className='border text-sm font-semibold border-black p-1 text-center'>{index+1}</td>
                        <td className='border text-sm font-semibold border-black p-2'>{item.partner_id}</td>
                        <td className='border text-sm font-semibold border-black p-2'>{item.amount}</td>
                        <td className='border text-sm font-semibold border-black p-2'>{item.remark}</td>
                        <td className='border text-sm font-semibold border-black p-2'>{item.date.slice(8,10)+"/"+item.date.slice(5,7)+"/"+item.date.slice(0,4)}</td>
                        <td className='border text-sm font-semibold border-black p-2'>
                            <div className='flex justify-evenly'>
                            <button onClick={()=>{
                                deleteRow(item.number)
                            }} type="button" className="text-white bg-red-600 hover:bg-red-800 font-medium text-sm p-2 rounded">Delete</button>
                            <button onClick={()=>{
                                accept(item.partner_id,item.amount,item.remark,item.date,item.number)
                            }} type="button" className="text-white bg-green-600 hover:bg-green-800 font-medium text-sm p-2 rounded">Accept</button>
                            </div>
                        </td>
                    </tr>
                )
            })}
		</tbody>
	</table>
    </div>
    </>
  )
}

export default Withdrawrequest