import { useLanguage } from '@/contexts/LanguageContext';
import { ExternalLink, BookOpen, FileText, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Reference {
  id: string;
  source: string;
  title: {
    en: string;
    ar: string;
  };
  description: {
    en: string;
    ar: string;
  };
  version: string;
  year: number;
  url: string;
}

const references: Reference[] = [
  {
    id: 'nccn-kidney',
    source: 'NCCN',
    title: {
      en: 'NCCN Guidelines - Kidney Cancer',
      ar: 'إرشادات NCCN - سرطان الكلى',
    },
    description: {
      en: 'National Comprehensive Cancer Network Clinical Practice Guidelines in Oncology for Kidney Cancer',
      ar: 'إرشادات الممارسة السريرية للشبكة الوطنية الشاملة للسرطان في علم الأورام لسرطان الكلى',
    },
    version: '4.2024',
    year: 2024,
    url: 'https://www.nccn.org/professionals/physician_gls/pdf/kidney.pdf',
  },
  {
    id: 'esmo-rcc',
    source: 'ESMO',
    title: {
      en: 'ESMO Guidelines - Renal Cell Carcinoma',
      ar: 'إرشادات ESMO - سرطان الخلايا الكلوية',
    },
    description: {
      en: 'European Society for Medical Oncology Clinical Practice Guidelines for Renal Cell Carcinoma',
      ar: 'إرشادات الممارسة السريرية للجمعية الأوروبية لعلم الأورام الطبي لسرطان الخلايا الكلوية',
    },
    version: '2024',
    year: 2024,
    url: 'https://www.esmo.org/guidelines/genitourinary-cancers/renal-cell-carcinoma',
  },
  {
    id: 'ajcc-staging',
    source: 'AJCC',
    title: {
      en: 'AJCC Cancer Staging Manual - 8th Edition',
      ar: 'دليل تصنيف السرطان AJCC - الإصدار الثامن',
    },
    description: {
      en: 'American Joint Committee on Cancer TNM Staging System for Kidney Cancer',
      ar: 'نظام تصنيف TNM للجنة الأمريكية المشتركة للسرطان لسرطان الكلى',
    },
    version: '8th Edition',
    year: 2017,
    url: 'https://www.facs.org/quality-programs/cancer-programs/american-joint-committee-on-cancer/',
  },
  {
    id: 'eau-rcc',
    source: 'EAU',
    title: {
      en: 'EAU Guidelines - Renal Cell Carcinoma',
      ar: 'إرشادات EAU - سرطان الخلايا الكلوية',
    },
    description: {
      en: 'European Association of Urology Guidelines on Renal Cell Carcinoma',
      ar: 'إرشادات الجمعية الأوروبية لجراحة المسالك البولية حول سرطان الخلايا الكلوية',
    },
    version: '2024',
    year: 2024,
    url: 'https://uroweb.org/guidelines/renal-cell-carcinoma',
  },
];

export default function References() {
  const { t, language } = useLanguage();

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold">{t('nav.references')}</h1>
        <p className="text-muted-foreground mt-1">
          {language === 'ar'
            ? 'الإرشادات والمراجع الطبية المعتمدة'
            : 'Approved medical guidelines and references'}
        </p>
      </div>

      <div className="grid gap-4">
        {references.map((ref) => (
          <div key={ref.id} className="medical-card">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary flex-shrink-0">
                <BookOpen className="h-6 w-6" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap mb-1">
                  <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-primary/10 text-primary">
                    {ref.source}
                  </span>
                </div>
                <h3 className="font-semibold">
                  {language === 'ar' ? ref.title.ar : ref.title.en}
                </h3>
                <p className="text-sm text-muted-foreground mt-1">
                  {language === 'ar' ? ref.description.ar : ref.description.en}
                </p>
                <div className="flex items-center gap-4 mt-3 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <FileText className="h-3 w-3" />
                    {t('ref.version')}: {ref.version}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {ref.year}
                  </span>
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                asChild
                className="flex-shrink-0"
              >
                <a href={ref.url} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-4 w-4 me-2" />
                  {language === 'ar' ? 'فتح' : 'Open'}
                </a>
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Disclaimer */}
      <div className="medical-card bg-muted/50">
        <p className="text-sm text-muted-foreground">
          {language === 'ar'
            ? 'ملاحظة: الروابط توجه إلى مصادر خارجية. تأكد من مراجعة أحدث إصدارات الإرشادات من المصادر الرسمية.'
            : 'Note: Links direct to external sources. Please ensure you review the latest guideline versions from official sources.'}
        </p>
      </div>
    </div>
  );
}
