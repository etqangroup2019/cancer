import { useLanguage } from '@/contexts/LanguageContext';
import { useCase, PatientData } from '@/contexts/CaseContext';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

export function PatientDataForm() {
  const { t } = useLanguage();
  const { currentCase, updatePatientData } = useCase();

  if (!currentCase) return null;

  const { patient } = currentCase;

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold">{t('patient.data')}</h2>

      <div className="grid gap-4 sm:grid-cols-2">
        {/* Age */}
        <div className="space-y-2">
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

        {/* Gender */}
        <div className="space-y-2">
          <Label>{t('patient.gender')}</Label>
          <RadioGroup
            value={patient.gender ?? ''}
            onValueChange={(value) => updatePatientData({ gender: value as 'male' | 'female' })}
            className="flex gap-4 h-10 items-center"
          >
            <div className="flex items-center space-x-2 rtl:space-x-reverse">
              <RadioGroupItem value="male" id="male" />
              <Label htmlFor="male" className="font-normal cursor-pointer">
                {t('patient.male')}
              </Label>
            </div>
            <div className="flex items-center space-x-2 rtl:space-x-reverse">
              <RadioGroupItem value="female" id="female" />
              <Label htmlFor="female" className="font-normal cursor-pointer">
                {t('patient.female')}
              </Label>
            </div>
          </RadioGroup>
        </div>
      </div>
    </div>
  );
}
