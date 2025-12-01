"use client";
import React from 'react';
import { HiOutlineClock } from 'react-icons/hi2';
import { useRouter } from 'next/navigation';

const ChapterList = ({ course, edit = true }) => {
  const router = useRouter();
  
  if (!course) return null;

  const chapters = course?.courseOutput?.course?.chapters || [];

  const handleChapterClick = (index) => {
    if (!edit && course?.courseId) {
      // Navigate to the chapter content page
      router.push(`/course/${course.courseId}/start?chapterIndex=${index}`);
    }
  };

  return (
    <div className='mt-5'>
      <h2 className='font-medium text-xl'>Chapters</h2>
      <div className='mt-3'>
        {chapters.map((chapter, index) => (
          <div
            key={index}
            className={`border p-5 rounded-lg mb-2 flex items-center justify-between ${
              !edit ? 'hover:bg-blue-50 cursor-pointer' : ''
            }`}
            onClick={() => handleChapterClick(index)}
          >
            <div className='flex gap-5 items-center'>
              <h2 className='bg-blue-700 flex-none h-10 w-10 text-white rounded-full text-center p-2'>
                {index + 1}
              </h2>
              <div>
                <h2 className='font-medium text-lg'>
                  {chapter?.name}
                  {edit && (
                    <span className='bg-blue-700 text-white px-2 py-1 text-xs rounded-md ml-2'>
                      Edit
                    </span>
                  )}
                </h2>
                <p className='text-sm text-gray-500 line-clamp-2'>
                  {chapter?.about}
                </p>
                <p className='flex gap-2 text-blue-700 items-center mt-1'>
                  <HiOutlineClock /> {chapter?.duration}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChapterList;
