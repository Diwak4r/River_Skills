import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, X, Zap, Moon, Sun, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

const navItems = [
    { name: 'Courses', path: '/' },
    { name: 'Creators', path: '/creators' },
    { name: 'Handbook', path: '/handbook' },
    { name: 'AI Tools', path: '/ai-tools' },
    { name: 'Canvas', path: '/canvas' },
    { name: 'Resources', path: '/resources' },
];

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [lang, setLang] = useState('EN');
    const { theme, toggleTheme } = useTheme();

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-background border-b border-border transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                {/* Logo */}
                <div className="flex items-center gap-2">
                    <div className="p-1.5 bg-primary rounded-md">
                        <Zap className="w-5 h-5 text-primary-foreground fill-current" />
                    </div>
                    <span className="text-xl font-bold tracking-tight text-text-primary">Pryzmira</span>
                </div>

                {/* Search Bar (Desktop) */}
                <div className="hidden lg:flex items-center relative max-w-xs w-full mx-6">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary" />
                    <input
                        type="text"
                        placeholder="Search..."
                        className="w-full bg-surface border border-border rounded-lg py-2 pl-9 pr-4 text-sm text-text-primary focus:outline-none focus:border-text-primary transition-colors placeholder:text-text-secondary"
                    />
                </div>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center gap-6">
                    {navItems.map((item) => (
                        <NavLink
                            key={item.name}
                            to={item.path}
                            className={({ isActive }) =>
                                `text-sm font-medium transition-colors duration-200 ${isActive
                                    ? 'text-text-primary'
                                    : 'text-text-secondary hover:text-text-primary'
                                }`
                            }
                        >
                            {item.name}
                        </NavLink>
                    ))}
                </div>

                {/* Right Actions */}
                <div className="hidden md:flex items-center gap-4 pl-4 border-l border-border">
                    <button
                        onClick={toggleTheme}
                        className="text-text-secondary hover:text-text-primary transition-colors p-2 rounded-full hover:bg-surface"
                        aria-label="Toggle Theme"
                    >
                        {theme === 'dark' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
                    </button>

                    <div className="flex items-center gap-2">
                        {['EN', 'HI', 'NP'].map((l) => (
                            <button
                                key={l}
                                onClick={() => setLang(l)}
                                className={`text-xs font-bold transition-colors ${lang === l
                                        ? 'text-text-primary'
                                        : 'text-text-secondary hover:text-text-primary'
                                    }`}
                            >
                                {l}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden text-text-primary p-1"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <X /> : <Menu />}
                </button>
            </div>

            {/* Mobile Nav */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-background border-b border-border overflow-hidden"
                    >
                        <div className="px-6 py-4 flex flex-col gap-4">
                            {navItems.map((item) => (
                                <NavLink
                                    key={item.name}
                                    to={item.path}
                                    onClick={() => setIsOpen(false)}
                                    className={({ isActive }) =>
                                        `text-lg font-medium transition-colors duration-200 ${isActive ? 'text-text-primary' : 'text-text-secondary'
                                        }`
                                    }
                                >
                                    {item.name}
                                </NavLink>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
