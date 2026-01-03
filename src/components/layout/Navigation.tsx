import { NavLink, useLocation } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';
import { 
  LayoutDashboard, 
  FilePlus, 
  FolderOpen, 
  BookOpen, 
  Settings,
  X,
  Stethoscope
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface NavigationProps {
  mobile?: boolean;
  onClose?: () => void;
}

export function Navigation({ mobile = false, onClose }: NavigationProps) {
  const { t } = useLanguage();
  const location = useLocation();

  const navItems = [
    { path: '/', icon: LayoutDashboard, label: t('nav.dashboard') },
    { path: '/new-case', icon: FilePlus, label: t('nav.newCase') },
    { path: '/post-op-case', icon: Stethoscope, label: t('nav.postOpCase') },
    { path: '/cases', icon: FolderOpen, label: t('nav.cases') },
    { path: '/references', icon: BookOpen, label: t('nav.references') },
    { path: '/settings', icon: Settings, label: t('nav.settings') },
  ];

  const NavItem = ({ path, icon: Icon, label }: typeof navItems[0]) => {
    const isActive = location.pathname === path;
    
    return (
      <NavLink
        to={path}
        onClick={onClose}
        className={cn(
          'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all',
          isActive
            ? 'bg-primary text-primary-foreground shadow-sm'
            : 'text-muted-foreground hover:bg-muted hover:text-foreground'
        )}
      >
        <Icon className="h-5 w-5 flex-shrink-0" />
        <span>{label}</span>
      </NavLink>
    );
  };

  if (mobile) {
    return (
      <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm md:hidden">
        <div className="fixed inset-y-0 start-0 w-72 bg-card border-e border-border p-4 shadow-lg">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold">{t('app.title')}</h2>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-5 w-5" />
            </Button>
          </div>
          <nav className="flex flex-col gap-1">
            {navItems.map((item) => (
              <NavItem key={item.path} {...item} />
            ))}
          </nav>
        </div>
      </div>
    );
  }

  return (
    <aside className="hidden md:flex w-64 flex-col border-e border-border bg-card/50">
      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => (
          <NavItem key={item.path} {...item} />
        ))}
      </nav>
    </aside>
  );
}
