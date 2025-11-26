import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Code2, Briefcase, TrendingUp, Clock, Terminal, Zap } from 'lucide-react';
import TipCard from '../components/TipCard';
import tipsData from '../data/tips.json';

export default function Handbook() {
    const [activeTab, setActiveTab] = useState('All');

    const categories = [
        { id: 'All', label: 'All Hacks', icon: Zap },
        { id: 'DSA Interview Tips', label: 'DSA Prep', icon: Code2 },
        { id: 'Career Hacks', label: 'Career', icon: Briefcase },
        { id: 'Growth Hacking', label: 'Growth', icon: TrendingUp },
        { id: 'Productivity', label: 'Productivity', icon: Clock },
    ];

    const filteredTips = activeTab === 'All'
        ? tipsData
        : tipsData.filter(tip => tip.category === activeTab);

    return (
        <div>
            <div className="mb-12">
                <h1 className="text-4xl md:text-5xl font-bold mb-4 text-text-primary">
                    Hacker's Handbook
                </h1>
                <p className="text-text-secondary text-lg max-w-2xl mb-8">
                    The cheat codes for your career. From cracking interviews to growth hacking your personal brand.
                </p>

                {/* Categories */}
                <div className="flex flex-wrap gap-4">
                    {categories.map((cat) => (
                        <button
                            key={cat.id}
                            onClick={() => setActiveTab(cat.id)}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 border ${activeTab === cat.id
                                    ? 'bg-primary text-primary-foreground border-primary'
                                    : 'bg-transparent text-text-secondary border-border hover:text-text-primary hover:border-text-secondary'
                                }`}
                        >
                            <cat.icon className="w-4 h-4" />
                            {cat.label}
                        </button>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                <AnimatePresence mode="popLayout">
                    {filteredTips.map((tip, index) => (
                        <TipCard key={tip.id} item={tip} index={index} />
                    ))}
                </AnimatePresence>
            </div>

            {/* Starter Kits Section */}
            <div className="mt-20">
                <h2 className="text-2xl font-bold text-text-primary mb-8 flex items-center gap-2">
                    <Terminal className="w-6 h-6" />
                    Starter Kits
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Web Dev Kit */}
                    <div className="p-6 rounded-xl bg-surface border border-border hover:border-text-secondary transition-colors group">
                        <div className="w-10 h-10 rounded bg-surface-hover flex items-center justify-center mb-4 text-text-primary border border-border">
                            <Code2 className="w-5 h-5" />
                        </div>
                        <h3 className="text-lg font-bold text-text-primary mb-2">Web Dev Arsenal</h3>
                        <p className="text-sm text-text-secondary mb-4">Essential tools for modern web development.</p>
                        <ul className="space-y-2 mb-6">
                            <li className="flex items-center gap-2 text-sm text-text-secondary">
                                <span className="w-1 h-1 rounded-full bg-text-primary" /> VS Code + Extensions
                            </li>
                            <li className="flex items-center gap-2 text-sm text-text-secondary">
                                <span className="w-1 h-1 rounded-full bg-text-primary" /> GitHub Student Pack
                            </li>
                            <li className="flex items-center gap-2 text-sm text-text-secondary">
                                <span className="w-1 h-1 rounded-full bg-text-primary" /> Vercel / Netlify
                            </li>
                        </ul>
                        <button className="w-full py-2 rounded-lg bg-surface-hover hover:bg-border text-text-primary text-sm font-medium transition-colors border border-border">
                            View Kit
                        </button>
                    </div>

                    {/* AI Engineer Kit */}
                    <div className="p-6 rounded-xl bg-surface border border-border hover:border-text-secondary transition-colors group">
                        <div className="w-10 h-10 rounded bg-surface-hover flex items-center justify-center mb-4 text-text-primary border border-border">
                            <Zap className="w-5 h-5" />
                        </div>
                        <h3 className="text-lg font-bold text-text-primary mb-2">AI Engineer Kit</h3>
                        <p className="text-sm text-text-secondary mb-4">Tools to build AI apps fast.</p>
                        <ul className="space-y-2 mb-6">
                            <li className="flex items-center gap-2 text-sm text-text-secondary">
                                <span className="w-1 h-1 rounded-full bg-text-primary" /> Cursor IDE
                            </li>
                            <li className="flex items-center gap-2 text-sm text-text-secondary">
                                <span className="w-1 h-1 rounded-full bg-text-primary" /> OpenAI / Anthropic API
                            </li>
                            <li className="flex items-center gap-2 text-sm text-text-secondary">
                                <span className="w-1 h-1 rounded-full bg-text-primary" /> Hugging Face
                            </li>
                        </ul>
                        <button className="w-full py-2 rounded-lg bg-surface-hover hover:bg-border text-text-primary text-sm font-medium transition-colors border border-border">
                            View Kit
                        </button>
                    </div>

                    {/* Growth Kit */}
                    <div className="p-6 rounded-xl bg-surface border border-border hover:border-text-secondary transition-colors group">
                        <div className="w-10 h-10 rounded bg-surface-hover flex items-center justify-center mb-4 text-text-primary border border-border">
                            <TrendingUp className="w-5 h-5" />
                        </div>
                        <h3 className="text-lg font-bold text-text-primary mb-2">Growth Hacking Kit</h3>
                        <p className="text-sm text-text-secondary mb-4">Build your personal brand.</p>
                        <ul className="space-y-2 mb-6">
                            <li className="flex items-center gap-2 text-sm text-text-secondary">
                                <span className="w-1 h-1 rounded-full bg-text-primary" /> Twitter / X Pro
                            </li>
                            <li className="flex items-center gap-2 text-sm text-text-secondary">
                                <span className="w-1 h-1 rounded-full bg-text-primary" /> Gumroad
                            </li>
                            <li className="flex items-center gap-2 text-sm text-text-secondary">
                                <span className="w-1 h-1 rounded-full bg-text-primary" /> Product Hunt
                            </li>
                        </ul>
                        <button className="w-full py-2 rounded-lg bg-surface-hover hover:bg-border text-text-primary text-sm font-medium transition-colors border border-border">
                            View Kit
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
