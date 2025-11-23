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
    <div className='shadow-sm rounded-lg border p-2 cursor-pointer hover:border-primary transition-all'>
      <Link href={'/course/' + course.courseId}>
        <Image 
          src={course.courseBanner || '/placeholder.png'} 
          width={300} 
          height={200}
          alt={course.name}
          className='w-full h-[200px] object-cover rounded-lg'
        />
      </Link>
      
      <div className='p-2'>
        <div className='flex justify-between items-center'>
          <h2 className='font-medium text-lg line-clamp-1'>{course.name}</h2>
          
          <DropdownOption 
            handleDelete={handleDelete}
            courseId={course.courseId}
          >
            <HiMiniEllipsisVertical 
              className={`cursor-pointer ${deleting ? 'opacity-50' : ''}`}
            />
          </DropdownOption>
        </div>
        
        <p className='text-sm text-gray-400 mt-1'>{course.category}</p>
        
        <div className='flex items-center justify-between mt-2'>
          <h2 className='flex gap-2 items-center p-1 bg-purple-50 text-primary text-sm rounded-sm'>
            <Image src={'/chapter.png'} alt='chapter' width={20} height={20} />
            {course.courseOutput?.course?.noOfChapters || 0} Chapters
          </h2>
          
          <h2 className='flex gap-2 items-center p-1 bg-purple-50 text-primary text-sm rounded-sm'>
            <Image src={'/time.png'} alt='time' width={20} height={20} />
            {course.courseOutput?.course?.duration || 'N/A'}
          </h2>
        </div>
        
        <div className='flex items-center gap-2 mt-2'>
          <Image 
            src={course.userProfileImage || '/default-avatar.png'} 
            alt='user'
            width={35}
            height={35}
            className='rounded-full'
          />
          <h2 className='text-sm'>{course.userName || 'Anonymous'}</h2>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;