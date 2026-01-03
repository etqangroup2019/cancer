import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { ChevronRight } from 'lucide-react';

interface QuickAccessCardProps {
  to: string;
  icon: ReactNode;
  title: string;
  description: string;
  disabled?: boolean;
  badge?: string;
  className?: string;
}

export function QuickAccessCard({
  to,
  icon,
  title,
  description,
  disabled = false,
  badge,
  className,
}: QuickAccessCardProps) {
  const content = (
    <>
      <div className="flex items-center gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
          {icon}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="font-semibold">{title}</h3>
            {badge && (
              <span className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground">
                {badge}
              </span>
            )}
          </div>
          <p className="text-sm text-muted-foreground truncate">{description}</p>
        </div>
      </div>
      <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors rtl:rotate-180" />
    </>
  );

  if (disabled) {
    return (
      <div
        className={cn(
          'medical-card flex items-center justify-between opacity-60 cursor-not-allowed',
          className
        )}
      >
        {content}
      </div>
    );
  }

  return (
    <Link
      to={to}
      className={cn(
        'medical-card group flex items-center justify-between hover:shadow-medical transition-shadow',
        className
      )}
    >
      {content}
    </Link>
  );
}
