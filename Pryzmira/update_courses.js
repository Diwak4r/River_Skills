import fs from 'fs';
import path from 'path';

const coursesPath = path.join(process.cwd(), 'src/data/courses.json');
const courses = JSON.parse(fs.readFileSync(coursesPath, 'utf-8'));

const categories = ['Web Dev', 'AI', 'DSA', 'System Design', 'Finance', 'Coding'];
const tags = ['Popular', 'Trending', 'New', 'Best Seller'];

const enrichCourse = (course) => {
    // Generate random stats
    const rating = (4.0 + Math.random()).toFixed(1);
    const reviewCount = Math.floor(Math.random() * 4000) + 100;
    const students = Math.floor(Math.random() * 40000) + 1000;
    const completionRate = Math.floor(Math.random() * 20) + 75; // 75-95%

    // Assign random tags (20% chance of having a tag)
    const courseTags = [];
    if (Math.random() > 0.7) {
        courseTags.push(tags[Math.floor(Math.random() * tags.length)]);
    }

    // Mock Prerequisites & Next Steps based on category
    let prerequisites = [];
    let nextCourses = [];

    if (course.difficulty === 'Intermediate') {
        prerequisites = ['Basic Programming', 'Intro to ' + course.category];
        nextCourses = ['Advanced ' + course.category + ' Projects'];
    } else if (course.difficulty === 'Advanced') {
        prerequisites = ['Intermediate ' + course.category, 'Data Structures'];
        nextCourses = ['Mastery Certification'];
    } else {
        nextCourses = ['Intermediate ' + course.category];
    }

    return {
        ...course,
        rating: parseFloat(rating),
        reviewCount,
        students,
        completionRate,
        tags: courseTags,
        prerequisites,
        nextCourses,
        benefits: [
            "Master core concepts through hands-on projects",
            "Build a professional portfolio ready for interviews",
            "Join a community of " + students.toLocaleString() + "+ learners"
        ]
    };
};

const enrichedCourses = courses.map(enrichCourse);

fs.writeFileSync(coursesPath, JSON.stringify(enrichedCourses, null, 4));
console.log('Courses updated successfully!');
