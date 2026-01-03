import { useLanguage } from '@/contexts/LanguageContext';
import { StagingResult as StagingResultType, getStageColor } from '@/lib/stagingEngine';
import { cn } from '@/lib/utils';
import { AlertCircle, CheckCircle2, Info } from 'lucide-react';

interface StagingResultProps {
  result: StagingResultType;
}

export function StagingResult({ result }: StagingResultProps) {
  const { t, language } = useLanguage();
  const colorClass = getStageColor(result.stageNumeric);

  const getStageLabel = () => {
    switch (result.stage) {
      case 'I':
        return t('stage.i');
      case 'II':
        return t('stage.ii');
      case 'III':
        return t('stage.iii');
      case 'IV':
        return t('stage.iv');
      default:
        return result.stage;
    }
  };

  const getBgClass = () => {
    switch (colorClass) {
      case 'success':
        return 'bg-success/10 border-success/30';
      case 'info':
        return 'bg-info/10 border-info/30';
      case 'warning':
        return 'bg-warning/10 border-warning/30';
      case 'destructive':
        return 'bg-destructive/10 border-destructive/30';
      default:
        return 'bg-muted border-border';
    }
  };

  const getTextClass = () => {
    switch (colorClass) {
      case 'success':
        return 'text-success';
      case 'info':
        return 'text-info';
      case 'warning':
        return 'text-warning';
      case 'destructive':
        return 'text-destructive';
      default:
        return 'text-muted-foreground';
    }
  };

  const getIcon = () => {
    switch (colorClass) {
      case 'success':
        return <CheckCircle2 className="h-6 w-6" />;
      case 'warning':
      case 'destructive':
        return <AlertCircle className="h-6 w-6" />;
      default:
        return <Info className="h-6 w-6" />;
    }
  };

  return (
    <div className="space-y-4 animate-slide-up">
      <h2 className="text-lg font-semibold">{t('tnm.stage')}</h2>

      {/* Stage Badge */}
      <div className={cn('rounded-xl border-2 p-6 text-center', getBgClass())}>
        <div className={cn('flex items-center justify-center gap-3 mb-3', getTextClass())}>
          {getIcon()}
          <span className="text-4xl font-bold">{getStageLabel()}</span>
        </div>
        <p className="text-muted-foreground">{result.explanation}</p>
      </div>

      {/* Factors */}
      <div className="medical-card">
        <h3 className="font-medium mb-3 flex items-center gap-2">
          <Info className="h-4 w-4 text-primary" />
          {language === 'ar' ? 'العوامل المؤثرة' : 'Contributing Factors'}
        </h3>
        <ul className="space-y-2">
          {result.factors.map((factor, index) => (
            <li key={index} className="flex items-start gap-2 text-sm">
              <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" />
              <span className="text-muted-foreground">{factor}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
