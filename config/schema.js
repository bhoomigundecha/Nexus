
// ⚠️ SERVER-SIDE ONLY - Do not import this file in client components
// Use server actions from app/dashboard/_actions/courseActions.js instead

import mongoose from 'mongoose';

// Course Schema
const courseSchema = new mongoose.Schema({
  courseId: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  name: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  level: {
    type: String,
    required: true
  },
  includeVideo: {
    type: String,
    default: 'Yes'
  },
  courseOutput: {
    type: mongoose.Schema.Types.Mixed,
    required: true
  },
  createdBy: {
    type: String,
    required: true
  },
  userName: String,
  userProfileImage: String,
  courseBanner: {
    type: String,
    default: '/placeholder.png'
  },
  publish: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

// Chapter Schema
const chapterSchema = new mongoose.Schema({
  courseId: {
    type: String,
    required: true,
    index: true
  },
  chapterId: {
    type: Number,
    required: true
  },
  content: {
    type: mongoose.Schema.Types.Mixed,
    required: true
  },
  videoId: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

// Create models (only if they don't exist to prevent recompilation errors)
export const CourseList = mongoose.models.CourseList || mongoose.model('CourseList', courseSchema);
export const Chapters = mongoose.models.Chapters || mongoose.model('Chapters', chapterSchema);