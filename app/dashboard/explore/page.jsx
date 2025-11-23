"use client";
import React from 'react'
import { HiMagnifyingGlass } from 'react-icons/hi2';

const Explore = () => {
  // Dummy data for public courses
  const publicCourses = [
    {
      id: 1,
      name: "Introduction to Python",
      description: "Learn the basics of Python programming language.",
      category: "Programming",
      image: "/python.png", // Assuming you might have images or placeholders
      chapters: 5,
    },
    {
      id: 2,
      name: "Web Development Bootcamp",
      description: "Complete guide to full stack web development.",
      category: "Web Dev",
      image: "/webdev.png",
      chapters: 12,
    },
    {
      id: 3,
      name: "Data Science Fundamentals",
      description: "Start your journey into Data Science.",
      category: "Data Science",
      image: "/datascience.png",
      chapters: 8,
    },
    {
        id: 4,
        name: "Machine Learning A-Z",
        description: "Master Machine Learning on Python & R.",
        category: "AI/ML",
        image: "/ml.png",
        chapters: 10,
    },
    {
        id: 5,
        name: "React.js for Beginners",
        description: "Build modern web apps with React.",
        category: "Web Dev",
        image: "/react.png",
        chapters: 6,
    }
  ];

  return (
    <div>
      <h2 className='font-bold text-3xl'>Explore Public Courses</h2>
      <p className='text-gray-500'>Discover community created courses and start learning.</p>

      <div className='flex items-center gap-2 mt-5 p-2 border rounded-lg bg-white w-full md:w-[400px]'>
         <HiMagnifyingGlass className='text-gray-500 text-xl'/>
         <input type="text" placeholder='Search course...' className='outline-none w-full' />
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-10'>
        {publicCourses.map((course, index) => (
            <div key={index} className='p-5 border rounded-lg shadow-sm hover:shadow-md hover:border-primary cursor-pointer bg-white transition-all'>
                {/* Placeholder for course image if you had one */}
                <div className='h-[150px] w-full bg-gradient-to-r from-purple-200 to-blue-200 rounded-lg mb-4 animate-pulse'></div>
                
                <h3 className='font-bold text-lg truncate'>{course.name}</h3>
                <p className='text-sm text-gray-500 line-clamp-2 mt-1'>{course.description}</p>
                
                <div className='flex justify-between items-center mt-3'>
                    <span className='text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full'>{course.category}</span>
                    <span className='text-xs text-gray-400'>{course.chapters} Chapters</span>
                </div>
            </div>
        ))}
      </div>
    </div>
  )
}

export default Explore