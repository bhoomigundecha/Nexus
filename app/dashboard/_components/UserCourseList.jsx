"use client";

import { useUser } from '@clerk/nextjs';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getUserCourses } from '../_actions/courseActions';
import CourseCard from './CourseCard';

const UserCourseList = () => {
  const { user } = useUser();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchCourses();
    }
  }, [user]);

  const fetchCourses = async () => {
    setLoading(true);
    try {
      const result = await getUserCourses(user.primaryEmailAddress.emailAddress);
      
      if (result.success) {
        setCourses(result.courses);
      } else {
        console.error('Failed to fetch courses:', result.error);
      }
    } catch (error) {
      console.error('Error fetching courses:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCourseDeleted = (courseId) => {
    // Remove the deleted course from the list
    setCourses(courses.filter(course => course.courseId !== courseId));
  };

  if (loading) {
    return (
      <div className="mt-10">
        <h2 className="text-2xl font-bold">My Courses</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-5">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="w-full h-[270px] bg-slate-200 animate-pulse rounded-lg"
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="mt-10">
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-gray-900">My Courses</h2>
        <p className="text-gray-500 mt-1">Manage and track your learning journey</p>
      </div>
      
      {courses.length === 0 ? (
        <div className="text-center mt-16 py-12 bg-white rounded-xl border-2 border-dashed border-gray-300">
          <div className="max-w-md mx-auto">
            <div className="text-6xl mb-4">📚</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No courses yet</h3>
            <p className="text-gray-500 mb-6">Start your learning journey by creating your first AI-powered course!</p>
            <Link href="/create-course" className="inline-block">
              <button className="bg-blue-700 hover:bg-blue-800 text-white px-6 py-3 rounded-lg font-medium transition-colors">
                Create Your First Course
              </button>
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-5">
          {courses.map((course) => (
            <CourseCard 
              key={course._id} 
              course={course}
              onDeleted={handleCourseDeleted}
              refreshData={fetchCourses}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default UserCourseList;