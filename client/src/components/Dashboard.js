import React,{useEffect,useState} from 'react'
import {useLocation,useNavigate} from 'react-router-dom'
import user from '../assets/user.png'
import axios from 'axios'

const Dashboard = () => {

   const baseURL=process.env.REACT_APP_API_URL

   const showform=true

   let location=useLocation();
   let navigate=useNavigate();
   let partnerid="location.state.partnerid.toUpperCase()";

   const[name,setName]=useState("")
   const[joiningdate,setJoiningdate]=useState("")
   const[sponsor,setSponsor]=useState("")
   const[phone,setPhone]=useState("")

   const[level1id,setLevel1id]=useState([])
   const[level2id,setLevel2id]=useState([])
   const[level3id,setLevel3id]=useState([])
   const[level4id,setLevel4id]=useState([])
   const[level5id,setLevel5id]=useState([])

   const[lastjoining,setLastjoining]=useState("")
   const[lastjoiningdate,setLastjoiningdate]=useState("")

   const[reward,setReward]=useState([])
   const[transaction,setTransaction]=useState([])

   const[showkycbutton,setShowkycbutton]=useState(true)

   const getUserDetail = async()=>{
    const res =await axios.post(baseURL+"/userdetail",{
         userid:partnerid
      }).then((result)=>{
         setName(result.data[0].name)
         setJoiningdate(result.data[0].joining_date)
         setSponsor(result.data[0].sponsor_id)
         setPhone(result.data[0].phone)
      });
   }

   const kycbutton= async ()=>{
    const result= await axios.get(baseURL+"/kycid")
    console.log(result.data)

    for(let i=0;i<result.data.length;i++){
      if(result.data[i].partnerid === partnerid){
        setShowkycbutton(false)
        break;
      }
    }
   }

   const getdata=async()=>{
    const response = await axios.get(baseURL+"/dashboard")

    //level1
    let level1idarr=[]
    response.data.forEach((item)=>{
      if(item.sponsor_id===partnerid){
        level1idarr.push({id:item.partner_id,name:item.name,date:item.joining_date})
      }
    })
    setLevel1id(level1idarr)
    setLastjoining(daysCalculator(getCurrentDate(), level1idarr[level1idarr.length-1].date))
    setLastjoiningdate(level1idarr[level1idarr.length-1].date)

    //level2
    let level2idarr=[]
    level1idarr.forEach((level2)=>{
    response.data.forEach((item)=>{
      if(item.sponsor_id===level2.id){
        level2idarr.push({id:item.partner_id,name:item.name,date:item.joining_date})
      }
    })
  })
    setLevel2id(level2idarr)

    //level3
    let level3idarr=[]
    level2idarr.forEach((level3)=>{
    response.data.forEach((item)=>{
      if(item.sponsor_id===level3.id){
        level3idarr.push({id:item.partner_id,name:item.name,date:item.joining_date})
      }
    })
  })
    setLevel3id(level3idarr)

    //level4
    let level4idarr=[]
    level3idarr.forEach((level4)=>{
    response.data.forEach((item)=>{
      if(item.sponsor_id===level4.id){
        level4idarr.push({id:item.partner_id,name:item.name,date:item.joining_date})
      }
    })
  })
    setLevel4id(level4idarr)

    //level5
    let level5idarr=[]
    level4idarr.forEach((level5)=>{
    response.data.forEach((item)=>{
      if(item.sponsor_id===level5.id){
        level5idarr.push({id:item.partner_id,name:item.name,date:item.joining_date})
      }
    })
  })
    setLevel5id(level5idarr)
   }

   const getreward=async()=>{
      const result=await axios.post(baseURL+"/getreward",{
        partnerid:partnerid,
      })
      setReward(result.data)
   }
   const gettransaction=async()=>{
    const result=await axios.post(baseURL+"/gettransaction",{
      partnerid:partnerid,
    })
    setTransaction(result.data)
 }

   useEffect(()=>{
    getdata()
    getUserDetail()
    getreward()
    gettransaction()
    kycbutton()
   },[])

   const daysCalculator=(StartDate, EndDate)=> {
      let oneDay = 1000 * 60 * 60 * 24;
      let start = new Date(EndDate);
      let end = new Date(StartDate);
      return Math.floor(Math.abs(end.getTime()-start.getTime()) / oneDay);
   }
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

  let level1=level1id.length
  let level2=level2id.length
  let level3=level3id.length
  let level4=level4id.length
  let level5=level5id.length  

  let total_joinees=level1+level2+level3+level4+level5
  let no_of_days=daysCalculator(joiningdate,getCurrentDate())
  
  //one time
  let onetime_fixed_level1=10
  // let onetime_fixed_level2=20
  // let onetime_fixed_level3=10
  // let onetime_fixed_level4=5
  // let onetime_fixed_level5=5

  let onetime_level1=level1*onetime_fixed_level1
  // let onetime_level2=level2*onetime_fixed_level2
  // let onetime_level3=level3*onetime_fixed_level3
  // let onetime_level4=level4*onetime_fixed_level4
  // let onetime_level5=level5*onetime_fixed_level5

  let onetime_total=onetime_level1

  //daily
  let daily_fixed_level1=2
  let daily_fixed_level2=1
  let daily_fixed_level3=1
  let daily_fixed_level4=0.5
  let daily_fixed_level5=0.25

  let daily_level1=level1*daily_fixed_level1
  let daily_level2=level2*daily_fixed_level2
  let daily_level3=level3*daily_fixed_level3
  let daily_level4=level4*daily_fixed_level4
  let daily_level5=level5*daily_fixed_level5

  const updatestatus=(date,level)=>{
    if(level<2 && daysCalculator(joiningdate,getCurrentDate())>30)
    {
      return <h3 className='text-red-600 text-xl font-bold my-2'>Your Income Has Been Restricted Until You Add A New Joinee</h3>
    }
  }

  
  const getselfincome=()=>{
    if(level1<2){
      let selfincome=0
      if(daysCalculator(joiningdate,getCurrentDate())<30){
        selfincome=10
      }
      return selfincome
    }
    else{
      let selfincome=10
      return selfincome
    }
  }
  const selfincome=getselfincome()

  const getDaily=(temp)=>{
    if (temp<10){
      let x=0
      return x
    }
    else{
      return temp
    }
  }
  let y=daily_level1+daily_level2+daily_level3+daily_level4+daily_level5+selfincome
  let daily_total=getDaily(y)

  //reward
  const getrewardinfo=()=>{
    let rewardincome=0
    reward.forEach((item)=>{
      rewardincome=rewardincome+item.amount
    })
    return rewardincome
  }
  let rewardincome=getrewardinfo()

  //transaction
  const gettransactioninfo=()=>{
    let transactionincome=0
    transaction.forEach((item)=>{
      transactionincome=transactionincome+item.amount
    })
    return transactionincome
  }
  let transactionincome=gettransactioninfo()


  //total income
  const totalselfdays=()=>{
    if(level1<2){
      let total=daysCalculator(joiningdate,getCurrentDate())
      if (total>30){
        total=30
      }
      return total
    }
    else{
      let lastselfdate=level1id[1].date
      let total=0
      if(daysCalculator(joiningdate,lastselfdate)<30){
        let diffrence=daysCalculator(joiningdate,lastselfdate)
        total=total+diffrence
      }
      else{
        total=total+30
      }
      total=total+daysCalculator(getCurrentDate(),lastselfdate)
      return total
      }
  }

  let total_self_days=totalselfdays()

  let total_self=total_self_days*10

  let todaydate=getCurrentDate()
  let level1days=0
  level1id.forEach((item,index)=>{
    if(level1>1){
    level1days=level1days+daysCalculator(todaydate,item.date)
    }
  })

  let level2days=0
  level2id.forEach((item,index)=>{
    if(level1>1){
    level2days=level2days+daysCalculator(todaydate,item.date)
    }
  })

  let level3days=0
  level3id.forEach((item,index)=>{
    if(level1>1){
    level3days=level3days+daysCalculator(todaydate,item.date)
    }
  })

  let level4days=0
  level4id.forEach((item,index)=>{
    if(level1>1){
    level4days=level4days+daysCalculator(todaydate,item.date)
    }
  })

  let level5days=0
  level5id.forEach((item,index)=>{
    if(level1>1){
    level5days=level5days+daysCalculator(todaydate,item.date)
    }
  })

  const total_level1=level1days*daily_fixed_level1
  const total_level2=level2days*daily_fixed_level2
  const total_level3=level3days*daily_fixed_level3
  const total_level4=level4days*daily_fixed_level4
  const total_level5=level5days*daily_fixed_level5

  const total_income=onetime_total+total_level1+total_level2+total_level3+total_level4+total_level5+total_self+rewardincome-transactionincome

  const requestWithdrawButton=(income)=>{
    if(income>299){
      return <button onClick={()=>navigate("/withdraw",{state:{partnerid:partnerid,showform:showform}})} type="button" class="text-white bg-blue-600 hover:bg-blue-800 font-medium rounded-lg text-md px-5 py-2.5 mr-2 mb-2">Request Withdrawal</button>
    }
    else{
      return <button onClick={totalIncomeLess} type="button" class="disabled text-white bg-blue-400 font-medium rounded-lg text-md px-5 py-2.5 mr-2 mb-2">Request Withdrawal</button>
    }
  }

  const KYCButton=(temp)=>{
    if(temp === true){
      return <button onClick={()=>navigate("/kyc",{state:{partnerid:partnerid,showform:showform}})} type="button" class="text-white bg-blue-600 hover:bg-blue-800 font-medium rounded-lg text-md px-5 py-2.5 mr-2 mb-2">Update KYC Details</button>
    }
  }

  console.log(showkycbutton)

  const totalIncomeLess=()=>{
    window.alert("Your Income Must Be More Than 300 In Order To Withdraw")
  }

  let total_points=Math.round((level1)+(level2/4)+(level3/8)+(level4/16)+(level5/32))
  let withdraw_limit=total_points*400

  return (
    <>
    
<div className="inline-flex items-center p-2 mt-5 mx-7 rounded-lg md:hidden">
<div className="flex flex-wrap">
      <div className="">
        <div className="h-full flex items-center border-gray-300 border p-2 rounded-lg">
          <div className="flex-grow">
          <div className="p-2">
            <h3 className="text-lg font-semibold px-2">{name}</h3>
            <table className="mt-3">
                <tbody>
                <tr>
                    <td className="text-sm text-gray-500 px-2 py-1">User ID</td>
                    <td className="text-sm text-gray-800 px-2 py-1">{partnerid}</td>
                </tr>
                <tr>
                    <td className="text-sm text-gray-500 px-2 py-1">Sponsor ID</td>
                    <td className="text-sm text-gray-800 px-2 py-1">{sponsor}</td>
                </tr>
                <tr>
                    <td className="text-sm text-gray-500 px-2 py-1">Joining Date</td>
                    <td className="text-sm text-gray-800 px-2 py-1">{joiningdate.slice(8,10)+"/"+joiningdate.slice(5,7)+"/"+joiningdate.slice(0,4)}</td>
                </tr>
                <tr>
                    <td className="text-sm text-gray-500 px-2 py-1">Phone</td>
                    <td className="text-sm text-gray-800 px-2 py-1">{phone}</td>
                </tr>
            </tbody>
            </table>
        </div>
          </div>
        </div>
      </div>
      </div>
</div>

<aside id="default-sidebar" className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
<div className="overflow-none bg-gradient-to-bl from-purple-800 via-violet-900 to-purple-800">
<div className="flex h-screen w-full">
<div className="max-w-xs">
    <div className="text-white my-10">
        <div className="photo-wrapper p-2">
            <img className="w-20 h-20 mx-auto" src={user} alt=" "/>
        </div>
        <div className="p-2">
            <h3 className="text-center text-xl text-white font-medium leading-8">{name}</h3>
            <table className="ml-2 text-sm my-3">
                <tbody>
                <tr>
                    <td className="px-4 py-2 text-gray-400 font-semibold">User ID</td>
                    <td className="px-4 py-2 text-gray-100 font-semibold">{partnerid}</td>
                </tr>
                <tr>
                    <td className="px-4 py-2 text-gray-400 font-semibold">Sponsor ID</td>
                    <td className="px-4 py-2 text-gray-100 font-semibold">{sponsor}</td>
                </tr>
                <tr>
                    <td className="px-4 py-2 text-gray-400 font-semibold">Joining Date</td>
                    <td className="px-4 py-2 text-gray-100 font-semibold">{joiningdate.slice(8,10)+"/"+joiningdate.slice(5,7)+"/"+joiningdate.slice(0,4)}</td>
                </tr>
                <tr>
                    <td className="px-4 py-2 text-gray-400 font-semibold">Phone</td>
                    <td className="px-4 py-2 font-semibold">{phone}</td>
                </tr>
            </tbody>
            </table>
        </div>
    </div>
</div>
</div>
</div>
   </aside>

<div className="p-4 sm:ml-64">
  <div className='flex justify-between'>
  <h1 className='text-2xl font-bold border-b-2 border-dashed border-gray-500 inline-block pb-1 mx-5 my-2'>Dashboard</h1>
  <button onClick={()=>{navigate(-1)}} className="bg-transparent hover:bg-red-500 text-red-500 font-semibold hover:text-white py-2 px-4 mx-5 my-2 border border-red-500 hover:border-transparent rounded">
  Log Out
</button>
  </div>
  <div>
    <h2 className='text-xl font-bold mx-6 mt-5'>Welcome To AMO BUSINESS!</h2>
  </div>
<section className="flex flex-wrap justify-center text-gray-600 body-font overflow-none">
  <div className="container px-5 my-5 mx-auto">
    <div className="flex flex-wrap -m-4">
      <div className="p-4 md:w-1/4">
        <div className="flex rounded-lg bg-gradient-to-bl from-sky-300 to-cyan-200 p-8 flex-col">
          <div className="flex items-center mb-3">
            <h2 className="text-gray-600 text-lg font-bold">Daily Income</h2>
          </div>
          <div className="flex-grow">
            <p className="font-bold text-gray-800 text-4xl">{"₹"+daily_total}</p>
          </div>
        </div>
      </div>
      <div className="p-4 md:w-1/4">
      <div className="flex rounded-lg bg-gradient-to-bl from-sky-300 to-cyan-200 p-8 flex-col">
          <div className="flex items-center mb-3">
            <h2 className="text-gray-600 text-lg font-bold">Total Income</h2>
          </div>
          <div className="flex-grow">
            <p className="font-bold text-gray-800 text-4xl">{"₹"+total_income}</p>
          </div>
        </div>
      </div>
      <div className="p-4 md:w-1/4">
      <div className="flex rounded-lg bg-gradient-to-bl from-sky-300 to-cyan-200 p-8 flex-col">
          <div className="flex items-center mb-3">
            <h2 className="text-gray-600 text-lg font-bold">Total Joinees</h2>
          </div>
          <div className="flex-grow">
            <p className="font-bold text-gray-800 text-4xl">{total_joinees}</p>
          </div>
        </div>
      </div>
      <div className="p-4 md:w-1/4">
      <div className="flex rounded-lg bg-gradient-to-bl from-sky-300 to-cyan-200 p-8 flex-col">
          <div className="flex items-center mb-3">
            <h2 className="text-gray-600 text-lg font-bold">Number Of Days</h2>
          </div>
          <div className="flex-grow">
            <p className="font-bold text-gray-800 text-4xl">{no_of_days}</p>
          </div>
        </div>
      </div>
      <div className="p-4 md:w-1/4">
      <div className="flex rounded-lg bg-gradient-to-bl from-sky-300 to-cyan-200 p-8 flex-col">
          <div className="flex items-center mb-3">
            <h2 className="text-gray-600 text-lg font-bold">Total Points</h2>
          </div>
          <div className="flex-grow">
            <p className="font-bold text-gray-800 text-4xl">{total_points}</p>
          </div>
        </div>
      </div>
      <div className="p-4 md:w-1/4">
        <div className="flex rounded-lg bg-gradient-to-bl from-sky-300 to-cyan-200 p-8 flex-col">
          <div className="flex items-center mb-3">
            <h2 className="text-gray-600 text-lg font-bold">Withdraw Limit</h2>
          </div>
          <div className="flex-grow">
            <p className="font-bold text-gray-800 text-4xl">{withdraw_limit}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
<div className='mx-5'>
  {updatestatus(lastjoining,level1)}
</div>

<div className='flex flex-col mx-5 mt-1 sm:flex-row'>
<div>{requestWithdrawButton(total_income)}</div>
<div>{KYCButton(showkycbutton)}</div>
</div>


  <div className="mx-5">
    <h2 className="mt-2 mb-2 text-2xl font-bold">
      Daily Income Analysis
    </h2>
    <table className="border border-black border-collapse w-full">
		<thead>
			<tr>
				<th className="border border-black p-2 bg-blue-200">Levels</th>
				<th className="border border-black p-2 bg-blue-200">Joinees</th>
				<th className="border border-black p-2 bg-blue-200">Per ID</th>
				<th className="border border-black p-2 bg-blue-300">Total</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<td className="border border-black p-2 font-semibold">Level 1</td>
				<td className="border border-black p-2 font-semibold text-center">{level1}</td>
				<td className="border border-black p-2 font-semibold text-center">{daily_fixed_level1}</td>
				<td className="border border-black p-2 font-semibold text-center">{daily_level1}</td>
			</tr>
			<tr>
      <td className="border border-black p-2 font-semibold">Level 2</td>
				<td className="border border-black p-2 font-semibold text-center">{level2}</td>
				<td className="border border-black p-2 font-semibold text-center">{daily_fixed_level2}</td>
				<td className="border border-black p-2 font-semibold text-center">{daily_level2}</td>
			</tr>
			<tr>
      <td className="border border-black p-2 font-semibold">Level 3</td>
				<td className="border border-black p-2 font-semibold text-center">{level3}</td>
				<td className="border border-black p-2 font-semibold text-center">{daily_fixed_level3}</td>
				<td className="border border-black p-2 font-semibold text-center">{daily_level3}</td>
			</tr>
			<tr>
      <td className="border border-black p-2 font-semibold">Level 4</td>
			<td className="border border-black p-2 font-semibold text-center">{level4}</td>
			<td className="border border-black p-2 font-semibold text-center">{daily_fixed_level4}</td>
			<td className="border border-black p-2 font-semibold text-center">{daily_level4}</td>
			</tr>
			<tr>
      <td className="border border-black p-2 font-semibold">Level 5</td>
		  <td className="border border-black p-2 font-semibold text-center">{level5}</td>
			<td className="border border-black p-2 font-semibold text-center">{daily_fixed_level5}</td>
			<td className="border border-black p-2 font-semibold text-center">{daily_level5}</td>
			</tr>
      <tr>
        <td className="border border-black p-2 font-semibold">Self Income</td>
				<td className="border border-black p-2 font-semibold text-center"> - </td>
				<td className="border border-black p-2 font-semibold text-center"> - </td>
				<td className="border border-black p-2 font-semibold text-center">{selfincome}</td>
			</tr>
      <tr>
        <td className="px-5 py-2 font-semibold bg-blue-200">Total</td>
        <td className='bg-blue-200'></td>
        <td className='bg-blue-200'></td>
				<td className="border border-black p-2 text-center font-semibold bg-blue-200">{daily_total}</td>
			</tr>
		</tbody>
	</table>
  </div>

  {/* ONE TIME LEVEL INCOME */}
  <div className='mx-5'>
    <h2 className='mt-10 mb-2 text-2xl font-bold'>
      One Time Level Income
    </h2>
    <table className="border border-black border-collapse w-full">
		<thead>
			<tr>
				<th className="border border-black p-2 bg-blue-200">Levels</th>
				<th className="border border-black p-2 bg-blue-200">Joinees</th>
				<th className="border border-black p-2 bg-blue-200">Per ID</th>
				<th className="border border-black p-2 bg-blue-300">Total</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<td className="border border-black p-2 font-semibold">Level 1</td>
				<td className="border border-black p-2 text-center font-semibold">{level1}</td>
				<td className="border border-black p-2 text-center font-semibold">{onetime_fixed_level1}</td>
				<td className="border border-black p-2 text-center font-semibold">{onetime_level1}</td>
			</tr>
			{/* <tr>
        <td className="border border-black p-2 font-semibold">Level 2</td>
				<td className="border border-black p-2 text-center font-semibold">{level2}</td>
				<td className="border border-black p-2 text-center font-semibold">{onetime_fixed_level2}</td>
				<td className="border border-black p-2 text-center font-semibold">{onetime_level2}</td>
			</tr>
			<tr>
        <td className="border border-black p-2 font-semibold">Level 3</td>
				<td className="border border-black p-2 text-center font-semibold">{level3}</td>
				<td className="border border-black p-2 text-center font-semibold">{onetime_fixed_level3}</td>
				<td className="border border-black p-2 text-center font-semibold">{onetime_level3}</td>
			</tr>
			<tr>
        <td className="border border-black p-2 font-semibold">Level 4</td>
				<td className="border border-black p-2 text-center font-semibold">{level4}</td>
				<td className="border border-black p-2 text-center font-semibold">{onetime_fixed_level4}</td>
				<td className="border border-black p-2 text-center font-semibold">{onetime_level4}</td>
			</tr>
			<tr>
        <td className="border border-black p-2 font-semibold">Level 5</td>
				<td className="border border-black p-2 text-center font-semibold">{level5}</td>
				<td className="border border-black p-2 text-center font-semibold">{onetime_fixed_level5}</td>
				<td className="border border-black p-2 text-center font-semibold">{onetime_level5}</td>
			</tr> */}
      <tr>
        <td className="px-5 p-2 bg-blue-200 font-semibold">Total</td>
        <td className='bg-blue-200'></td>
        <td className='bg-blue-200'></td>
				<td className="border border-black p-2 text-center bg-blue-200 font-semibold">{onetime_total}</td>
			</tr>
		</tbody>
	</table>  
  </div>

    {/* TOTAL INCOME */}
    <div className="mx-5">
    <h2 className="mt-10 mb-2 text-2xl font-bold">
      Total Income Analysis
    </h2>
    <table className="border border-black border-collapse w-full">
		<thead>
			<tr>
				<th className="border border-black p-2 bg-blue-200">Mode</th>
				<th className="border border-black p-2 bg-blue-200">Days</th>
				<th className="border border-black p-2 bg-blue-200">Per Day</th>
				<th className="border border-black p-2 bg-blue-300">Total</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<td className="border border-black p-2 font-semibold">Level 1</td>
				<td className="border border-black p-2 font-semibold text-center">{level1days}</td>
				<td className="border border-black p-2 font-semibold text-center">{daily_fixed_level1}</td>
				<td className="border border-black p-2 font-semibold text-center">{total_level1}</td>
			</tr>
			<tr>
      <td className="border border-black p-2 font-semibold">Level 2</td>
				<td className="border border-black p-2 font-semibold text-center">{level2days}</td>
				<td className="border border-black p-2 font-semibold text-center">{daily_fixed_level2}</td>
				<td className="border border-black p-2 font-semibold text-center">{total_level2}</td>
			</tr>
			<tr>
      <td className="border border-black p-2 font-semibold">Level 3</td>
				<td className="border border-black p-2 font-semibold text-center">{level3days}</td>
				<td className="border border-black p-2 font-semibold text-center">{daily_fixed_level3}</td>
				<td className="border border-black p-2 font-semibold text-center">{total_level3}</td>
			</tr>
			<tr>
      <td className="border border-black p-2 font-semibold">Level 4</td>
			<td className="border border-black p-2 font-semibold text-center">{level4days}</td>
			<td className="border border-black p-2 font-semibold text-center">{daily_fixed_level4}</td>
			<td className="border border-black p-2 font-semibold text-center">{total_level4}</td>
			</tr>
			<tr>
      <td className="border border-black p-2 font-semibold">Level 5</td>
		  <td className="border border-black p-2 font-semibold text-center">{level5days}</td>
			<td className="border border-black p-2 font-semibold text-center">{daily_fixed_level5}</td>
			<td className="border border-black p-2 font-semibold text-center">{total_level5}</td>
			</tr>
      <tr>
        <td className="border border-black p-2 font-semibold">Self Income</td>
				<td className="border border-black p-2 font-semibold text-center">{total_self_days}</td>
				<td className="border border-black p-2 font-semibold text-center">10</td>
				<td className="border border-black p-2 font-semibold text-center">{total_self}</td>
			</tr>
      <tr>
        <td className="border border-black p-2 font-semibold">One Time Income</td>
				<td className="border border-black p-2 font-semibold text-center">-</td>
				<td className="border border-black p-2 font-semibold text-center">-</td>
				<td className="border border-black p-2 font-semibold text-center">{onetime_total}</td>
			</tr>
      <tr>
        <td className="border border-black p-2 font-semibold">Rewards</td>
				<td className="border border-black p-2 font-semibold text-center">-</td>
				<td className="border border-black p-2 font-semibold text-center">-</td>
				<td className="border border-black p-2 font-semibold text-center">{rewardincome}</td>
			</tr>
      <tr>
        <td className="border border-black p-2 font-semibold">Payout</td>
				<td className="border border-black p-2 font-semibold text-center">-</td>
				<td className="border border-black p-2 font-semibold text-center">-</td>
				<td className="border border-black p-2 font-semibold text-center">{transactionincome}</td>
			</tr>
      <tr>
        <td className="px-5 py-2 font-semibold bg-blue-200">Total</td>
        <td className='bg-blue-200'></td>
        <td className='bg-blue-200'></td>
				<td className="border border-black p-2 text-center font-semibold bg-blue-200">{total_income}</td>
			</tr>
		</tbody>
	</table>
  </div>

  {/* REWARD */}
  <div className='mx-5'>
  <h2 className='mt-10 mb-2 text-2xl font-bold'>
      Rewards
    </h2>
  <table className="border border-black border-collapse w-full">
		<thead>
			<tr>
        <th className="border text-sm border-black p-2 bg-blue-200"></th>
				<th className="border text-sm border-black p-2 bg-blue-200">Description</th>
				<th className="border text-sm border-black p-2 bg-blue-200">Amount</th>
        <th className="border text-sm border-black p-2 bg-blue-200">Date</th>      
			</tr>
		</thead>
		<tbody>
			{reward.map((item,index)=>{
                return(
                    <tr key={item.partner_id}>
                        <td className='border text-sm font-semibold border-black p-1 text-center'>{index+1}</td>
                        <td className='border text-sm font-semibold border-black p-2'>{item.remark}</td>
                        <td className='border text-sm font-semibold border-black p-2'>{item.amount}</td>
                        <td className='border text-sm font-semibold border-black p-2'>{item.date.slice(8,10)+"/"+item.date.slice(5,7)+"/"+item.date.slice(0,4)}</td>
                    </tr>
                )
            })}
		</tbody>
	</table>
  </div>

  {/* TRANSACTION */}
  <div className='mx-5'>
  <h2 className='mt-10 mb-2 text-2xl font-bold'>
      Payout
    </h2>
  <table className="border border-black border-collapse w-full">
		<thead>
			<tr>
        <th className="border text-sm border-black p-2 bg-blue-200"></th>
				<th className="border text-sm border-black p-2 bg-blue-200">Description</th>
				<th className="border text-sm border-black p-2 bg-blue-200">Amount</th>
        <th className="border text-sm border-black p-2 bg-blue-200">Date</th>      
			</tr>
		</thead>
		<tbody>
			{transaction.map((item,index)=>{
                return(
                    <tr key={item.partner_id}>
                        <td className='border text-sm font-semibold border-black p-1 text-center'>{index+1}</td>
                        <td className='border text-sm font-semibold border-black p-2'>{item.remark}</td>
                        <td className='border text-sm font-semibold border-black p-2'>{item.amount}</td>
                        <td className='border text-sm font-semibold border-black p-2'>{item.date.slice(8,10)+"/"+item.date.slice(5,7)+"/"+item.date.slice(0,4)}</td>
                    </tr>
                )
            })}
		</tbody>
	</table>
  </div>


  {/* LEVELS */}
  <div className='mx-5'>
  <h2 className='mt-10 mb-2 text-2xl font-bold'>
      Level 1
    </h2>
  <table className="border border-black border-collapse w-full">
		<thead>
			<tr>
        <th className="border text-sm border-black p-2 bg-blue-200"></th>
				<th className="border text-sm border-black p-2 bg-blue-200">User ID</th>
				<th className="border text-sm border-black p-2 bg-blue-200">Name</th>
        <th className="border text-sm border-black p-2 bg-blue-200">Date</th>      
			</tr>
		</thead>
		<tbody>
			{level1id.map((item,index)=>{
                return(
                    <tr key={item.partner_id}>
                        <td className='border text-sm font-semibold border-black p-1 text-center'>{index+1}</td>
                        <td className='border text-sm font-semibold border-black p-2'>{item.id}</td>
                        <td className='border text-sm font-semibold border-black p-2'>{item.name}</td>
                        <td className='border text-sm font-semibold border-black p-2'>{item.date.slice(8,10)+"/"+item.date.slice(5,7)+"/"+item.date.slice(0,4)}</td>
                    </tr>
                )
            })}
		</tbody>
	</table>
  </div>
  <div className='mx-5'>
  <h2 className='mt-10 mb-2 text-2xl font-bold'>
      Level 2
    </h2>
  <table className="border border-black border-collapse w-full">
		<thead>
			<tr>
        <th className="border text-sm border-black p-2 bg-blue-200"></th>
				<th className="border text-sm border-black p-2 bg-blue-200">User ID</th>
				<th className="border text-sm border-black p-2 bg-blue-200">Name</th>
        <th className="border text-sm border-black p-2 bg-blue-200">Date</th>      
			</tr>
		</thead>
		<tbody>
			{level2id.map((item,index)=>{
                return(
                    <tr key={item.partner_id}>
                        <td className='border text-sm font-semibold border-black p-1 text-center'>{index+1}</td>
                        <td className='border text-sm font-semibold border-black p-2'>{item.id}</td>
                        <td className='border text-sm font-semibold border-black p-2'>{item.name}</td>
                        <td className='border text-sm font-semibold border-black p-2'>{item.date.slice(8,10)+"/"+item.date.slice(5,7)+"/"+item.date.slice(0,4)}</td>
                    </tr>
                )
            })}
		</tbody>
	</table>
  </div>
  <div className='mx-5'>
  <h2 className='mt-10 mb-2 text-2xl font-bold'>
      Level 3
    </h2>
  <table className="border border-black border-collapse w-full">
		<thead>
			<tr>
        <th className="border text-sm border-black p-2 bg-blue-200"></th>
				<th className="border text-sm border-black p-2 bg-blue-200">User ID</th>
				<th className="border text-sm border-black p-2 bg-blue-200">Name</th>
        <th className="border text-sm border-black p-2 bg-blue-200">Date</th>      
			</tr>
		</thead>
		<tbody>
			{level3id.map((item,index)=>{
                return(
                    <tr key={item.partner_id}>
                        <td className='border text-sm font-semibold border-black p-1 text-center'>{index+1}</td>
                        <td className='border text-sm font-semibold border-black p-2'>{item.id}</td>
                        <td className='border text-sm font-semibold border-black p-2'>{item.name}</td>
                        <td className='border text-sm font-semibold border-black p-2'>{item.date.slice(8,10)+"/"+item.date.slice(5,7)+"/"+item.date.slice(0,4)}</td>
                    </tr>
                )
            })}
		</tbody>
	</table>
  </div>
  <div className='mx-5'>
  <h2 className='mt-10 mb-2 text-2xl font-bold'>
      Level 4
    </h2>
  <table className="border border-black border-collapse w-full">
		<thead>
			<tr>
        <th className="border text-sm border-black p-2 bg-blue-200"></th>
				<th className="border text-sm border-black p-2 bg-blue-200">User ID</th>
				<th className="border text-sm border-black p-2 bg-blue-200">Name</th>
        <th className="border text-sm border-black p-2 bg-blue-200">Date</th>      
			</tr>
		</thead>
		<tbody>
			{level4id.map((item,index)=>{
                return(
                    <tr key={item.partner_id}>
                        <td className='border text-sm font-semibold border-black p-1 text-center'>{index+1}</td>
                        <td className='border text-sm font-semibold border-black p-2'>{item.id}</td>
                        <td className='border text-sm font-semibold border-black p-2'>{item.name}</td>
                        <td className='border text-sm font-semibold border-black p-2'>{item.date.slice(8,10)+"/"+item.date.slice(5,7)+"/"+item.date.slice(0,4)}</td>
                    </tr>
                )
            })}
		</tbody>
	</table>
  </div>
  <div className='mx-5'>
  <h2 className='mt-10 mb-2 text-2xl font-bold'>
      Level 5
    </h2>
  <table className="border border-black border-collapse w-full">
		<thead>
			<tr>
        <th className="border text-sm border-black p-2 bg-blue-200"></th>
				<th className="border text-sm border-black p-2 bg-blue-200">User ID</th>
				<th className="border text-sm border-black p-2 bg-blue-200">Name</th>
        <th className="border text-sm border-black p-2 bg-blue-200">Date</th>      
			</tr>
		</thead>
		<tbody>
			{level5id.map((item,index)=>{
                return(
                    <tr key={item.partner_id}>
                        <td className='border text-sm font-semibold border-black p-1 text-center'>{index+1}</td>
                        <td className='border text-sm font-semibold border-black p-2'>{item.id}</td>
                        <td className='border text-sm font-semibold border-black p-2'>{item.name}</td>
                        <td className='border text-sm font-semibold border-black p-2'>{item.date.slice(8,10)+"/"+item.date.slice(5,7)+"/"+item.date.slice(0,4)}</td>
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

export default Dashboard
