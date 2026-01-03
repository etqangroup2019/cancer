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

const pTValues = ['pT1a', 'pT1b', 'pT2a', 'pT2b', 'pT3a', 'pT3b', 'pT3c', 'pT4'];
const pNValues = ['pNX', 'pN0', 'pN1'];
const pMValues = ['pMX', 'pM0', 'pM1'];

export function PostOpTNMForm() {
  const { t, language } = useLanguage();
  const { currentCase, updatePostOpTNMData } = useCase();

  if (!currentCase) return null;

  const postOpTNM = currentCase.postOpTNM;

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold">{t('postop.ptnm.title')}</h2>
      <p className="text-sm text-muted-foreground">{t('postop.ptnm.desc')}</p>

      <div className="grid gap-4">
        {/* pT */}
        <div className="space-y-2">
          <Label>{t('postop.pt')}</Label>
          <Select
            value={postOpTNM?.pT || ''}
            onValueChange={(value) => updatePostOpTNMData({ pT: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder={language === 'ar' ? 'اختر pT' : 'Select pT'} />
            </SelectTrigger>
            <SelectContent>
              {pTValues.map((value) => (
                <SelectItem key={value} value={value}>
                  {t(`postop.${value.toLowerCase()}`)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* pN */}
        <div className="space-y-2">
          <Label>{t('postop.pn')}</Label>
          <Select
            value={postOpTNM?.pN || ''}
            onValueChange={(value) => updatePostOpTNMData({ pN: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder={language === 'ar' ? 'اختر pN' : 'Select pN'} />
            </SelectTrigger>
            <SelectContent>
              {pNValues.map((value) => (
                <SelectItem key={value} value={value}>
                  {t(`postop.${value.toLowerCase()}`)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* pM */}
        <div className="space-y-2">
          <Label>{t('postop.pm')}</Label>
          <Select
            value={postOpTNM?.pM || ''}
            onValueChange={(value) => updatePostOpTNMData({ pM: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder={language === 'ar' ? 'اختر pM' : 'Select pM'} />
            </SelectTrigger>
            <SelectContent>
              {pMValues.map((value) => (
                <SelectItem key={value} value={value}>
                  {t(`postop.${value.toLowerCase()}`)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}
