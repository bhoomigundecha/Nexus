import { NextResponse } from 'next/server';
import connectDB from '@/config/db';
import { CourseList } from '@/config/schema';

export async function GET(request, { params }) {
    try {
        await connectDB();

        const { courseId } = await params;
        const course = await CourseList.findOne({ courseId });

        if (!course) {
            return NextResponse.json(
                { error: 'Course not found' },
                { status: 404 }
            );
        }

        return NextResponse.json(course);
    } catch (error) {
        console.error('Error fetching course:', error);
        return NextResponse.json(
            { error: 'Failed to fetch course' },
            { status: 500 }
        );
    }
}
