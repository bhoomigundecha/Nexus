import Image from 'next/image';
import React from 'react';

const CourseBasicInfo = ({ course, edit = true }) => {
  if (!course) return null;

  return (
    <div className='p-10 border rounded-xl shadow-sm mt-5'>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
        <div>
          <h2 className='font-bold text-3xl'>
            {course?.name || course?.courseOutput?.course?.name}
          </h2>
          <p className='text-sm text-gray-500 mt-3'>
            {course?.courseOutput?.course?.description}
          </p>
          
          <div className='flex gap-2 mt-2 items-center'>
            <Image src='/knowledge.png' alt='knowledge' width={50} height={50} />
            <div>
              <h2 className='text-xs text-gray-500'>Skill Level</h2>
              <h2 className='font-medium text-lg'>{course?.level}</h2>
            </div>
          </div>

          <div className='flex gap-2 mt-2 items-center'>
            <Image src='/time.png' alt='time' width={50} height={50} />
            <div>
              <h2 className='text-xs text-gray-500'>Duration</h2>
              <h2 className='font-medium text-lg'>
                {course?.courseOutput?.course?.duration}
              </h2>
            </div>
          </div>

          <div className='flex gap-2 mt-2 items-center'>
            <Image src='/chapter.png' alt='chapters' width={50} height={50} />
            <div>
              <h2 className='text-xs text-gray-500'>No Of Chapters</h2>
              <h2 className='font-medium text-lg'>
                {course?.courseOutput?.course?.chapters?.length || 0}
              </h2>
            </div>
          </div>

          <div className='flex gap-2 mt-2 items-center'>
            <Image src='/video.png' alt='video' width={50} height={50} />
            <div>
              <h2 className='text-xs text-gray-500'>Video Included?</h2>
              <h2 className='font-medium text-lg'>{course?.includeVideo}</h2>
            </div>
          </div>
        </div>

        <div className='relative overflow-hidden rounded-xl shadow-lg bg-gradient-to-br from-blue-700 via-blue-600 to-blue-500'>
          {course?.courseBanner ? (
            course.courseBanner.startsWith('data:image') ? (
              <img
                src={course.courseBanner}
                alt='course banner'
                className='w-full h-[300px] object-cover'
                onError={(e) => {
                  // Fallback to gradient if image fails to load
                  e.target.style.display = 'none';
                  e.target.parentElement.className = 'relative overflow-hidden rounded-xl shadow-lg bg-gradient-to-br from-blue-700 via-blue-600 to-blue-500 flex items-center justify-center';
                  e.target.parentElement.innerHTML = '<span class="text-white text-2xl font-bold opacity-80">Course Banner</span>';
                }}
              />
            ) : (
              <Image
                src={course.courseBanner}
                width={400}
                height={300}
                alt='course banner'
                className='w-full h-[300px] object-cover'
              />
            )
          ) : (
            <div className='w-full h-[300px] flex items-center justify-center'>
              <span className='text-white text-2xl font-bold opacity-80'>Course Banner</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseBasicInfo;
