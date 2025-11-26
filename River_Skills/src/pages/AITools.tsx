import { useState } from 'react';
import { Search, ExternalLink, Filter } from 'lucide-react';
import { motion } from 'framer-motion';
import { aiTools } from '../data/mockData';

export default function AITools() {
    const [search, setSearch] = useState('');
    const [filter, setFilter] = useState<'All' | 'Beginner' | 'Intermediate' | 'Advanced' | 'Hard'>('All');
    const [pricingFilter, setPricingFilter] = useState<'All' | 'Free' | 'Freemium' | 'Paid'>('All');

    const filteredTools = aiTools.filter((tool) => {
        const matchesSearch = tool.name.toLowerCase().includes(search.toLowerCase()) ||
            tool.description.toLowerCase().includes(search.toLowerCase()) ||
            tool.tags.some(tag => tag.toLowerCase().includes(search.toLowerCase()));
        const matchesFilter = filter === 'All' || tool.level === filter;
        const matchesPricing = pricingFilter === 'All' || tool.pricing === pricingFilter;
        return matchesSearch && matchesFilter && matchesPricing;
    });

    return (
        <div>
            <div className="mb-12">
                <h1 className="text-4xl md:text-5xl font-bold mb-4 text-text-primary">
                    AI Tools Directory
                </h1>
                <p className="text-text-secondary text-lg max-w-2xl mb-8">
                    Discover the best AI tools to supercharge your productivity and creativity.
                </p>

                <div className="flex flex-col gap-4">
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="relative flex-1 max-w-md">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-secondary" />
                            <input
                                type="text"
                                placeholder="Search tools or tags..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="w-full bg-background border border-border rounded-xl py-3 pl-12 pr-4 outline-none focus:border-text-primary transition-colors text-text-primary placeholder:text-text-secondary"
                            />
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-4 items-center">
                        <div className="flex items-center gap-2 text-sm text-text-secondary">
                            <Filter className="w-4 h-4" />
                            <span>Level:</span>
                        </div>
                        <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
                            {['All', 'Beginner', 'Intermediate', 'Advanced', 'Hard'].map((f) => (
                                <button
                                    key={f}
                                    onClick={() => setFilter(f as any)}
                                    className={`px-3 py-1.5 rounded text-xs font-medium transition-colors border ${filter === f
                                        ? 'bg-primary text-primary-foreground border-primary'
                                        : 'bg-transparent text-text-secondary border-border hover:text-text-primary hover:border-text-secondary'
                                        }`}
                                >
                                    {f}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-4 items-center">
                        <div className="flex items-center gap-2 text-sm text-text-secondary">
                            <span className="font-bold">$</span>
                            <span>Pricing:</span>
                        </div>
                        <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
                            {['All', 'Free', 'Freemium', 'Paid'].map((p) => (
                                <button
                                    key={p}
                                    onClick={() => setPricingFilter(p as any)}
                                    className={`px-3 py-1.5 rounded text-xs font-medium transition-colors border ${pricingFilter === p
                                        ? 'bg-primary text-primary-foreground border-primary'
                                        : 'bg-transparent text-text-secondary border-border hover:text-text-primary hover:border-text-secondary'
                                        }`}
                                >
                                    {p}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredTools.map((tool, index) => (
                    <motion.div
                        key={tool.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="group bg-surface border border-border rounded-xl p-6 hover:border-text-secondary transition-all duration-200 flex flex-col h-full"
                    >
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <h3 className="text-lg font-bold text-text-primary mb-1 group-hover:text-text-primary transition-colors">
                                    {tool.name}
                                </h3>
                                <div className="flex gap-2">
                                    <span className="text-xs text-text-secondary border border-border px-1.5 py-0.5 rounded">
                                        {tool.pricing}
                                    </span>
                                    <span className="text-xs text-text-secondary border border-border px-1.5 py-0.5 rounded">
                                        {tool.level}
                                    </span>
                                </div>
                            </div>
                            <a
                                href={tool.url}
                                target="_blank"
                                rel="noreferrer"
                                className="p-2 rounded-lg bg-surface-hover text-text-primary hover:bg-border transition-colors border border-border"
                            >
                                <ExternalLink className="w-4 h-4" />
                            </a>
                        </div>

                        <p className="text-sm text-text-secondary mb-4 line-clamp-2 flex-grow">
                            {tool.description}
                        </p>

                        <div className="flex flex-wrap gap-2 mt-auto pt-4 border-t border-border">
                            {tool.tags.map((tag) => (
                                <span key={tag} className="text-xs text-text-secondary">#{tag}</span>
                            ))}
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
