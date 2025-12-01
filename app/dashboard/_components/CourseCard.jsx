"use client";

import Image from 'next/image';
import React, { useState } from 'react';
import { HiMiniEllipsisVertical } from "react-icons/hi2";
import DropdownOption from './DropdownOption';
import Link from 'next/link';
import { deleteCourse } from '../_actions/courseActions';

const CourseCard = ({ course, refreshData, onDeleted }) => {
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    const confirmed = window.confirm('Are you sure you want to delete this course?');
    
    if (!confirmed) return;

    setDeleting(true);
    
    try {
      const result = await deleteCourse(course.courseId);
      
      if (result.success) {
        // Notify parent component
        if (onDeleted) {
          onDeleted(course.courseId);
        }
        // Optionally refresh the entire list
        if (refreshData) {
          refreshData();
        }
      } else {
        alert('Failed to delete course: ' + result.error);
      }
    } catch (error) {
      console.error('Error deleting course:', error);
      alert('Failed to delete course');
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className='shadow-md rounded-xl border border-gray-200 overflow-hidden cursor-pointer hover:border-blue-700 hover:shadow-xl transition-all duration-300 bg-white group'>
      <Link href={'/course/' + course.courseId}>
        <div className='relative overflow-hidden'>
          <Image 
            src={course.courseBanner || '/placeholder.png'} 
            width={400} 
            height={240}
            alt={course.name}
            className='w-full h-[240px] object-cover group-hover:scale-105 transition-transform duration-300'
          />
          <div className='absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
        </div>
      </Link>
      
      <div className='p-4'>
        <div className='flex justify-between items-start mb-2'>
          <h2 className='font-semibold text-lg line-clamp-2 text-gray-900 flex-1 pr-2'>{course.name}</h2>
          
          <DropdownOption 
            handleDelete={handleDelete}
            courseId={course.courseId}
          >
            <HiMiniEllipsisVertical 
              className={`cursor-pointer text-gray-400 hover:text-gray-600 transition-colors ${deleting ? 'opacity-50' : ''}`}
            />
          </DropdownOption>
        </div>
        
        <p className='text-sm text-gray-500 mb-3 font-medium'>{course.category}</p>
        
        <div className='flex items-center justify-between gap-2 mb-3'>
          <div className='flex gap-2 items-center px-3 py-1.5 bg-blue-50 text-blue-700 text-sm rounded-lg font-medium'>
            <Image src={'/chapter.png'} alt='chapter' width={18} height={18} />
            <span>{course.courseOutput?.course?.noOfChapters || 0} Chapters</span>
          </div>
          
          <div className='flex gap-2 items-center px-3 py-1.5 bg-blue-50 text-blue-700 text-sm rounded-lg font-medium'>
            <Image src={'/time.png'} alt='time' width={18} height={18} />
            <span>{course.courseOutput?.course?.duration || 'N/A'}</span>
          </div>
        </div>
        
        <div className='flex items-center gap-2 pt-3 border-t border-gray-100'>
          <Image 
            src={course.userProfileImage || '/default-avatar.png'} 
            alt='user'
            width={32}
            height={32}
            className='rounded-full border-2 border-gray-200'
          />
          <h2 className='text-sm text-gray-600 font-medium'>{course.userName || 'Anonymous'}</h2>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;