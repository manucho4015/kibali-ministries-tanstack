import { Link, useLocation } from '@tanstack/react-router';
import { Home, PlayCircle, Bell, Users, Mail } from 'lucide-react';
import { cn } from '@/lib/utils';

const tabs = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/content', label: 'Content', icon: PlayCircle },
    { path: '/announcements', label: 'News', icon: Bell },
    { path: '/about', label: 'About', icon: Users },
    { path: '/contact', label: 'Contact', icon: Mail },
];

const BottomTabBar = () => {
    const location = useLocation();

    return (
        <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-background/85 backdrop-blur-2xl safe-area-pb">
            <div className="flex items-center justify-around h-16 px-2">
                {tabs.map((tab) => {
                    const isActive = location.pathname === tab.path;
                    const Icon = tab.icon;
                    return (
                        <Link
                            key={tab.path}
                            to={tab.path}
                            className={cn(
                                'flex flex-col items-center justify-center gap-0.5 min-w-[48px] min-h-[48px] rounded-lg transition-geist',
                                isActive
                                    ? 'text-primary'
                                    : 'text-foreground-muted'
                            )}
                        >
                            <Icon size={22} strokeWidth={isActive ? 2.5 : 1.5} />
                            <span className={cn(
                                'text-[10px] font-medium',
                                isActive ? 'text-primary' : 'text-foreground-muted'
                            )}>
                                {tab.label}
                            </span>
                        </Link>
                    );
                })}
            </div>
        </nav>
    );
};

export default BottomTabBar;
