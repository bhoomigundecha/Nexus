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
 * Generate a unique course banner image using Gemini AI
 */
async function generateCourseBanner(topic, category, courseId) {
  try {
    const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // Create a prompt for generating a course banner
    const prompt = `Create a professional, modern course banner image for an online learning platform. 
    Course topic: ${topic}
    Category: ${category}
    
    The banner should be:
    - Clean and professional design
    - 800x400 pixels aspect ratio
    - Include relevant icons or imagery related to ${topic} and ${category}
    - Use a gradient background with vibrant colors (purple, blue, or related to the topic)
    - Modern, minimalist style
    - No text or words in the image`;

    const result = await model.generateContent([prompt]);
    const response = result.response;

    // Note: Gemini's text model doesn't generate images directly
    // For now, we'll use a category-based approach with pre-generated images
    // In production, you'd use an image generation API like DALL-E or Stable Diffusion

    // For now, return a category-based placeholder
    const categoryImages = {
      'Programming': '/coding.png',
      'Creative': '/creative.png',
      'Health': '/lotus.png',
      'Yoga': '/lotus.png',
      'Fitness': '/lotus.png',
      'Business': '/coding.png',
      'Design': '/creative.png',
      'Marketing': '/coding.png',
    };

    return categoryImages[category] || '/placeholder.png';

  } catch (error) {
    console.error("Error generating course banner:", error);
    return '/placeholder.png';
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