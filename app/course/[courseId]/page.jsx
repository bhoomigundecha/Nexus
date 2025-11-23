"use client"
import Header from '@/app/_components/Header'
import ChapterList from '@/app/create-course/[courseId]/_components/ChapterList'
import CourseBasicInfo from '@/app/create-course/[courseId]/_components/CourseBasicInfo'
import CourseDetails from '@/app/create-course/[courseId]/_components/CourseDetails'
import React, { useEffect, useState, use } from 'react'

const Course = ({params}) => {
    const { courseId } = use(params);
    const [course, setCourse] = useState();
    
    useEffect(() => {
        courseId && GetCourse();
    }, [courseId])

    const GetCourse = async () => {
        try {
            const response = await fetch(`/api/course/${courseId}`);
            if (response.ok) {
                const result = await response.json();
                setCourse(result);
                console.log(result);
            }
        } catch (error) {
            console.error('Error fetching course:', error);
        }
    }

    return (
        <div>
            <Header/>
            <div className='px-10 p-10 md:px-20 lg:px-44'>
                <CourseBasicInfo course={course} edit={false} />
                <CourseDetails course={course} />
                <ChapterList course={course} edit={false}/>
            </div>
        </div>
    )
}

export default Course