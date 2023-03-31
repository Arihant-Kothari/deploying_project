import React,{useState,useEffect,useRef} from 'react'
import axios from 'axios'
import {useNavigate,useLocation} from 'react-router-dom'
import { useDownloadExcel } from 'react-export-table-to-excel';


const AdminDashboard = () => {

    const baseURL = process.env.REACT_APP_API_URL

    let navigate=useNavigate();
    let location=useLocation();
    const admindash=true

    const[data,setData]=useState([])
    const dash=location.state.showdash

    const getdata= async ()=>{
        const result= await axios.get(baseURL+"/admin/dashboard")
        setData(result.data)
    }
    useEffect(()=>{
        getdata()
    })

    const deleteRow=async(id)=>{
        if(window.confirm("Are You Sure That You Want To Delete The Row?")){
            const del = await axios.post(baseURL+"/deleterow",{
                id:id,
            })
            
        }
    }

    const tableRef = useRef(null);
    const { onDownload } = useDownloadExcel({
            currentTableRef: tableRef.current,
            filename: 'details',
            sheet: 'data'
        })

  return (
    <>
    <div className='flex justify-center my-5'>
    <h1 className='text-2xl font-bold border-b-2 border-dashed border-gray-500 inline-block'>Admin Dashboard</h1>
    </div>
    <div className='flex justify-start mx-10'>
    <button onClick={()=>{navigate("/transaction",{state:{showcomponent:admindash}})}} type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-md px-5 py-2.5 mr-2 mb-2">Transaction</button>
    <button onClick={()=>{navigate("/reward",{state:{showcomponent:admindash}})}} type="button" className="focus:outline-none text-white bg-green-500 hover:bg-green-600 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-md px-5 py-2.5 mr-2 mb-2 ">Reward</button>
    <button onClick={onDownload} className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white px-5 py-2.5 mr-2 mb-2 mx-auto border border-blue-500 hover:border-transparent rounded">Export</button>
    </div>
    
    
    <div className='flex justify-center px-10 py-5'>
    <table className="border border-black border-collapse w-full" ref={tableRef}>
		<thead>
			<tr>
                <th className="border text-sm border-black p-2 bg-blue-200"></th>
				<th className="border text-sm border-black p-2 bg-blue-200">PARTNER ID</th>
				<th className="border text-sm border-black p-2 bg-blue-200">PASSWORD</th>
				<th className="border text-sm border-black p-2 bg-blue-200">NAME</th>
				<th className="border text-sm border-black p-2 bg-blue-200">PHONE</th>
                <th className="border text-sm border-black p-2 bg-blue-200">SPONSOR ID</th>
                <th className="border text-sm border-black p-2 bg-blue-200">ADDRESS</th>
                <th className="border text-sm border-black p-2 bg-blue-200">JOINING DATE</th>
                <th className="border text-sm border-black p-2 bg-blue-200">ACTION</th>
			</tr>
		</thead>
		<tbody>
			{data.map((item,index)=>{
                return(
                    <tr key={item.partner_id}>
                        <td className='border text-sm font-semibold border-black p-1 text-center'>{index+1}</td>
                        <td className='border text-sm font-semibold border-black p-2'>{item.partner_id}</td>
                        <td className='border text-sm font-semibold border-black p-2'>{item.password}</td>
                        <td className='border text-sm font-semibold border-black p-2'>{item.name}</td>
                        <td className='border text-sm font-semibold border-black p-2'>{item.phone}</td>
                        <td className='border text-sm font-semibold border-black p-2'>{item.sponsor_id}</td>
                        <td className='border text-sm font-semibold border-black p-2'>{item.address}</td>
                        <td className='border text-sm font-semibold border-black p-2'>{item.joining_date.slice(8,10)+"/"+item.joining_date.slice(5,7)+"/"+item.joining_date.slice(0,4)}</td>
                        <td className='border text-sm font-semibold border-black p-2'>
                            <div className='flex justify-evenly'>
                            <button onClick={()=>{
                                deleteRow(item.partner_id)
                            }} type="button" title="Delete" className="text-white bg-red-600 hover:bg-red-800 font-medium text-xs p-2 rounded">D</button>
                            <button title="Edit" onClick={()=>navigate("/edit",{state:{partnerid:item.partner_id,name:item.name,phone:item.phone,address:item.address,sponsor:item.sponsor_id}})} type="button" className="text-white bg-blue-600 hover:bg-blue-800 font-medium text-xs p-2 rounded">E</button>
                            <button title="View" onClick={()=>navigate("/dashboard",{state:{partnerid:item.partner_id}})} type="button" className="text-white bg-green-600 hover:bg-green-800 font-medium rounded text-xs p-2">V</button>
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

export default AdminDashboard