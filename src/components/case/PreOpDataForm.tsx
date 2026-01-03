import { useLanguage } from '@/contexts/LanguageContext';
import { useCase } from '@/contexts/CaseContext';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export function PreOpDataForm() {
  const { language, t } = useLanguage();
  const { currentCase, updatePreOpData, updatePatientData } = useCase();

  if (!currentCase) return null;

  const { preOp, patient } = currentCase;

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold">{t('preop.title')}</h2>
      <p className="text-sm text-muted-foreground">{t('preop.desc')}</p>

      <div className="grid gap-4 sm:grid-cols-2 border-b pb-6">
        {/* Age moved from Patient Data */}
        <div className="space-y-2 sm:col-span-2">
          <Label htmlFor="age">{t('patient.age')}</Label>
          <div className="flex items-center gap-2">
            <Input
              id="age"
              type="number"
              min={0}
              max={120}
              value={patient.age ?? ''}
              onChange={(e) => updatePatientData({ age: parseInt(e.target.value) || null })}
              className="flex-1"
            />
            <span className="text-sm text-muted-foreground">{t('misc.years')}</span>
          </div>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {/* Clinical Stage Before Surgery */}
        <div className="space-y-2">
          <Label htmlFor="clinicalStage">{t('preop.clinicalStage')}</Label>
          <Select
            value={preOp?.clinicalStage || ''}
            onValueChange={(value) => updatePreOpData({ clinicalStage: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder={language === 'ar' ? 'اختر المرحلة' : 'Select stage'} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="I">{t('stage.i')}</SelectItem>
              <SelectItem value="II">{t('stage.ii')}</SelectItem>
              <SelectItem value="III">{t('stage.iii')}</SelectItem>
              <SelectItem value="IV">{t('stage.iv')}</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Pre-op Tumor Size */}
        <div className="space-y-2">
          <Label htmlFor="preOpSize">{t('preop.tumorSize')}</Label>
          <div className="flex items-center gap-2">
            <Input
              id="preOpSize"
              type="number"
              step="0.1"
              min="0"
              value={preOp?.tumorSize || ''}
              onChange={(e) => updatePreOpData({ tumorSize: parseFloat(e.target.value) || null })}
              placeholder="0.0"
              className="flex-1"
            />
            <span className="text-muted-foreground">{t('misc.cm')}</span>
          </div>
        </div>

        {/* Pre-op cT */}
        <div className="space-y-2">
          <Label htmlFor="cT">{t('preop.ct')}</Label>
          <Select
            value={preOp?.cT || ''}
            onValueChange={(value) => updatePreOpData({ cT: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder={language === 'ar' ? 'اختر cT' : 'Select cT'} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="cT1a">{t('tnm.t1a')}</SelectItem>
              <SelectItem value="cT1b">{t('tnm.t1b')}</SelectItem>
              <SelectItem value="cT2a">{t('tnm.t2a')}</SelectItem>
              <SelectItem value="cT2b">{t('tnm.t2b')}</SelectItem>
              <SelectItem value="cT3a">{t('tnm.t3a')}</SelectItem>
              <SelectItem value="cT3b">{t('tnm.t3b')}</SelectItem>
              <SelectItem value="cT3c">{t('tnm.t3c')}</SelectItem>
              <SelectItem value="cT4">{t('tnm.t4')}</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Surgery Type */}
        <div className="space-y-2">
          <Label htmlFor="surgeryType">{t('preop.surgeryType')}</Label>
          <Select
            value={preOp?.surgeryType || ''}
            onValueChange={(value) => updatePreOpData({ surgeryType: value as any })}
          >
            <SelectTrigger>
              <SelectValue placeholder={language === 'ar' ? 'اختر نوع العملية' : 'Select surgery'} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="partial">{t('preop.partial')}</SelectItem>
              <SelectItem value="radical">{t('preop.radical')}</SelectItem>
              <SelectItem value="cytoreductive">{t('preop.cytoreductive')}</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}
