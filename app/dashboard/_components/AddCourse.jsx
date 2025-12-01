
"use client"

import React from 'react'
import { useUser } from '@clerk/nextjs';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
const AddCourse = () => {
    const {user} = useUser();
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 md:p-8">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
            <h2 className='text-3xl md:text-4xl font-bold text-gray-900 flex items-center gap-3'>
              Hello, <span className='text-blue-700'>{user?.fullName || 'there'}</span>
              <span className="inline-block animate-wave text-4xl">👋</span>
            </h2>
            <p className="text-sm md:text-base text-gray-600 mt-2"> 
              Create new courses with AI, share with friends, and grow your learning community
            </p>
        </div>
        <div className='flex gap-3'>
          <Link href={"/dashboard/jobs"}>
            <Button variant="outline" className='border-blue-700 text-blue-700 hover:bg-blue-50 px-6 py-3 text-base font-medium shadow-md hover:shadow-lg transition-all'>
              🔍 Find Jobs
            </Button>
          </Link>
          <Link href={"/create-course"}>
            <Button className='bg-blue-700 hover:bg-blue-800 text-white px-6 py-3 text-base font-medium shadow-lg hover:shadow-xl transition-all'>
              + Create AI Course
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default AddCourse