import React from 'react'
import logo from '../assets/logo.png'

const Navbar = () => {
  return (
    <>
    {/* <nav class=" bg-white border-gray-200 overflow-hidden mx-auto px-2 sm:px-4 py-2.5 rounded">
  <div class="container flex flex-wrap items-center justify-between mx-auto">
  <div class="flex items-center pt-5 pl-2">
  <img src={logo} class="h-6 mr-3 sm:h-9" alt="logo" />
      <span class="self-center text-xl font-bold whitespace-nowrap tracking-tight leading-none">AMO BUSINESS</span>
  </div>
  </div>
</nav> */}


<nav class="bg-white dark:bg-gray-900 fixed w-full z-20 top-0 left-0 border-b border-gray-200 dark:border-gray-600">
  <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
  <img src={logo} class="h-6 mr-3 sm:h-9" alt="logo" />
      <span class="self-center text-2xl font-bold whitespace-nowrap tracking-tight leading-none">AMO BUSINESS</span>
  <div class="flex md:order-2">
    <a href='https://youtu.be/l5o5FuI1ERg' target='_blank'>
      <button type="button" class="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-md px-4 py-2 text-center mr-3 md:mr-0">Help</button>
    </a>
  </div>
  </div>
</nav>


    </>
  )
}

export default Navbar