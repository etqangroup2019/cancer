import { NavLink, useLocation } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';
import {
    FilePlus,
    BookOpen,
    Settings,
    Stethoscope
} from 'lucide-react';

export function BottomNav() {
    const { t } = useLanguage();
    const location = useLocation();

    const navItems = [
        { path: '/new-case', icon: FilePlus, label: t('nav.newCase') },
        { path: '/post-op-case', icon: Stethoscope, label: t('nav.postOpCase') },
        { path: '/references', icon: BookOpen, label: t('nav.references') },
        { path: '/settings', icon: Settings, label: t('nav.settings') },
    ];

    return (
        <nav className="fixed bottom-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-t border-border md:hidden safe-area-bottom">
            <div className="flex items-center justify-around h-16">
                {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = location.pathname === item.path;

                    return (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            className={cn(
                                "flex flex-col items-center justify-center flex-1 h-full gap-1 transition-colors",
                                isActive
                                    ? "text-primary border-t-2 border-primary"
                                    : "text-muted-foreground hover:text-foreground"
                            )}
                        >
                            <Icon className="h-5 w-5" />
                            <span className="text-[10px] font-medium truncate w-full text-center px-1">
                                {item.label}
                            </span>
                        </NavLink>
                    );
                })}
            </div>
        </nav>
    );
}
