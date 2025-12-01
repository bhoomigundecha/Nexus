"use client";

import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const Header = () => {
  const router = useRouter();
  
  return (
    <div className='flex justify-center pt-4 px-4'>
      <div className='flex justify-between items-center p-4 shadow-lg rounded-full bg-white w-full max-w-5xl border border-gray-100'>
          
        <div className='flex items-center gap-2 ml-4 cursor-pointer'
             onClick={() => router.push('/')}>
          <Image src={'/logo.svg'} width={40} height={50} alt="Nexus"/>
          <span className='font-bold text-xl'>Nexus</span>
        </div>

        <div className='hidden md:flex gap-8 font-medium text-gray-600 bg-gray-50 px-8 py-2 rounded-full'>
          <button className='hover:text-blue-700 transition-colors'>Home</button>
          <button className='hover:text-blue-700 transition-colors'>Company</button>
          <button className='hover:text-blue-700 transition-colors'>Service</button>
          <button className='hover:text-blue-700 transition-colors'>Resources</button>
          <button className='hover:text-blue-700 transition-colors'>About us</button>
        </div>

        <button
          type="button"
          onClick={() => {
            window.location.href = '/dashboard';
          }}
          className='inline-block rounded-full px-6 py-2 mr-2 bg-blue-600 hover:bg-blue-700 text-white cursor-pointer font-medium transition-colors relative z-10 border-0'
        >
          Get Started
        </button>
      </div>
    </div>
  );
};

export default Header;
