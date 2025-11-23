"use client";

import { useUser } from '@clerk/nextjs';
import { useEffect, useState } from 'react';
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
      <h2 className="text-2xl font-bold">My Courses</h2>
      
      {courses.length === 0 ? (
        <div className="text-center mt-10 text-gray-500">
          <p>No courses found. Create your first course!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-5">
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