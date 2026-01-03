import { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { AlertTriangle, Shield } from 'lucide-react';

export function DisclaimerModal() {
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const hasAccepted = localStorage.getItem('disclaimer-accepted');
    if (!hasAccepted) {
      setIsOpen(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('disclaimer-accepted', 'true');
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={() => {}}>
      <DialogContent 
        className="sm:max-w-md" 
        onPointerDownOutside={(e) => e.preventDefault()}
        onEscapeKeyDown={(e) => e.preventDefault()}
      >
        <DialogHeader className="text-center sm:text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-warning/10">
            <AlertTriangle className="h-8 w-8 text-warning" />
          </div>
          <DialogTitle className="text-xl font-semibold">
            {t('app.disclaimer')}
          </DialogTitle>
          <DialogDescription className="text-base leading-relaxed pt-4">
            {t('app.disclaimer.text')}
          </DialogDescription>
        </DialogHeader>
        
        <div className="mt-6 flex flex-col gap-4">
          <div className="flex items-center gap-3 rounded-lg bg-muted p-3">
            <Shield className="h-5 w-5 text-primary flex-shrink-0" />
            <p className="text-sm text-muted-foreground">
              {t('app.subtitle')}
            </p>
          </div>
          
          <Button 
            onClick={handleAccept} 
            className="w-full"
            size="lg"
          >
            {t('app.disclaimer.accept')}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
