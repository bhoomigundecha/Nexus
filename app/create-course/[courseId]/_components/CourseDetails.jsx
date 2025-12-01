import React from 'react';
import { HiOutlineChartBar } from 'react-icons/hi2';

const CourseDetails = ({ course }) => {
  if (!course) return null;

  return (
    <div className='mt-10 p-5 rounded-xl border shadow-sm'>
      <div className='grid grid-cols-2 md:grid-cols-4 gap-5'>
        <div className='flex gap-2'>
          <HiOutlineChartBar className='text-4xl text-blue-700' />
          <div>
            <h2 className='text-xs text-gray-500'>Skill Level</h2>
            <h2 className='font-medium text-lg'>{course?.level}</h2>
          </div>
        </div>

        <div className='flex gap-2'>
          <HiOutlineChartBar className='text-4xl text-blue-700' />
          <div>
            <h2 className='text-xs text-gray-500'>Duration</h2>
            <h2 className='font-medium text-lg'>
              {course?.courseOutput?.course?.duration}
            </h2>
          </div>
        </div>

        <div className='flex gap-2'>
          <HiOutlineChartBar className='text-4xl text-blue-700' />
          <div>
            <h2 className='text-xs text-gray-500'>Chapters</h2>
            <h2 className='font-medium text-lg'>
              {course?.courseOutput?.course?.chapters?.length || 0}
            </h2>
          </div>
        </div>

        <div className='flex gap-2'>
          <HiOutlineChartBar className='text-4xl text-blue-700' />
          <div>
            <h2 className='text-xs text-gray-500'>Video</h2>
            <h2 className='font-medium text-lg'>{course?.includeVideo}</h2>
          </div>
        </div>
      </div>

      <div className='mt-5'>
        <h2 className='font-medium text-lg'>Description</h2>
        <p className='text-sm text-gray-500 mt-2'>
          {course?.courseOutput?.course?.description}
        </p>
      </div>
    </div>
  );
};

export default CourseDetails;
