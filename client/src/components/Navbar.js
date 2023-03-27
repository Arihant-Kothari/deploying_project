import React from 'react'
import logo from '../assets/logo.png'

const Navbar = () => {
  return (
    <>
    <nav class=" bg-white border-gray-200 overflow-hidden mx-auto px-2 sm:px-4 py-2.5 rounded">
  <div class="container flex flex-wrap items-center justify-between mx-auto">
  <div class="flex items-center pt-5 pl-2">
  <img src={logo} class="h-6 mr-3 sm:h-9" alt="logo" />
      <span class="self-center text-xl font-bold whitespace-nowrap tracking-tight leading-none">AMO BUSINESS</span>
  </div>
  </div>
</nav>

    </>
  )
}

export default Navbar