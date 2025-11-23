"use client";
import React from 'react'
import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Upgrade = () => {
  return (
    <div className='mx-auto max-w-3xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8'>
      <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 sm:items-center md:gap-8'>
        
        {/* Free Plan */}
        <div className='rounded-2xl border border-gray-200 p-6 shadow-sm sm:px-8 lg:p-12 bg-white'>
          <div className='text-center'>
            <h2 className='text-lg font-medium text-gray-900'>
              Free
              <span className='sr-only'>Plan</span>
            </h2>

            <p className='mt-2 sm:mt-4'>
              <strong className='text-3xl font-bold text-gray-900 sm:text-4xl'> 0$ </strong>
              <span className='text-sm font-medium text-gray-700'>/month</span>
            </p>
          </div>

          <ul className='mt-6 space-y-2'>
            <li className='flex items-center gap-1'>
              <Check className='h-4 w-4 text-green-700'/>
              <span className='text-gray-700'> 5 Course Generations </span>
            </li>
            <li className='flex items-center gap-1'>
              <Check className='h-4 w-4 text-green-700'/>
              <span className='text-gray-700'> Limited Support </span>
            </li>
            <li className='flex items-center gap-1'>
              <Check className='h-4 w-4 text-green-700'/>
              <span className='text-gray-700'> Email Support </span>
            </li>
             <li className='flex items-center gap-1'>
              <Check className='h-4 w-4 text-gray-300'/>
              <span className='text-gray-400'> Help Center Access </span>
            </li>
          </ul>

          <Button variant="outline" className='w-full mt-8'> Current Plan </Button>
        </div>

        {/* Pro Plan */}
        <div className='rounded-2xl border border-primary p-6 shadow-sm sm:px-8 lg:p-12 bg-white relative'>
            <div className='absolute top-0 right-0 bg-primary text-white text-xs px-3 py-1 rounded-bl-xl rounded-tr-xl'>Popular</div>
          <div className='text-center'>
            <h2 className='text-lg font-medium text-gray-900'>
              Pro
              <span className='sr-only'>Plan</span>
            </h2>

            <p className='mt-2 sm:mt-4'>
              <strong className='text-3xl font-bold text-gray-900 sm:text-4xl'> 9.99$ </strong>
              <span className='text-sm font-medium text-gray-700'>/month</span>
            </p>
          </div>

          <ul className='mt-6 space-y-2'>
            <li className='flex items-center gap-1'>
              <Check className='h-4 w-4 text-green-700'/>
              <span className='text-gray-700'> Unlimited Course Generation </span>
            </li>
            <li className='flex items-center gap-1'>
              <Check className='h-4 w-4 text-green-700'/>
              <span className='text-gray-700'> Priority Support </span>
            </li>
            <li className='flex items-center gap-1'>
              <Check className='h-4 w-4 text-green-700'/>
              <span className='text-gray-700'> Email & Chat Support </span>
            </li>
            <li className='flex items-center gap-1'>
              <Check className='h-4 w-4 text-green-700'/>
              <span className='text-gray-700'> Help Center Access </span>
            </li>
          </ul>

          <Button className='w-full mt-8'> Get Started </Button>
        </div>

      </div>
    </div>
  )
}

export default Upgrade