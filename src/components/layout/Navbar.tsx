import { Link, useLocation } from '@tanstack/react-router';
import { Sun, Moon, ChevronRight } from 'lucide-react';
import { useThemeStore } from '@/stores/theme-store';
import { cn } from '@/lib/utils';

const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/content', label: 'Content' },
    { path: '/announcements', label: 'Announcements' },
    { path: '/about', label: 'About' },
    { path: '/contact', label: 'Contact' },
];

const Navbar = () => {
    const location = useLocation();
    const { theme, toggleTheme } = useThemeStore();

    return (
        <header className="hidden md:block fixed top-0 left-0 right-0 z-50 glass-strong">
            <nav className="container mx-auto flex items-center justify-between h-16 px-6">
                <Link to="/" className="flex items-center gap-2">
                    <span className="font-display text-xl font-bold text-foreground tracking-tight">
                        Kibali
                    </span>
                    <span className="text-xs font-mono text-foreground-muted uppercase tracking-widest">
                        Ministry
                    </span>
                </Link>

                <div className="flex items-center gap-1">
                    {navLinks.map((link) => (
                        <Link
                            key={link.path}
                            to={link.path}
                            className={cn(
                                'relative px-4 py-2 text-sm font-medium transition-geist rounded-md',
                                location.pathname === link.path
                                    ? 'text-foreground'
                                    : 'text-foreground-secondary hover:text-foreground'
                            )}
                        >
                            {link.label}
                            {location.pathname === link.path && (
                                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-0.5 bg-primary rounded-full" />
                            )}
                        </Link>
                    ))}
                </div>

                <div className="flex items-center gap-3">
                    <button
                        onClick={toggleTheme}
                        className="p-2 rounded-md text-foreground-secondary hover:text-foreground hover:bg-surface transition-geist"
                        aria-label="Toggle theme"
                    >
                        {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
                    </button>
                    <Link
                        to="/contact"
                        className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium bg-primary text-primary-foreground rounded-md hover:bg-primary-hover transition-geist"
                    >
                        Plan Your Visit
                        <ChevronRight size={14} />
                    </Link>
                </div>
            </nav>
        </header>
    );
};

export default Navbar;
