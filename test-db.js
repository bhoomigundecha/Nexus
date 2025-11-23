import connectDB from './config/db.js';
import { CourseList } from './config/schema.js';

async function checkCourses() {
    try {
        await connectDB();
        const courses = await CourseList.find({}).limit(5);
        console.log('Found courses:', courses.length);
        courses.forEach(course => {
            console.log('Course ID:', course.courseId);
            console.log('Course Name:', course.name);
            console.log('---');
        });
    } catch (error) {
        console.error('Error:', error);
    }
    process.exit(0);
}

checkCourses();
