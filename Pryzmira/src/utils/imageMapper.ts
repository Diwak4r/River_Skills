import webDevImg from '../assets/images/courses/web-dev.png';
import aiImg from '../assets/images/courses/ai.png';
import dsaImg from '../assets/images/courses/dsa.png';
import systemDesignImg from '../assets/images/courses/system-design.png';
import financeImg from '../assets/images/courses/finance.png';

export const courseImages: Record<string, string> = {
    'Web Dev': webDevImg,
    'AI': aiImg,
    'DSA': dsaImg,
    'System Design': systemDesignImg,
    'Finance': financeImg,
    'Coding': webDevImg, // Fallback/Reuse
    'Default': webDevImg
};

export const getCourseImage = (category: string): string => {
    return courseImages[category] || courseImages['Default'];
};
