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
        <div>
            <div className="mb-12">
                <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-500">
                    Tech Creators Hub
                </h1>
                <p className="text-neutral-400 text-lg max-w-2xl mb-8">
                    Follow the best minds in the Indian tech industry. Master DSA, System Design, and Web Dev with their guidance.
                </p>

                <div className="flex flex-col gap-6">
                    {/* Search */}
                    <div className="relative max-w-md">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-500" />
                        <input
                            type="text"
                            placeholder="Search creators (e.g., Striver, DSA)..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full glass rounded-xl py-3 pl-12 pr-4 outline-none focus:border-white/20 transition-all bg-neutral-900/30 text-white placeholder:text-neutral-600"
                        />
                    </div>

                    {/* Filters */}
                    <div className="flex flex-wrap gap-6">
                        {/* Specialty Filter */}
                        <div className="flex flex-col gap-2">
                            <div className="flex items-center gap-2 text-sm text-neutral-400">
                                <Filter className="w-4 h-4" />
                                <span>Specialty:</span>
                            </div>
                            <div className="flex gap-2 flex-wrap">
                                {specialties.map(s => (
                                    <button
                                        key={s}
                                        onClick={() => setSpecialtyFilter(s)}
                                        className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all border ${specialtyFilter === s
                                                ? 'bg-white text-black border-white'
                                                : 'glass text-neutral-400 border-white/5 hover:bg-white/5 hover:text-white'
                                            }`}
                                    >
                                        {s}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Language Filter */}
                        <div className="flex flex-col gap-2">
                            <div className="flex items-center gap-2 text-sm text-neutral-400">
                                <Users className="w-4 h-4" />
                                <span>Language:</span>
                            </div>
                            <div className="flex gap-2">
                                {languages.map(l => (
                                    <button
                                        key={l}
                                        onClick={() => setLanguageFilter(l)}
                                        className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all border ${languageFilter === l
                                                ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/50'
                                                : 'glass text-neutral-400 border-white/5 hover:bg-white/5 hover:text-white'
                                            }`}
                                    >
                                        {l}
                                    </button>
                                ))}
                            </div>
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
                <div className="text-center py-20">
                    <p className="text-neutral-500 text-lg">No creators found matching your criteria.</p>
                </div>
            )}
        </div>
    );
}
