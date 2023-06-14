import React,{useState,useEffect,useRef} from 'react'
import axios from 'axios'
import {useLocation} from 'react-router-dom'
import { useDownloadExcel } from 'react-export-table-to-excel';

const KYCDetails = () => {
    const baseURL = process.env.REACT_APP_API_URL

    let location=useLocation();

    const admindash=location.state.showcomponent;

    const[data,setData]=useState([])

    const getdata= async ()=>{
        const result= await axios.get(baseURL+"/kycdetails")
        setData(result.data)
    }
    useEffect(()=>{
        getdata()
    })

    const deleteRow=async(ind)=>{
            const del = await axios.post(baseURL+"/deletekyc",{
                ind:ind,
            })  
    }


    const tableRef = useRef(null);
    const { onDownload } = useDownloadExcel({
            currentTableRef: tableRef.current,
            filename: 'kycdetails',
            sheet: 'kycdetails_data'
        })

    

  return (
    <>

    <div className='flex flex-row justify-center'>
  <h1 className='text-2xl font-bold border-b-2 border-dashed border-gray-500 inline-block pt-6'>KYC Details</h1>
  <button onClick={onDownload} className="my-5 mx-5 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white px-5 py-2.5 mr-2 mb-2 border border-blue-500 hover:border-transparent rounded">Export</button>
  </div>
    
    
    <div className='flex justify-center px-10 py-5'>
    <table className="border border-black border-collapse w-full" ref={tableRef}>
		<thead>
			<tr>
                <th className="border text-sm border-black p-2 bg-blue-200"></th>
				<th className="border text-sm border-black p-2 bg-blue-200">PARTNER ID</th>
				<th className="border text-sm border-black p-2 bg-blue-200">NAME</th>
				<th className="border text-sm border-black p-2 bg-blue-200">PHONE</th>
				<th className="border text-sm border-black p-2 bg-blue-200">ADDRESS</th>
                <th className="border text-sm border-black p-2 bg-blue-200">UPI NUMBER</th>
                <th className="border text-sm border-black p-2 bg-blue-200">ACCOUNT NUMBER</th>
                <th className="border text-sm border-black p-2 bg-blue-200">IFSC</th>
                <th className="border text-sm border-black p-2 bg-blue-200">DELETE</th>
			</tr>
		</thead>
		<tbody>
			{data.map((item,index)=>{
                return(
                    <tr key={item.ind}>
                        <td className='border text-sm font-semibold border-black p-1 text-center'>{index+1}</td>
                        <td className='border text-sm font-semibold border-black p-2'>{item.partnerid}</td>
                        <td className='border text-sm font-semibold border-black p-2'>{item.name}</td>
                        <td className='border text-sm font-semibold border-black p-2'>{item.number}</td>
                        <td className='border text-sm font-semibold border-black p-2'>{item.address}</td>
                        <td className='border text-sm font-semibold border-black p-2'>{item.upinumber}</td>
                        <td className='border text-sm font-semibold border-black p-2'>{item.accountnumber}</td>
                        <td className='border text-sm font-semibold border-black p-2'>{item.ifsc}</td>
                        <td className='border text-sm font-semibold border-black p-2'>
                            <div className='flex justify-evenly'>
                            <button onClick={()=>{
                                deleteRow(item.ind)
                            }} type="button" title="Delete" className="text-white bg-red-600 hover:bg-red-800 font-medium text-xs p-2 rounded">Delete</button>
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

export default KYCDetails