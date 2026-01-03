import { useLanguage } from '@/contexts/LanguageContext';
import { useCase } from '@/contexts/CaseContext';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export function TumorDataForm() {
  const { t } = useLanguage();
  const { currentCase, updateTumorData } = useCase();

  if (!currentCase) return null;

  const { tumor } = currentCase;

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold">{t('tumor.data')}</h2>

      <div className="grid gap-4 sm:grid-cols-2">
        {/* Tumor Size */}
        <div className="space-y-2">
          <Label htmlFor="tumorSize">{t('tumor.size')}</Label>
          <div className="flex items-center gap-2">
            <Input
              id="tumorSize"
              type="number"
              min={0}
              step={0.1}
              value={tumor.size ?? ''}
              onChange={(e) => updateTumorData({ size: parseFloat(e.target.value) || null })}
              className="flex-1"
            />
            <span className="text-sm text-muted-foreground">{t('misc.cm')}</span>
          </div>
        </div>

        {/* Grade */}
        <div className="space-y-2">
          <Label>{t('tumor.grade')}</Label>
          <Select
            value={tumor.grade?.toString() ?? ''}
            onValueChange={(value) => updateTumorData({ grade: parseInt(value) as 1 | 2 | 3 | 4 })}
          >
            <SelectTrigger>
              <SelectValue placeholder={t('misc.required')} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">Grade 1</SelectItem>
              <SelectItem value="2">Grade 2</SelectItem>
              <SelectItem value="3">Grade 3</SelectItem>
              <SelectItem value="4">Grade 4</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Histology */}
        <div className="space-y-2 sm:col-span-2">
          <Label>{t('tumor.histology')}</Label>
          <Select
            value={tumor.histology ?? ''}
            onValueChange={(value) => 
              updateTumorData({ histology: value as 'clearCell' | 'papillary' | 'chromophobe' | 'other' })
            }
          >
            <SelectTrigger>
              <SelectValue placeholder={t('misc.required')} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="clearCell">{t('tumor.clearCell')}</SelectItem>
              <SelectItem value="papillary">{t('tumor.papillary')}</SelectItem>
              <SelectItem value="chromophobe">{t('tumor.chromophobe')}</SelectItem>
              <SelectItem value="other">{t('tumor.other')}</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}
