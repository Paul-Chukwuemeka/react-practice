import React from 'react'
import { FaHeart } from 'react-icons/fa6'

const Footer = () => {
  return (
    <div className='w-full text-white p-2'>
        <p className='flex items-center gap-2 justify-center'>Made with <FaHeart className='text-red-600'/> by Paul</p>
    </div>
  )
}

export default Footer