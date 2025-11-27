import { useState } from 'react';
import { Search, Filter, Users } from 'lucide-react';
import CreatorCard from '../components/CreatorCard';
import creatorsData from '../data/creators.json';

export default function Creators() {
    const [search, setSearch] = useState('');
    const [specialtyFilter, setSpecialtyFilter] = useState('All');
    const [languageFilter, setLanguageFilter] = useState('All');

    const specialties = ['All', 'DSA', 'Web Dev', 'DevOps', 'System Design', 'Interview Prep'];
    const languages = ['All', 'English', 'Hindi'];

    const filteredCreators = creatorsData.filter(creator => {
        const matchesSearch = creator.name.toLowerCase().includes(search.toLowerCase()) ||
            creator.username.toLowerCase().includes(search.toLowerCase()) ||
            creator.specialty.some(s => s.toLowerCase().includes(search.toLowerCase()));

        const matchesSpecialty = specialtyFilter === 'All' || creator.specialty.includes(specialtyFilter);
        const matchesLanguage = languageFilter === 'All' || creator.language.includes(languageFilter);

        return matchesSearch && matchesSpecialty && matchesLanguage;
    });

    return (
        <div className="min-h-screen pb-20">
            <div className="relative py-20 mb-12 text-center overflow-hidden">
                {/* Background Glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-accent/10 rounded-full blur-[100px] -z-10" />

                <h1 className="text-5xl md:text-7xl font-black mb-6 text-text-primary tracking-tight">
                    Tech <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-lime-500">Creators</span> Hub
                </h1>
                <p className="text-xl text-text-secondary max-w-2xl mx-auto leading-relaxed font-medium">
                    Follow the best minds in the Indian tech industry. Master DSA, System Design, and Web Dev with their guidance.
                </p>
            </div>

            <div className="container mx-auto px-4 flex flex-col gap-10">
                <div className="flex flex-col gap-6 bg-surface/40 backdrop-blur-md border border-white/5 p-6 rounded-2xl shadow-lg shadow-black/5">
                    {/* Search */}
                    <div className="relative max-w-md group">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-secondary group-focus-within:text-accent transition-colors" />
                        <input
                            type="text"
                            placeholder="Search creators (e.g., Striver, DSA)..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full bg-surface/50 border border-white/10 rounded-xl py-3 pl-12 pr-4 outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/50 transition-all text-text-primary placeholder:text-text-secondary/50"
                        />
                    </div>

                    {/* Filters */}
                    <div className="flex flex-wrap gap-8">
                        {/* Specialty Filter */}
                        <div className="flex flex-col gap-3">
                            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-text-secondary">
                                <Filter className="w-4 h-4" />
                                <span>Specialty</span>
                            </div>
                            <div className="flex gap-2 flex-wrap">
                                {specialties.map(s => (
                                    <button
                                        key={s}
                                        onClick={() => setSpecialtyFilter(s)}
                                        className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all border ${specialtyFilter === s
                                            ? 'bg-accent text-white border-accent shadow-lg shadow-accent/20'
                                            : 'bg-surface/50 text-text-secondary border-white/5 hover:bg-surface hover:text-text-primary hover:border-white/10'
                                            }`}
                                    >
                                        {s}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Language Filter */}
                        <div className="flex flex-col gap-3">
                            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-text-secondary">
                                <Users className="w-4 h-4" />
                                <span>Language</span>
                            </div>
                            <div className="flex gap-2">
                                {languages.map(l => (
                                    <button
                                        key={l}
                                        onClick={() => setLanguageFilter(l)}
                                        className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all border ${languageFilter === l
                                            ? 'bg-accent text-white border-accent shadow-lg shadow-accent/20'
                                            : 'bg-surface/50 text-text-secondary border-white/5 hover:bg-surface hover:text-text-primary hover:border-white/10'
                                            }`}
                                    >
                                        {l}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredCreators.map((creator, index) => (
                        <CreatorCard key={creator.id} creator={creator} index={index} />
                    ))}
                </div>

                {filteredCreators.length === 0 && (
                    <div className="text-center py-20 bg-surface/20 border border-white/5 rounded-3xl border-dashed">
                        <p className="text-text-secondary text-lg">No creators found matching your criteria.</p>
                        <button
                            onClick={() => { setSearch(''); setSpecialtyFilter('All'); setLanguageFilter('All'); }}
                            className="mt-4 text-accent hover:underline font-bold"
                        >
                            Clear filters
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
