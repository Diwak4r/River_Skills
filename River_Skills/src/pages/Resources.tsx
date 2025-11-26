import { useState } from 'react';
import { Youtube, ExternalLink, BookOpen, GraduationCap, Map, Search, Lightbulb, Quote } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { resources } from '../data/mockData';
import motivationData from '../data/motivation.json';
import tipsData from '../data/tips.json';
import MotivationCard from '../components/MotivationCard';
import TipCard from '../components/TipCard';

export default function Resources() {
    const [activeTab, setActiveTab] = useState<'Resources' | 'Motivation' | 'Tips'>('Resources');
    const [search, setSearch] = useState('');

    // Resources Logic
    const getIcon = (type: string) => {
        switch (type) {
            case 'YouTube Channel': return <Youtube className="w-6 h-6" />;
            case 'Course': return <GraduationCap className="w-6 h-6" />;
            case 'Guide': return <Map className="w-6 h-6" />;
            case 'Platform': return <BookOpen className="w-6 h-6" />;
            default: return <ExternalLink className="w-6 h-6" />;
        }
    };

    const filteredResources = resources.filter(resource =>
        resource.title.toLowerCase().includes(search.toLowerCase()) ||
        resource.description.toLowerCase().includes(search.toLowerCase()) ||
        resource.type.toLowerCase().includes(search.toLowerCase())
    );

    const filteredMotivation = motivationData.filter(item =>
        item.title.toLowerCase().includes(search.toLowerCase()) ||
        item.person.toLowerCase().includes(search.toLowerCase()) ||
        item.tags.some(t => t.toLowerCase().includes(search.toLowerCase()))
    );

    const filteredTips = tipsData.filter(item =>
        item.title.toLowerCase().includes(search.toLowerCase()) ||
        item.content.toLowerCase().includes(search.toLowerCase()) ||
        item.tags.some(t => t.toLowerCase().includes(search.toLowerCase()))
    );

    return (
        <div>
            <div className="mb-12">
                <h1 className="text-4xl md:text-5xl font-bold mb-4 text-text-primary">
                    The Vault
                </h1>
                <p className="text-text-secondary text-lg max-w-2xl mb-8">
                    Curated learning paths, legendary channels, and essential guides to master your craft.
                </p>

                <div className="flex flex-col gap-6">
                    {/* Tabs */}
                    <div className="flex p-1 rounded-lg bg-surface w-fit border border-border">
                        {['Resources', 'Motivation', 'Tips'].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab as any)}
                                className={`px-6 py-2.5 rounded-md text-sm font-medium transition-all flex items-center gap-2 ${activeTab === tab
                                    ? 'bg-primary text-primary-foreground shadow-sm'
                                    : 'text-text-secondary hover:text-text-primary'
                                    }`}
                            >
                                {tab === 'Resources' && <BookOpen className="w-4 h-4" />}
                                {tab === 'Motivation' && <Quote className="w-4 h-4" />}
                                {tab === 'Tips' && <Lightbulb className="w-4 h-4" />}
                                {tab}
                            </button>
                        ))}
                    </div>

                    {/* Search */}
                    <div className="relative max-w-md">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-secondary" />
                        <input
                            type="text"
                            placeholder={`Search ${activeTab.toLowerCase()}...`}
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full bg-background border border-border rounded-xl py-3 pl-12 pr-4 outline-none focus:border-text-primary transition-colors text-text-primary placeholder:text-text-secondary"
                        />
                    </div>
                </div>
            </div>

            <AnimatePresence mode="wait">
                {activeTab === 'Resources' && (
                    <motion.div
                        key="resources"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.2 }}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                    >
                        {filteredResources.map((resource) => (
                            <div key={resource.id} className="group bg-surface border border-border rounded-xl p-6 hover:border-text-secondary transition-all duration-200">
                                <div className="flex items-start justify-between mb-4">
                                    <div className="p-3 rounded-lg bg-surface-hover text-text-primary border border-border">
                                        {getIcon(resource.type)}
                                    </div>
                                    <span className="px-2.5 py-1 rounded text-xs font-medium bg-surface-hover text-text-secondary border border-border">
                                        {resource.type}
                                    </span>
                                </div>
                                <h3 className="text-lg font-bold text-text-primary mb-2 group-hover:text-text-primary transition-colors">{resource.title}</h3>
                                <p className="text-sm text-text-secondary mb-4 line-clamp-2">{resource.description}</p>
                                <a
                                    href={resource.link}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="inline-flex items-center gap-2 text-sm font-medium text-text-primary hover:underline underline-offset-4"
                                >
                                    Open Resource <ExternalLink className="w-3 h-3" />
                                </a>
                            </div>
                        ))}
                    </motion.div>
                )}

                {activeTab === 'Motivation' && (
                    <motion.div
                        key="motivation"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.2 }}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                    >
                        {filteredMotivation.map((item, index) => (
                            <MotivationCard key={item.id} item={item} index={index} />
                        ))}
                    </motion.div>
                )}

                {activeTab === 'Tips' && (
                    <motion.div
                        key="tips"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.2 }}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                    >
                        {filteredTips.map((item, index) => (
                            <TipCard key={item.id} item={item} index={index} />
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
