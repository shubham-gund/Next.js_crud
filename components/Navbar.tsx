import React from 'react'
import { Avatar } from "flowbite-react";

const Navbar = () => {
  return (
    <div className='flex justify-between items-center h-14 w-full border-b-2 border-black-700 px-8'>
      <div className='flex items-center space-x-4 font-bold'>
        Tournamax
      </div>
      <div className='flex'>
        <div className="flex  justify-center items-center w-10 h-10 overflow-hidden bg-gray-200 rounded-full">
          <svg className="flex justify-center items-center w-6 h-6 text-gray-400 -left-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"></path></svg>
        </div>
      </div>


    </div>
  )
}

export default Navbar