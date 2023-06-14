import React from 'react'
import LoginForm from './components/LoginForm'
import LandingPage from './components/LandingPage';
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import SignupForm from './components/SignupForm';
import Dashboard from './components/Dashboard';
import Wait from './components/Wait';
import AdminDashboard from './components/AdminDashboard';
import AdminLogin from './components/AdminLogin';
import EditForm from './components/EditForm';
import Transaction from './components/Transaction';
import Reward from './components/Reward';
import Withdraw from './components/Withdraw';
import Withdrawrequest from './components/Withdrawrequest';
import KYC from './components/KYC';
import KYCDetails from './components/KYCDetails';
import Payment from './components/Payment';
const App = () => {
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route exact path="/" element={<LandingPage/>}/>
      <Route exact path="/login" element={<LoginForm/>}/>
      <Route exact path="/signup" element={<SignupForm/>}/>
      <Route exact path="/dashboard" element={<Dashboard/>}/>
      <Route exact path="/success" element={<Wait/>}/>
      <Route exact path="/admin" element={<AdminLogin/>}/>
      <Route exact path="/admin/dashboard" element={<AdminDashboard/>}/>
      <Route exact path="/edit" element={<EditForm/>}/>
      <Route exact path="/transaction" element={<Transaction/>}/>
      <Route exact path="/reward" element={<Reward/>}/>
      <Route exact path="/withdraw" element={<Withdraw/>}/>
      <Route exact path="/withdrawrequest" element={<Withdrawrequest/>}/>
      <Route exact path="/kyc" element={<KYC/>}/>
      <Route exact path="/kycdetails" element={<KYCDetails/>}/>
      <Route exact path="/payment" element={<Payment/>}/>
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App