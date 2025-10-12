import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, BookOpen, GraduationCap, Lightbulb, Search, MessageSquare, Info } from 'lucide-react';
import { Button } from "@/components/ui/button";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'Courses', href: '/courses' },
    { name: 'Resources', href: '/resources' },
    { name: 'AI Tools', href: '/ai-tools' },
    { name: 'Chat', href: '/chat' },
    { name: 'About', href: '/about' },
  ];

  return (
    <header className="bg-white border-b shadow-sm fixed top-0 left-0 w-full z-50">
      <div className="container mx-auto py-4 px-6 flex items-center justify-between">
        {/* Logo and Brand */}
        <Link to="/" className="flex items-center text-2xl font-bold text-blue-700 hover:text-blue-900 transition-colors">
          <BookOpen className="mr-2 w-6 h-6" />
          RiverSkills
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-6">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className={`text-gray-700 hover:text-blue-600 transition-colors font-medium flex items-center gap-2
                ${location.pathname === item.href ? 'text-blue-800 font-semibold' : ''}`}
            >
              {item.name === 'Courses' && <GraduationCap className="w-4 h-4" />}
              {item.name === 'Resources' && <Lightbulb className="w-4 h-4" />}
              {item.name === 'AI Tools' && <Search className="w-4 h-4" />}
              {item.name === 'Chat' && <MessageSquare className="w-4 h-4" />}
              {item.name === 'About' && <Info className="w-4 h-4" />}
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <Button variant="outline" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="bg-gray-50 border-b py-4 px-6 md:hidden">
          <nav className="flex flex-col space-y-4">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`text-gray-700 hover:text-blue-600 transition-colors font-medium block py-2
                  ${location.pathname === item.href ? 'text-blue-800 font-semibold' : ''}`}
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
