import { motion } from 'framer-motion';
import { Youtube, Twitter, Github, Play } from 'lucide-react';

interface Creator {
    id: number;
    name: string;
    username: string;
    specialty: string[];
    language: string[];
    platforms: {
        youtube?: string;
        twitter?: string;
        github?: string;
    };
    description: string;
    reason: string;
    featured_content: {
        title: string;
        url: string;
        views: string;
        description: string;
    }[];
    image?: string;
}

export default function CreatorCard({ creator, index }: { creator: Creator; index: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="group bg-surface/40 backdrop-blur-md border border-white/5 rounded-2xl overflow-hidden hover:border-accent/30 transition-all duration-300 flex flex-col h-full p-6 hover:shadow-xl hover:shadow-accent/5 hover:-translate-y-1"
        >
            <div className="flex items-start gap-5 mb-6">
                <div className="relative">
                    <div className="w-16 h-16 rounded-full overflow-hidden bg-surface-hover shrink-0 border-2 border-white/10 group-hover:border-accent/50 transition-colors shadow-lg shadow-black/20">
                        {creator.image ? (
                            <img src={creator.image} alt={creator.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
                        ) : (
                            <div className="w-full h-full bg-surface-hover" />
                        )}
                    </div>
                    {/* Online/Active Indicator */}
                    <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 border-2 border-surface rounded-full" />
                </div>

                <div className="flex-1 min-w-0">
                    <h3 className="text-xl font-bold text-text-primary truncate group-hover:text-accent transition-colors">
                        {creator.name}
                    </h3>
                    <p className="text-sm text-text-secondary mb-3 font-medium">{creator.username}</p>

                    <div className="flex gap-3">
                        {creator.platforms.youtube && (
                            <a href={creator.platforms.youtube} target="_blank" rel="noreferrer" className="p-1.5 rounded-md bg-surface/50 text-text-secondary hover:text-red-500 hover:bg-red-500/10 transition-all">
                                <Youtube className="w-4 h-4" />
                            </a>
                        )}
                        {creator.platforms.twitter && (
                            <a href={creator.platforms.twitter} target="_blank" rel="noreferrer" className="p-1.5 rounded-md bg-surface/50 text-text-secondary hover:text-blue-400 hover:bg-blue-400/10 transition-all">
                                <Twitter className="w-4 h-4" />
                            </a>
                        )}
                        {creator.platforms.github && (
                            <a href={creator.platforms.github} target="_blank" rel="noreferrer" className="p-1.5 rounded-md bg-surface/50 text-text-secondary hover:text-white hover:bg-white/10 transition-all">
                                <Github className="w-4 h-4" />
                            </a>
                        )}
                    </div>
                </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-6">
                {creator.specialty.map(s => (
                    <span key={s} className="px-2.5 py-1 rounded-md text-xs font-bold bg-surface/50 text-text-secondary border border-white/5 group-hover:border-accent/20 group-hover:text-accent transition-colors">
                        {s}
                    </span>
                ))}
            </div>

            <p className="text-sm text-text-secondary mb-6 leading-relaxed border-l-2 border-white/10 pl-4 group-hover:border-accent/50 transition-colors">
                {creator.description}
            </p>

            <div className="mt-auto space-y-4">
                {creator.featured_content && creator.featured_content[0] && (
                    <div className="p-3 rounded-xl bg-surface/30 border border-white/5 mb-4">
                        <p className="text-[10px] uppercase font-bold text-text-secondary mb-1">Featured</p>
                        <a href={creator.featured_content[0].url} target="_blank" rel="noreferrer" className="text-sm font-semibold text-text-primary hover:text-accent truncate block transition-colors">
                            {creator.featured_content[0].title}
                        </a>
                    </div>
                )}

                <div className="grid grid-cols-2 gap-3">
                    <a
                        href={creator.platforms.youtube}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center justify-center gap-2 bg-text-primary hover:opacity-90 text-background text-sm font-bold py-2.5 rounded-xl transition-all shadow-lg shadow-primary/10"
                    >
                        Subscribe
                    </a>
                    <button className="flex items-center justify-center gap-2 bg-surface/50 hover:bg-surface text-text-primary text-sm font-medium py-2.5 rounded-xl transition-all border border-white/5 hover:border-white/20">
                        Videos <Play className="w-3 h-3" />
                    </button>
                </div>
            </div>
        </motion.div>
    );
}
