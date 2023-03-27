import React from 'react'
import heroimg from '../assets/heroimg.png'
import {useNavigate} from 'react-router-dom'

const HeroSection = () => {
    let navigate=useNavigate();
  return (
    <>
<section class="text-gray-600 body-font overflow-hidden">
  <div class="container mx-auto flex px-10 my-20 md:flex-row flex-col items-center">
    <div class="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
      <h1 class="title-font sm:text-4xl text-3xl mb-4 font-bold text-gray-900">Unlock Your Potential And Achieve Your Dreams With Our Platform
      </h1>
      <p class="mb-8 leading-relaxed">Join us and together we'll reach new heights in success through shared efforts and opportunities.</p>
      <div class="flex justify-center">
      <button onClick={()=>{navigate("/login")}} className="inline-flex items-center justify-center px-5 py-3 mr-3 text-base font-medium text-center text-white rounded-lg bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300">
                Log In
                <svg className="w-5 h-5 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
            </button>
            <button onClick={()=>{navigate("/signup")}} className="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:ring-gray-100">
                Sign Up
            </button> 
      </div>
    </div>
    <div class="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
      <img class="object-cover object-center rounded" src={heroimg} alt="heroimg"/>
    </div>
  </div>
</section>

    </>
  )
}

export default HeroSection