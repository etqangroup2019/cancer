import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';
import { CheckCircle2 } from 'lucide-react';

interface CancerType {
  id: string;
  nameKey: string;
  descKey: string;
  icon: string;
  available: boolean;
}

const cancerTypes: CancerType[] = [
  { id: 'kidney', nameKey: 'cancer.kidney', descKey: 'cancer.kidney.desc', icon: '🫘', available: true },
  { id: 'wilms', nameKey: 'cancer.wilms', descKey: 'cancer.wilms.desc', icon: '🧒', available: true },
  { id: 'breast', nameKey: 'cancer.breast', descKey: 'cancer.breast', icon: '🎀', available: false },
  { id: 'lung', nameKey: 'cancer.lung', descKey: 'cancer.lung', icon: '🫁', available: false },
];

interface CancerTypeSelectorProps {
  selected: string | null;
  onSelect: (id: string) => void;
}

export function CancerTypeSelector({ selected, onSelect }: CancerTypeSelectorProps) {
  const { t } = useLanguage();

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">{t('cancer.select')}</h2>

      <div className="grid gap-3 sm:grid-cols-2">
        {cancerTypes.map((type) => (
          <button
            key={type.id}
            onClick={() => type.available && onSelect(type.id)}
            disabled={!type.available}
            className={cn(
              'relative flex items-center gap-4 rounded-xl border-2 p-4 text-start transition-all',
              type.available
                ? 'cursor-pointer hover:border-primary/50 hover:bg-primary/5'
                : 'cursor-not-allowed opacity-50',
              selected === type.id
                ? 'border-primary bg-primary/5'
                : 'border-border'
            )}
          >
            <span className="text-3xl">{type.icon}</span>
            <div className="flex-1">
              <p className="font-medium">{t(type.nameKey)}</p>
              <p className="text-sm text-muted-foreground">{t(type.descKey)}</p>
              {!type.available && (
                <span className="text-xs text-muted-foreground mt-1 inline-block">
                  {t('cancer.comingSoon')}
                </span>
              )}
            </div>
            {selected === type.id && (
              <CheckCircle2 className="h-5 w-5 text-primary absolute top-3 end-3" />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
