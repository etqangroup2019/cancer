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
import { Switch } from '@/components/ui/switch';

export function PathologyDataForm() {
  const { language, t } = useLanguage();
  const { currentCase, updatePathologyData } = useCase();

  if (!currentCase) return null;

  const pathology = currentCase.pathology;

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold">{t('pathology.title')}</h2>

      <div className="grid gap-4 sm:grid-cols-2">
        {/* Histology Type */}
        <div className="space-y-2">
          <Label htmlFor="histology">{t('pathology.histology')}</Label>
          <Select
            value={pathology?.histology || ''}
            onValueChange={(value) => updatePathologyData({ histology: value as any })}
          >
            <SelectTrigger>
              <SelectValue placeholder={language === 'ar' ? 'اختر النوع' : 'Select type'} />
            </SelectTrigger>
            <SelectContent>
              {currentCase.cancerType === 'wilms' ? (
                <>
                  <SelectItem value="wilms-low">{language === 'ar' ? 'خطر منخفض' : 'Low Risk'}</SelectItem>
                  <SelectItem value="wilms-intermediate">{language === 'ar' ? 'خطر متوسط' : 'Intermediate Risk'}</SelectItem>
                  <SelectItem value="wilms-high">{language === 'ar' ? 'خطر عالٍ' : 'High Risk'}</SelectItem>
                  <SelectItem value="mesoblastic">{language === 'ar' ? 'ميزوبلاستيك' : 'Mesoblastic nephroma'}</SelectItem>
                </>
              ) : (
                <>
                  <SelectItem value="clearCell">{t('tumor.clearCell')}</SelectItem>
                  <SelectItem value="papillary">{t('tumor.papillary')}</SelectItem>
                  <SelectItem value="chromophobe">{t('tumor.chromophobe')}</SelectItem>
                  <SelectItem value="sarcomatoid">{t('pathology.sarcomatoid')}</SelectItem>
                </>
              )}
              <SelectItem value="other">{t('tumor.other')}</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Wilms Type (Detailed) */}
        {currentCase.cancerType === 'wilms' && (
          <div className="space-y-2">
            <Label>{language === 'ar' ? 'نوع النسيج (SIOP)' : 'SIOP Histology Type'}</Label>
            <Select
              value={pathology?.wilmsType || ''}
              onValueChange={(value) => updatePathologyData({ wilmsType: value as any })}
            >
              <SelectTrigger>
                <SelectValue placeholder={language === 'ar' ? 'اختر النوع الدقيق' : 'Select specific type'} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="necrotic">{language === 'ar' ? 'نخر كامل' : 'Completely Necrotic'}</SelectItem>
                <SelectItem value="epithelial">{language === 'ar' ? 'ظهاري' : 'Epithelial predominant'}</SelectItem>
                <SelectItem value="stromal">{language === 'ar' ? 'سدوي' : 'Stromal predominant'}</SelectItem>
                <SelectItem value="mixed">{language === 'ar' ? 'مختلط' : 'Mixed type'}</SelectItem>
                <SelectItem value="regressive">{language === 'ar' ? 'تراجعي' : 'Regressive type'}</SelectItem>
                <SelectItem value="blastemal">{language === 'ar' ? 'برعمي (عالي الخطر)' : 'Blastemal (High risk)'}</SelectItem>
                <SelectItem value="anaplastic">{language === 'ar' ? 'فقد تمايز (عالي الخطر)' : 'Diffuse anaplasia'}</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}

        {/* Grade */}
        <div className="space-y-2">
          <Label htmlFor="grade">{t('pathology.grade')}</Label>
          <Select
            value={pathology?.grade?.toString() || ''}
            onValueChange={(value) => updatePathologyData({ grade: parseInt(value) as 1 | 2 | 3 | 4 })}
          >
            <SelectTrigger>
              <SelectValue placeholder={language === 'ar' ? 'اختر الدرجة' : 'Select grade'} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">{t('pathology.grade1')}</SelectItem>
              <SelectItem value="2">{t('pathology.grade2')}</SelectItem>
              <SelectItem value="3">{t('pathology.grade3')}</SelectItem>
              <SelectItem value="4">{t('pathology.grade4')}</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Tumor Size */}
        <div className="space-y-2">
          <Label htmlFor="tumorSize">{t('pathology.tumorSize')}</Label>
          <div className="flex items-center gap-2">
            <Input
              id="tumorSize"
              type="number"
              step="0.1"
              min="0"
              value={pathology?.tumorSize || ''}
              onChange={(e) => updatePathologyData({ tumorSize: parseFloat(e.target.value) || null })}
              placeholder="0.0"
              className="flex-1"
            />
            <span className="text-muted-foreground">{t('misc.cm')}</span>
          </div>
        </div>

        {/* Surgical Margin */}
        <div className="space-y-2">
          <Label htmlFor="margin">{t('pathology.margin')}</Label>
          <Select
            value={pathology?.marginStatus || ''}
            onValueChange={(value) => updatePathologyData({ marginStatus: value as any })}
          >
            <SelectTrigger>
              <SelectValue placeholder={language === 'ar' ? 'اختر' : 'Select'} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="negative">{t('pathology.marginNegative')}</SelectItem>
              <SelectItem value="positive">{t('pathology.marginPositive')}</SelectItem>
              <SelectItem value="close">{t('pathology.marginClose')}</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Vascular Invasion */}
      <div className="flex items-center justify-between rounded-lg border p-4">
        <div className="space-y-0.5">
          <Label className="text-base">{t('pathology.vascularInvasion')}</Label>
          <p className="text-sm text-muted-foreground">{t('pathology.vascularInvasion.desc')}</p>
        </div>
        <Switch
          checked={pathology?.vascularInvasion || false}
          onCheckedChange={(checked) => updatePathologyData({ vascularInvasion: checked })}
        />
      </div>

      {/* Lymph Node Invasion */}
      <div className="flex items-center justify-between rounded-lg border p-4">
        <div className="space-y-0.5">
          <Label className="text-base">{t('pathology.lymphInvasion')}</Label>
          <p className="text-sm text-muted-foreground">{t('pathology.lymphInvasion.desc')}</p>
        </div>
        <Switch
          checked={pathology?.lymphNodeInvasion || false}
          onCheckedChange={(checked) => updatePathologyData({ lymphNodeInvasion: checked })}
        />
      </div>

      {/* Sarcomatoid Features */}
      <div className="flex items-center justify-between rounded-lg border p-4">
        <div className="space-y-0.5">
          <Label className="text-base">{t('pathology.sarcomatoidFeatures')}</Label>
          <p className="text-sm text-muted-foreground">{t('pathology.sarcomatoidFeatures.desc')}</p>
        </div>
        <Switch
          checked={pathology?.sarcomatoidFeatures || false}
          onCheckedChange={(checked) => updatePathologyData({ sarcomatoidFeatures: checked })}
        />
      </div>

      {/* Necrosis */}
      <div className="flex items-center justify-between rounded-lg border p-4">
        <div className="space-y-0.5">
          <Label className="text-base">{t('pathology.necrosis')}</Label>
          <p className="text-sm text-muted-foreground">{t('pathology.necrosis.desc')}</p>
        </div>
        <Switch
          checked={pathology?.necrosis || false}
          onCheckedChange={(checked) => updatePathologyData({ necrosis: checked })}
        />
      </div>

      {currentCase.cancerType === 'wilms' && (
        <>
          {/* Tumor Rupture */}
          <div className="flex items-center justify-between rounded-lg border p-4 border-warning/50 bg-warning/5">
            <div className="space-y-0.5">
              <Label className="text-base text-warning-foreground">
                {language === 'ar' ? 'انفجار الورم' : 'Tumor Rupture'}
              </Label>
              <p className="text-sm text-muted-foreground">
                {language === 'ar' ? 'سواء قبل العملية أو أثناءها' : 'Either pre-operative or intra-operative'}
              </p>
            </div>
            <Switch
              checked={pathology?.isRuptured || false}
              onCheckedChange={(checked) => updatePathologyData({ isRuptured: checked })}
            />
          </div>

          {/* Bilateral Tumors */}
          <div className="flex items-center justify-between rounded-lg border p-4 border-info/50 bg-info/5">
            <div className="space-y-0.5">
              <Label className="text-base text-info-foreground">
                {language === 'ar' ? 'أورام ثنائية الجانب' : 'Bilateral Tumors'}
              </Label>
              <p className="text-sm text-muted-foreground">
                {language === 'ar' ? 'إصابة كلتا الكليتين (المرحلة الخامسة)' : 'Involvement of both kidneys (Stage V)'}
              </p>
            </div>
            <Switch
              checked={pathology?.isBilateral || false}
              onCheckedChange={(checked) => updatePathologyData({ isBilateral: checked })}
            />
          </div>
        </>
      )}
    </div>
  );
}
