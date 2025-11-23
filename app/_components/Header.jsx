import React from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
const Header = () => {
  return (
    <div className='flex justify-center pt-4 px-4'>
      <div className='flex justify-between items-center p-4 shadow-lg rounded-full bg-white w-full max-w-5xl border border-gray-100'>
          <div className='flex items-center gap-2 ml-4'>
            <Image src={'/logo.svg'} width={40} height={50} alt="Nexus"/>
            <span className='font-bold text-xl'>Nexus</span>
          </div>
          
          <div className='hidden md:flex gap-8 font-medium text-gray-600 bg-gray-50 px-8 py-2 rounded-full'>
            <a href="#" className='hover:text-primary transition-colors'>Home</a>
            <a href="#" className='hover:text-primary transition-colors'>Company</a>
            <a href="#" className='hover:text-primary transition-colors'>Service</a>
            <a href="#" className='hover:text-primary transition-colors'>Resources</a>
            <a href="#" className='hover:text-primary transition-colors'>About us</a>
          </div>

          <Button className='rounded-full px-6 mr-2'> Get Started </Button>
      </div>
    </div>
  )
}

export default Header