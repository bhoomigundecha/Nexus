"use client"
import React, { useEffect, useState, use } from 'react'
import ChapterListCard from './_components/ChapterListCard'
import ChapterContent from './_components/ChapterContent'
import { useSearchParams } from 'next/navigation'

function CourseStart({params}) {
    const { courseId } = use(params);
    const searchParams = useSearchParams();
    const chapterIndex = searchParams.get('chapterIndex');
    
    const [course,setCourse]=useState();
    const [selectedChapter,setSelectedChapter]=useState(null);
    const [chapterContent,setChapterContent]=useState();
    
    useEffect(()=>{
        GetCourse();
    },[])

    // Set selected chapter when course loads or chapterIndex changes
    useEffect(()=>{
        if (course?.courseOutput?.course?.chapters) {
            const index = chapterIndex ? parseInt(chapterIndex) : 0;
            const chapter = course.courseOutput.course.chapters[index];
            if (chapter) {
                setSelectedChapter(chapter);
                GetSelectedChapterContent(index);
            }
        }
    },[course, chapterIndex])

    /**
     * Used to get Course Info by Course Id
     */
    const GetCourse=async()=>{
        try {
            const response = await fetch(`/api/course/${courseId}`);
            if (response.ok) {
                const result = await response.json();
                setCourse(result);
            }
        } catch (error) {
            console.error('Error fetching course:', error);
        }
    }

    const GetSelectedChapterContent=async(chapterIndex)=>{
        if (!course?.courseId || chapterIndex === undefined) return;
        
        try {
            setChapterContent(null); // Clear previous content while loading
            const response = await fetch(`/api/course/${courseId}/chapter/${chapterIndex}`);
            
            if (response.ok) {
                const result = await response.json();
                // Handle both success and fallback cases
                if (result.fallback) {
                    console.warn('Chapter content generation had issues:', result.error);
                    setChapterContent({ content: [] });
                } else {
                    setChapterContent(result);
                }
            } else {
                const errorData = await response.json().catch(() => ({}));
                console.error('Failed to fetch chapter content:', errorData.error || response.statusText);
                // Set empty content so fallback message shows
                setChapterContent({ content: [] });
            }
        } catch (error) {
            console.error('Error fetching chapter content:', error);
            setChapterContent({ content: [] });
        }
    }

  return (
    <div>
        {/* Chapter list Side Bar  */}
        <div className=' fixed md:w-72 hidden md:block h-screen border-r shadow-sm'>
            <h2 className='font-medium text-lg bg-blue-700 p-4
            text-white'>{course?.courseOutput?.course?.name}</h2>

            <div>
                {course?.courseOutput?.course?.chapters.map((chapter,index)=>(
                    <div key={index} 
                    className={`cursor-pointer
                    hover:bg-blue-50
                    ${selectedChapter?.name==chapter?.name&&'bg-blue-100'}
                    `}
                    onClick={()=>{setSelectedChapter(chapter);
                    GetSelectedChapterContent(index)
                    }}
                    >
                        <ChapterListCard chapter={chapter} index={index} />
                    </div>
                ))}
            </div>
        </div>
        {/* Content Div  */}
        <div className='md:ml-72'>
            <ChapterContent chapter={selectedChapter}
                content={chapterContent}
            />
        </div>
    </div>
  )
}

export default CourseStart