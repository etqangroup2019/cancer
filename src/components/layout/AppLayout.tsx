import { useState, ReactNode } from 'react';
import { Header } from './Header';
import { Navigation } from './Navigation';
import { BottomNav } from './BottomNav';

interface AppLayoutProps {
  children: ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <Header
        showMenuButton={false}
        onMenuClick={() => setMobileNavOpen(true)}
      />

      <div className="flex">
        <Navigation />

        {mobileNavOpen && (
          <Navigation mobile onClose={() => setMobileNavOpen(false)} />
        )}

        <main className="flex-1 overflow-auto pb-20 md:pb-0">
          <div className="container py-6 px-4 md:px-6 lg:px-8">
            {children}
          </div>
        </main>
      </div>

      <BottomNav />
    </div>
  );
}
