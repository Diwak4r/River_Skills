import { motion } from 'framer-motion';
import { Clock, Globe, Heart, Share2 } from 'lucide-react';

interface Course {
    id: number;
    title: string;
    instructor: string;
    category: string;
    url: string;
    description: string;
    difficulty: string;
    type: string;
    duration: string;
    instructor_lang: string;
    image?: string;
}

export default function CourseCard({ course, index }: { course: Course; index: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="group bg-surface border border-border rounded-xl overflow-hidden hover:border-text-secondary transition-all duration-200 flex flex-col h-full"
        >
            {/* Thumbnail Area */}
            <div className={`h-40 relative flex items-center justify-center overflow-hidden ${!course.image ? (
                    course.category === 'Web Dev' ? 'bg-[#3B82F6]' : // Blue
                        course.category === 'AI' ? 'bg-[#10B981]' :      // Emerald
                            course.category === 'DSA' ? 'bg-[#F59E0B]' :     // Amber
                                'bg-[#8B5CF6]'                                   // Violet
                ) : 'bg-surface'
                }`}>
                {course.image ? (
                    <img
                        src={course.image}
                        alt={course.title}
                        className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-300"
                    />
                ) : (
                    <div className="text-4xl font-bold text-white opacity-20 tracking-tighter">
                        {course.category}
                    </div>
                )}

                {/* Badges */}
                <div className="absolute top-3 left-3 flex gap-2">
                    <span className="px-2 py-1 bg-black/40 backdrop-blur-sm rounded text-[10px] font-bold uppercase tracking-wider text-white border border-white/10">
                        {course.difficulty}
                    </span>
                </div>

                <div className="absolute bottom-3 right-3 px-2 py-1 bg-black/40 backdrop-blur-sm rounded text-xs font-medium text-white flex items-center gap-1 border border-white/10">
                    <Clock className="w-3 h-3" />
                    {course.duration}
                </div>
            </div>

            {/* Content */}
            <div className="p-5 flex flex-col flex-grow">
                <h3 className="text-lg font-bold text-text-primary mb-1 line-clamp-2">
                    {course.title}
                </h3>
                <p className="text-sm text-text-secondary mb-3">{course.instructor}</p>

                <p className="text-sm text-text-secondary line-clamp-2 mb-4 flex-grow">
                    {course.description}
                </p>

                {/* Stats Row */}
                <div className="flex items-center gap-4 text-xs text-text-secondary mb-4 pt-4 border-t border-border">
                    <div className="flex items-center gap-1">
                        <span className="text-text-primary">★</span> 4.8
                    </div>
                    <div className="flex items-center gap-1">
                        <Globe className="w-3 h-3" />
                        {course.instructor_lang}
                    </div>
                </div>

                {/* Actions */}
                <div className="grid grid-cols-[1fr,auto,auto] gap-2">
                    <a
                        href={course.url}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground text-sm font-bold py-2 rounded-lg transition-colors"
                    >
                        Start Learning
                    </a>
                    <button className="p-2 rounded-lg border border-border hover:border-text-secondary text-text-secondary hover:text-text-primary transition-colors">
                        <Heart className="w-4 h-4" />
                    </button>
                    <button className="p-2 rounded-lg border border-border hover:border-text-secondary text-text-secondary hover:text-text-primary transition-colors">
                        <Share2 className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </motion.div>
    );
}
