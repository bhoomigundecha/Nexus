"use server";

import { generateCourseLayout } from "@/config/AiModel";
import connectDB from "@/config/db";
import { CourseList } from "@/config/schema";
import { GoogleGenerativeAI } from "@google/generative-ai";
import fs from "fs";
import path from "path";

/**
 * Server action to generate course layout using AI
 * This keeps the API key secure on the server side
 */
export async function generateCourseLayoutAction(userCourseInput) {
  try {
    // Validate input
    if (!userCourseInput || !userCourseInput.category || !userCourseInput.topic) {
      return {
        success: false,
        error: "Missing required course input fields"
      };
    }

    // Generate course layout using AI (runs on server with access to env vars)
    const result = await generateCourseLayout(userCourseInput);

    return result;
  } catch (error) {
    console.error("Error in generateCourseLayoutAction:", error);
    return {
      success: false,
      error: error.message || "Failed to generate course layout"
    };
  }
}

/**
 * Generate a course banner using beautiful gradient SVGs
 * Creates unique, category-specific banners with blue theme
 */
async function generateCourseBanner(topic, category, courseId) {
  try {
    const gradientMap = {
      'Programming': { from: '#1e40af', to: '#3b82f6', via: '#2563eb' },
      'Creative': { from: '#1e3a8a', to: '#60a5fa', via: '#3b82f6' },
      'Health': { from: '#1e40af', to: '#93c5fd', via: '#60a5fa' },
      'Yoga': { from: '#1e3a8a', to: '#a5b4fc', via: '#6366f1' },
      'Fitness': { from: '#1e40af', to: '#60a5fa', via: '#3b82f6' },
      'Business': { from: '#1e3a8a', to: '#3b82f6', via: '#2563eb' },
      'Design': { from: '#1e40af', to: '#60a5fa', via: '#3b82f6' },
      'Marketing': { from: '#1e3a8a', to: '#3b82f6', via: '#2563eb' },
      'Data Science': { from: '#1e40af', to: '#93c5fd', via: '#60a5fa' },
      'Web Development': { from: '#1e3a8a', to: '#60a5fa', via: '#3b82f6' },
      'Mobile Development': { from: '#1e40af', to: '#60a5fa', via: '#3b82f6' },
      'Machine Learning': { from: '#1e3a8a', to: '#93c5fd', via: '#60a5fa' },
    };

    const colors = gradientMap[category] || { from: '#1d4ed8', to: '#3b82f6', via: '#2563eb' };

    const svg = `
      <svg width="800" height="400" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:${colors.from};stop-opacity:1" />
            <stop offset="50%" style="stop-color:${colors.via};stop-opacity:1" />
            <stop offset="100%" style="stop-color:${colors.to};stop-opacity:1" />
          </linearGradient>
          <radialGradient id="radial" cx="50%" cy="50%" r="50%">
            <stop offset="0%" style="stop-color:${colors.to};stop-opacity:0.3" />
            <stop offset="100%" style="stop-color:${colors.from};stop-opacity:0.1" />
          </radialGradient>
        </defs>
        <rect width="800" height="400" fill="url(#grad)"/>
        <circle cx="700" cy="100" r="150" fill="url(#radial)"/>
        <circle cx="100" cy="300" r="100" fill="url(#radial)"/>
      </svg>
    `.trim();

    return `data:image/svg+xml;base64,${Buffer.from(svg).toString('base64')}`;
  } catch (error) {
    console.error("Error generating course banner:", error);

    // Fallback
    const fallbackSvg = `
      <svg width="800" height="400" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:#1d4ed8;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#3b82f6;stop-opacity:1" />
          </linearGradient>
        </defs>
        <rect width="800" height="400" fill="url(#grad)"/>
      </svg>
    `.trim();

    return `data:image/svg+xml;base64,${Buffer.from(fallbackSvg).toString('base64')}`;
  }
}

/**
 * Server action to save course layout to database
 */
export async function saveCourseLayoutInDb(courseData) {
  try {
    // Validate courseData
    if (!courseData || !courseData.courseId) {
      return {
        success: false,
        error: "Invalid course data"
      };
    }

    console.log("Saving course to database:", courseData);

    // Connect to MongoDB
    await connectDB();

    // Generate unique course banner
    const courseBanner = await generateCourseBanner(
      courseData.name,
      courseData.category,
      courseData.courseId
    );

    // Prepare the course document
    const courseDocument = {
      courseId: courseData.courseId,
      name: courseData.name,
      category: courseData.category,
      level: courseData.level,
      includeVideo: 'Yes',
      courseOutput: courseData.courseOutput,
      createdBy: courseData.createdBy,
      userName: courseData.userName,
      userProfileImage: courseData.userProfileImage,
      courseBanner: courseBanner,
      publish: false
    };

    console.log("Prepared course document:", courseDocument);

    // Save to MongoDB using Mongoose
    const newCourse = new CourseList(courseDocument);
    await newCourse.save();

    console.log("Course saved successfully!");

    // Return only serializable data
    return {
      success: true,
      courseId: courseData.courseId
    };

  } catch (error) {
    console.error("Error saving course to database:", error);
    return {
      success: false,
      error: error.message || "Failed to save course to database"
    };
  }
}