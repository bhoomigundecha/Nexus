import { NextResponse } from 'next/server';
import connectDB from '@/config/db';
import { CourseList } from '@/config/schema';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const createdBy = searchParams.get('createdBy');

    if (!createdBy) {
      return NextResponse.json(
        { error: 'createdBy parameter is required' },
        { status: 400 }
      );
    }

    // Connect to MongoDB
    await connectDB();

    // Fetch courses for the user
    const courses = await CourseList.find({ createdBy })
      .sort({ createdAt: -1 })
      .lean(); // .lean() converts to plain JavaScript objects

    return NextResponse.json({
      success: true,
      courses
    });

  } catch (error) {
    console.error('Error fetching courses:', error);
    return NextResponse.json(
      { error: 'Failed to fetch courses' },
      { status: 500 }
    );
  }
}