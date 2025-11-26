import { motion } from 'framer-motion';
import { Youtube, Twitter, Github, Play, Users } from 'lucide-react';

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
            className="group bg-surface border border-border rounded-xl overflow-hidden hover:border-text-secondary transition-all duration-200 flex flex-col h-full p-6"
        >
            <div className="flex items-start gap-5 mb-6">
                <div className="relative">
                    <div className="w-16 h-16 rounded-full overflow-hidden bg-surface-hover shrink-0 border border-border">
                        {creator.image ? (
                            <img src={creator.image} alt={creator.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-300" />
                        ) : (
                            <div className="w-full h-full bg-surface-hover" />
                        )}
                    </div>
                </div>

                <div className="flex-1 min-w-0">
                    <h3 className="text-xl font-bold text-text-primary truncate">
                        {creator.name}
                    </h3>
                    <p className="text-sm text-text-secondary mb-3">{creator.username}</p>

                    <div className="flex gap-3">
                        {creator.platforms.youtube && (
                            <a href={creator.platforms.youtube} target="_blank" rel="noreferrer" className="text-text-secondary hover:text-text-primary transition-colors">
                                <Youtube className="w-4 h-4" />
                            </a>
                        )}
                        {creator.platforms.twitter && (
                            <a href={creator.platforms.twitter} target="_blank" rel="noreferrer" className="text-text-secondary hover:text-text-primary transition-colors">
                                <Twitter className="w-4 h-4" />
                            </a>
                        )}
                        {creator.platforms.github && (
                            <a href={creator.platforms.github} target="_blank" rel="noreferrer" className="text-text-secondary hover:text-text-primary transition-colors">
                                <Github className="w-4 h-4" />
                            </a>
                        )}
                    </div>
                </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-6">
                {creator.specialty.map(s => (
                    <span key={s} className="px-2.5 py-1 rounded text-xs font-medium bg-surface-hover text-text-secondary border border-border">
                        {s}
                    </span>
                ))}
            </div>

            <p className="text-sm text-text-secondary mb-6 leading-relaxed border-l-2 border-border pl-3">
                {creator.description}
            </p>

            <div className="mt-auto space-y-4">
                <div className="flex items-center justify-between text-xs font-medium text-text-secondary uppercase tracking-wider">
                    <span>Stats</span>
                    <span className="flex items-center gap-1 text-text-primary">
                        <Users className="w-3 h-3" /> 2.5M+ Subs
                    </span>
                </div>

                <div className="grid grid-cols-2 gap-3">
                    <a
                        href={creator.platforms.youtube}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground text-sm font-bold py-2 rounded-lg transition-colors"
                    >
                        Subscribe
                    </a>
                    <button className="flex items-center justify-center gap-2 bg-transparent hover:bg-surface-hover text-text-primary text-sm font-medium py-2 rounded-lg transition-colors border border-border">
                        Videos <Play className="w-3 h-3" />
                    </button>
                </div>
            </div>
        </motion.div>
    );
}
