import { useState } from 'react';
import { Search } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import coursesData from '../data/courses.json';
import CourseCard from '../components/CourseCard';

export default function Courses() {
    const [search, setSearch] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('All');
    const [difficultyFilter, setDifficultyFilter] = useState('All');
    const [typeFilter, setTypeFilter] = useState('All');

    const categories = ['All', 'Web Dev', 'AI', 'Coding', 'DSA', 'System Design', 'Finance'];
    const difficulties = ['All', 'Beginner', 'Intermediate', 'Advanced'];
    const types = ['All', 'YouTube', 'Udemy', 'Coursera', 'Free', 'Paid'];

    const filteredCourses = coursesData.filter(course => {
        const matchesSearch = course.title.toLowerCase().includes(search.toLowerCase()) ||
            course.instructor.toLowerCase().includes(search.toLowerCase());
        const matchesCategory = categoryFilter === 'All' || course.category === categoryFilter;
        const matchesDifficulty = difficultyFilter === 'All' || course.difficulty === difficultyFilter;
        const matchesType = typeFilter === 'All' ||
            (typeFilter === 'Free' ? (course.type === 'Free' || course.type === 'YouTube') :
                typeFilter === 'Paid' ? (course.type === 'Paid' || course.type === 'Udemy' || course.type === 'Coursera') :
                    course.type === typeFilter);

        return matchesSearch && matchesCategory && matchesDifficulty && matchesType;
    });

    return (
        <div>
            {/* Hero Section - Minimal */}
            <div className="bg-surface border border-border rounded-2xl mb-16 p-12 md:p-20 text-center md:text-left relative overflow-hidden">
                {/* Abstract Geometric Shape */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-surface-hover rounded-bl-full opacity-50" />

                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="relative z-10"
                >
                    <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-text-primary mb-6">
                        The Hustler's <span className="text-text-secondary">Stash</span>
                    </h1>
                    <p className="text-xl text-text-secondary max-w-2xl mb-10 leading-relaxed">
                        Learn from legends. Build like billionaires. <br className="hidden md:block" />
                        Curated paths for students building their SDE dreams.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                        <button
                            onClick={() => document.getElementById('course-grid')?.scrollIntoView({ behavior: 'smooth' })}
                            className="px-8 py-3 rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground font-bold transition-colors"
                        >
                            Start Learning
                        </button>
                        <a
                            href="/creators"
                            className="px-8 py-3 rounded-lg border border-border hover:border-text-primary text-text-primary font-medium transition-colors flex items-center justify-center"
                        >
                            Explore Creators
                        </a>
                    </div>
                </motion.div>
            </div>

            {/* Search & Filters */}
            <div className="mb-12 space-y-8">
                <div className="relative max-w-2xl mx-auto md:mx-0">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-secondary" />
                    <input
                        type="text"
                        placeholder="Search courses, creators, tools..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full bg-background border border-border rounded-xl py-4 pl-12 pr-4 text-text-primary focus:outline-none focus:border-text-primary transition-colors placeholder:text-text-secondary"
                    />
                </div>

                <div className="flex flex-col gap-6">
                    {/* Category Filter */}
                    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                        {categories.map(c => (
                            <button
                                key={c}
                                onClick={() => setCategoryFilter(c)}
                                className={`px-6 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap border ${categoryFilter === c
                                        ? 'bg-primary text-primary-foreground border-primary'
                                        : 'bg-transparent text-text-secondary border-border hover:border-text-secondary hover:text-text-primary'
                                    }`}
                            >
                                {c}
                            </button>
                        ))}
                    </div>

                    <div className="flex flex-wrap gap-8 items-center">
                        {/* Difficulty Filter */}
                        <div className="flex items-center gap-4">
                            <span className="text-xs font-bold text-text-secondary uppercase tracking-wider">Difficulty</span>
                            <div className="flex gap-2">
                                {difficulties.map(d => (
                                    <button
                                        key={d}
                                        onClick={() => setDifficultyFilter(d)}
                                        className={`px-3 py-1.5 rounded text-xs font-medium transition-colors ${difficultyFilter === d
                                                ? 'text-text-primary underline decoration-2 underline-offset-4'
                                                : 'text-text-secondary hover:text-text-primary'
                                            }`}
                                    >
                                        {d}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="w-px h-6 bg-border hidden md:block" />

                        {/* Type Filter */}
                        <div className="flex items-center gap-4">
                            <span className="text-xs font-bold text-text-secondary uppercase tracking-wider">Type</span>
                            <div className="flex gap-2">
                                {types.map(t => (
                                    <button
                                        key={t}
                                        onClick={() => setTypeFilter(t)}
                                        className={`px-3 py-1.5 rounded text-xs font-medium transition-colors ${typeFilter === t
                                                ? 'text-text-primary underline decoration-2 underline-offset-4'
                                                : 'text-text-secondary hover:text-text-primary'
                                            }`}
                                    >
                                        {t}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Course Grid */}
            <div id="course-grid" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                <AnimatePresence>
                    {filteredCourses.map((course, index) => (
                        <CourseCard key={course.id} course={course} index={index} />
                    ))}
                </AnimatePresence>
            </div>

            {filteredCourses.length === 0 && (
                <div className="text-center py-20">
                    <p className="text-text-secondary text-lg">No courses found matching your criteria.</p>
                </div>
            )}
        </div>
    );
}
