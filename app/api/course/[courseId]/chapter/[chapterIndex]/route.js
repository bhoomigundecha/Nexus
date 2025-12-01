import { NextResponse } from 'next/server';
import { generateChapterContent } from '@/config/AiModel';
import connectDB from '@/config/db';
import { CourseList } from '@/config/schema';
import GlobalApi from '@/config/service';

export async function GET(request, { params }) {
    try {
        await connectDB();

        const { courseId, chapterIndex } = await params;
        const course = await CourseList.findOne({ courseId });

        if (!course) {
            return NextResponse.json(
                { error: 'Course not found' },
                { status: 404 }
            );
        }

        const chapters = course?.courseOutput?.course?.chapters || [];
        const chapter = chapters[parseInt(chapterIndex)];

        if (!chapter) {
            return NextResponse.json(
                { error: 'Chapter not found' },
                { status: 404 }
            );
        }

        // Get the course topic from the course name or description
        // Try to extract topic from course name or use category
        const courseName = course?.name || course?.courseOutput?.course?.name || '';
        const courseCategory = course?.category || '';
        const topic = course?.courseOutput?.course?.topic || courseName.split(':')[0] || courseCategory || 'General';
        const chapterName = chapter.name;

        // Generate chapter content using AI
        const contentResult = await generateChapterContent(topic, chapterName);

        if (!contentResult.success) {
            console.error('Chapter content generation failed:', contentResult.error);
            // Return a fallback structure so the UI can still show something
            return NextResponse.json({
                content: [],
                error: contentResult.error || 'Failed to generate chapter content',
                fallback: true
            }, { status: 200 }); // Return 200 so UI can handle gracefully
        }

        // Format the content for the frontend
        // Handle different response formats from AI
        let contentArray = [];
        if (contentResult.data?.sections) {
            contentArray = contentResult.data.sections;
        } else if (contentResult.data?.content) {
            contentArray = contentResult.data.content;
        } else if (Array.isArray(contentResult.data)) {
            contentArray = contentResult.data;
        }

        // Fetch YouTube video if includeVideo is enabled
        let videoId = null;
        if (course?.includeVideo === 'Yes') {
            try {
                const searchQuery = `${topic} ${chapterName} tutorial`;
                const videos = await GlobalApi.getVideos(searchQuery);
                if (videos && videos.length > 0) {
                    videoId = videos[0].id.videoId;
                    console.log('Found YouTube video:', videoId, 'for query:', searchQuery);
                }
            } catch (videoError) {
                console.error('Error fetching YouTube video:', videoError);
                // Continue without video if fetch fails
            }
        }

        const formattedContent = {
            content: contentArray,
            videoId: videoId
        };

        return NextResponse.json(formattedContent);
    } catch (error) {
        console.error('Error generating chapter content:', error);
        return NextResponse.json(
            { error: 'Failed to generate chapter content' },
            { status: 500 }
        );
    }
}

