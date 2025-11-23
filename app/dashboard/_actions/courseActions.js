"use server";

import connectDB from '@/config/db';
import { CourseList } from '@/config/schema';

/**
 * Fetch user courses - Server Action
 */
export async function getUserCourses(userEmail) {
  try {
    if (!userEmail) {
      return {
        success: false,
        error: 'User email is required'
      };
    }

    // Connect to MongoDB
    await connectDB();

    // Fetch courses
    const courses = await CourseList.find({ createdBy: userEmail })
      .sort({ createdAt: -1 })
      .lean();

    // Convert MongoDB _id to string for serialization
    const serializedCourses = courses.map(course => ({
      ...course,
      _id: course._id.toString(),
      createdAt: course.createdAt?.toISOString(),
      updatedAt: course.updatedAt?.toISOString()
    }));

    return {
      success: true,
      courses: serializedCourses
    };

  } catch (error) {
    console.error('Error fetching courses:', error);
    return {
      success: false,
      error: error.message || 'Failed to fetch courses'
    };
  }
}

/**
 * Delete a course - Server Action
 */
export async function deleteCourse(courseId) {
  try {
    if (!courseId) {
      return {
        success: false,
        error: 'Course ID is required'
      };
    }

    await connectDB();

    const result = await CourseList.deleteOne({ courseId });

    if (result.deletedCount === 0) {
      return {
        success: false,
        error: 'Course not found'
      };
    }

    return {
      success: true,
      message: 'Course deleted successfully'
    };

  } catch (error) {
    console.error('Error deleting course:', error);
    return {
      success: false,
      error: error.message || 'Failed to delete course'
    };
  }
}

/**
 * Update course - Server Action
 */
export async function updateCourse(courseId, updateData) {
  try {
    if (!courseId) {
      return {
        success: false,
        error: 'Course ID is required'
      };
    }

    await connectDB();

    const result = await CourseList.findOneAndUpdate(
      { courseId },
      updateData,
      { new: true }
    ).lean();

    if (!result) {
      return {
        success: false,
        error: 'Course not found'
      };
    }

    return {
      success: true,
      course: {
        ...result,
        _id: result._id.toString(),
        createdAt: result.createdAt?.toISOString(),
        updatedAt: result.updatedAt?.toISOString()
      }
    };

  } catch (error) {
    console.error('Error updating course:', error);
    return {
      success: false,
      error: error.message || 'Failed to update course'
    };
  }
}