import { useLanguage } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Moon, Sun, Globe, Shield, Info } from 'lucide-react';

export default function Settings() {
  const { t, language, setLanguage } = useLanguage();
  const { theme, setTheme } = useTheme();

  return (
    <div className="max-w-xl mx-auto space-y-6 animate-fade-in">
      <h1 className="text-2xl font-bold">{t('nav.settings')}</h1>

      {/* Language */}
      <div className="medical-card space-y-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <Globe className="h-5 w-5" />
          </div>
          <div>
            <h3 className="font-semibold">{t('settings.language')}</h3>
            <p className="text-sm text-muted-foreground">
              {language === 'ar' ? 'اختر لغة الواجهة' : 'Choose interface language'}
            </p>
          </div>
        </div>
        
        <RadioGroup
          value={language}
          onValueChange={(value) => setLanguage(value as 'ar' | 'en')}
          className="grid grid-cols-2 gap-4"
        >
          <label
            htmlFor="lang-ar"
            className="flex items-center gap-3 p-4 rounded-lg border-2 border-border cursor-pointer hover:bg-muted/50 has-[[data-state=checked]]:border-primary has-[[data-state=checked]]:bg-primary/5"
          >
            <RadioGroupItem value="ar" id="lang-ar" />
            <div>
              <p className="font-medium font-arabic">العربية</p>
              <p className="text-xs text-muted-foreground">Arabic (RTL)</p>
            </div>
          </label>
          <label
            htmlFor="lang-en"
            className="flex items-center gap-3 p-4 rounded-lg border-2 border-border cursor-pointer hover:bg-muted/50 has-[[data-state=checked]]:border-primary has-[[data-state=checked]]:bg-primary/5"
          >
            <RadioGroupItem value="en" id="lang-en" />
            <div>
              <p className="font-medium">English</p>
              <p className="text-xs text-muted-foreground">English (LTR)</p>
            </div>
          </label>
        </RadioGroup>
      </div>

      {/* Theme */}
      <div className="medical-card space-y-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
            {theme === 'light' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </div>
          <div>
            <h3 className="font-semibold">{t('settings.theme')}</h3>
            <p className="text-sm text-muted-foreground">
              {language === 'ar' ? 'اختر مظهر التطبيق' : 'Choose app appearance'}
            </p>
          </div>
        </div>
        
        <RadioGroup
          value={theme}
          onValueChange={(value) => setTheme(value as 'light' | 'dark')}
          className="grid grid-cols-2 gap-4"
        >
          <label
            htmlFor="theme-light"
            className="flex items-center gap-3 p-4 rounded-lg border-2 border-border cursor-pointer hover:bg-muted/50 has-[[data-state=checked]]:border-primary has-[[data-state=checked]]:bg-primary/5"
          >
            <RadioGroupItem value="light" id="theme-light" />
            <div className="flex items-center gap-2">
              <Sun className="h-4 w-4 text-warning" />
              <span className="font-medium">{t('settings.light')}</span>
            </div>
          </label>
          <label
            htmlFor="theme-dark"
            className="flex items-center gap-3 p-4 rounded-lg border-2 border-border cursor-pointer hover:bg-muted/50 has-[[data-state=checked]]:border-primary has-[[data-state=checked]]:bg-primary/5"
          >
            <RadioGroupItem value="dark" id="theme-dark" />
            <div className="flex items-center gap-2">
              <Moon className="h-4 w-4 text-primary" />
              <span className="font-medium">{t('settings.dark')}</span>
            </div>
          </label>
        </RadioGroup>
      </div>

      {/* Security */}
      <div className="medical-card space-y-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <Shield className="h-5 w-5" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold">{t('settings.security')}</h3>
            <p className="text-sm text-muted-foreground">
              {language === 'ar' ? 'خيارات حماية التطبيق' : 'App protection options'}
            </p>
          </div>
        </div>
        
        <div className="flex items-center justify-between p-4 rounded-lg border">
          <Label htmlFor="pin-lock" className="cursor-pointer">
            {t('settings.enablePin')}
          </Label>
          <Switch id="pin-lock" disabled />
        </div>
        <p className="text-xs text-muted-foreground ps-1">
          {language === 'ar' ? 'قريباً - ميزة قفل PIN' : 'Coming soon - PIN lock feature'}
        </p>
      </div>

      {/* About */}
      <div className="medical-card">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <Info className="h-5 w-5" />
          </div>
          <div>
            <h3 className="font-semibold">{t('app.title')}</h3>
            <p className="text-sm text-muted-foreground">
              {language === 'ar' ? 'الإصدار 1.0.0' : 'Version 1.0.0'}
            </p>
          </div>
        </div>
        <p className="text-sm text-muted-foreground mt-4">
          {language === 'ar'
            ? 'نظام دعم قرار سريري مبني على إرشادات الأورام العالمية. هذا التطبيق ليس أداة تشخيص ولا يُغني عن الطبيب.'
            : 'Clinical decision support system based on international oncology guidelines. This application is not a diagnostic tool and does not replace physician judgment.'}
        </p>
      </div>
    </div>
  );
}
