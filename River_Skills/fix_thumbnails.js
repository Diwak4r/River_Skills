import fs from 'fs';
import path from 'path';

const coursesPath = path.join(process.cwd(), 'src/data/courses.json');
const courses = JSON.parse(fs.readFileSync(coursesPath, 'utf-8'));

// Curated list of high-quality tech/education images from Unsplash
const techImages = [
    "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80", // Coding
    "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80", // Code screen
    "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80", // Laptop code
    "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80", // Cyber
    "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80", // Matrix code
    "https://images.unsplash.com/photo-1531297461136-82lw9z28a785?auto=format&fit=crop&w=800&q=80", // AI Chip
    "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80", // Chip
    "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80", // Data viz
    "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80", // Finance graph
    "https://images.unsplash.com/photo-1551033406-611cf9a28f67?auto=format&fit=crop&w=800&q=80", // Coding dark
    "https://images.unsplash.com/photo-1504639725590-34d0984388bd?auto=format&fit=crop&w=800&q=80", // Code lines
    "https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&w=800&q=80", // Tech blue
    "https://images.unsplash.com/photo-1523961131990-5ea7c61b2107?auto=format&fit=crop&w=800&q=80", // Data
    "https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=800&q=80", // Code math
    "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=800&q=80", // AI brain
    "https://images.unsplash.com/photo-1639322537228-f710d846310a?auto=format&fit=crop&w=800&q=80", // Crypto
    "https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?auto=format&fit=crop&w=800&q=80", // Analytics
    "https://images.unsplash.com/photo-1550439062-609e1531270e?auto=format&fit=crop&w=800&q=80", // System Design
    "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80", // Team coding
    "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=800&q=80", // Tech desk
];

const getYoutubeThumbnail = (url) => {
    try {
        if (url.includes('youtube.com/watch?v=')) {
            const videoId = url.split('v=')[1].split('&')[0];
            return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
        } else if (url.includes('youtu.be/')) {
            const videoId = url.split('youtu.be/')[1].split('?')[0];
            return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
        }
    } catch (e) {
        return null;
    }
    return null;
};

const updatedCourses = courses.map((course, index) => {
    let newImage = course.image;

    // 1. Try to get YouTube thumbnail
    const ytThumb = getYoutubeThumbnail(course.url);
    if (ytThumb) {
        newImage = ytThumb;
    } else {
        // 2. If no YouTube thumb, pick a distinct image from the list based on ID
        // This ensures every course gets a different image (cycling through the list)
        newImage = techImages[index % techImages.length];
    }

    return {
        ...course,
        image: newImage
    };
});

fs.writeFileSync(coursesPath, JSON.stringify(updatedCourses, null, 4));
console.log('Thumbnails updated successfully!');
