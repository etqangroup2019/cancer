import { useLanguage } from '@/contexts/LanguageContext';
import { useCase } from '@/contexts/CaseContext';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';

const tOptions = [
  { value: 'TX', key: 'tnm.tx' },
  { value: 'T0', key: 'tnm.t0' },
  { value: 'T1a', key: 'tnm.t1a' },
  { value: 'T1b', key: 'tnm.t1b' },
  { value: 'T2a', key: 'tnm.t2a' },
  { value: 'T2b', key: 'tnm.t2b' },
  { value: 'T3a', key: 'tnm.t3a' },
  { value: 'T3b', key: 'tnm.t3b' },
  { value: 'T3c', key: 'tnm.t3c' },
  { value: 'T4', key: 'tnm.t4' },
];

const nOptions = [
  { value: 'NX', key: 'tnm.nx' },
  { value: 'N0', key: 'tnm.n0' },
  { value: 'N1', key: 'tnm.n1' },
];

const mOptions = [
  { value: 'MX', key: 'tnm.mx' },
  { value: 'M0', key: 'tnm.m0' },
  { value: 'M1', key: 'tnm.m1' },
];

export function TNMForm() {
  const { t } = useLanguage();
  const { currentCase, updateTNMData } = useCase();

  if (!currentCase) return null;

  const { tnm } = currentCase;

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold">{t('tnm.title')}</h2>

      <div className="space-y-4">
        {/* T - Primary Tumor */}
        <div className="space-y-2">
          <Label className="flex items-center gap-2">
            <span className="staging-badge staging-t">T</span>
            {t('tnm.t')}
          </Label>
          <Select
            value={tnm.t ?? ''}
            onValueChange={(value) => updateTNMData({ t: value })}
          >
            <SelectTrigger className={cn(tnm.t && 'border-staging-t')}>
              <SelectValue placeholder={t('misc.required')} />
            </SelectTrigger>
            <SelectContent>
              {tOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {t(option.key)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* N - Regional Lymph Nodes */}
        <div className="space-y-2">
          <Label className="flex items-center gap-2">
            <span className="staging-badge staging-n">N</span>
            {t('tnm.n')}
          </Label>
          <Select
            value={tnm.n ?? ''}
            onValueChange={(value) => updateTNMData({ n: value })}
          >
            <SelectTrigger className={cn(tnm.n && 'border-staging-n')}>
              <SelectValue placeholder={t('misc.required')} />
            </SelectTrigger>
            <SelectContent>
              {nOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {t(option.key)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* M - Distant Metastasis */}
        <div className="space-y-2">
          <Label className="flex items-center gap-2">
            <span className="staging-badge staging-m">M</span>
            {t('tnm.m')}
          </Label>
          <Select
            value={tnm.m ?? ''}
            onValueChange={(value) => updateTNMData({ m: value })}
          >
            <SelectTrigger className={cn(tnm.m && 'border-staging-m')}>
              <SelectValue placeholder={t('misc.required')} />
            </SelectTrigger>
            <SelectContent>
              {mOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {t(option.key)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* TNM Summary Display */}
      {(tnm.t || tnm.n || tnm.m) && (
        <div className="flex items-center justify-center gap-2 p-4 bg-muted rounded-lg">
          <span className={cn('staging-badge text-lg', tnm.t ? 'staging-t' : 'bg-muted-foreground/20')}>
            {tnm.t || 'T?'}
          </span>
          <span className={cn('staging-badge text-lg', tnm.n ? 'staging-n' : 'bg-muted-foreground/20')}>
            {tnm.n || 'N?'}
          </span>
          <span className={cn('staging-badge text-lg', tnm.m ? 'staging-m' : 'bg-muted-foreground/20')}>
            {tnm.m || 'M?'}
          </span>
        </div>
      )}
    </div>
  );
}
