import { useLanguage } from '@/contexts/LanguageContext';
import { TreatmentRecommendation, TreatmentOption } from '@/lib/treatmentEngine';
import { cn } from '@/lib/utils';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
  Syringe,
  Pill,
  Shield,
  Eye,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  FileText,
  ExternalLink,
} from 'lucide-react';

interface TreatmentRecommendationsProps {
  recommendations: TreatmentRecommendation;
}

function TreatmentCard({ treatment }: { treatment: TreatmentOption }) {
  const { language, t } = useLanguage();
  const isRTL = language === 'ar';

  const getIcon = () => {
    switch (treatment.type) {
      case 'surgery':
        return <Syringe className="h-5 w-5" />;
      case 'immunotherapy':
        return <Shield className="h-5 w-5" />;
      case 'targetedTherapy':
        return <Pill className="h-5 w-5" />;
      case 'surveillance':
        return <Eye className="h-5 w-5" />;
      default:
        return <Pill className="h-5 w-5" />;
    }
  };

  const name = isRTL ? treatment.name.ar : treatment.name.en;
  const description = isRTL ? treatment.description.ar : treatment.description.en;
  const indications = isRTL ? treatment.indications.ar : treatment.indications.en;
  const contraindications = isRTL ? treatment.contraindications.ar : treatment.contraindications.en;
  const warnings = isRTL ? treatment.warnings.ar : treatment.warnings.en;
  const notes = isRTL ? treatment.notes.ar : treatment.notes.en;

  return (
    <AccordionItem value={treatment.id} className="border rounded-lg px-4 mb-3">
      <AccordionTrigger className="hover:no-underline py-4">
        <div className="flex items-start gap-3 text-start w-full">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary flex-shrink-0 mt-0.5">
            {getIcon()}
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-medium text-base sm:text-lg leading-tight mb-1">{name}</p>
            <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
          </div>
        </div>
      </AccordionTrigger>
      <AccordionContent className="pb-4">
        <div className="space-y-4 pt-2">
          {/* Indications */}
          <div>
            <h4 className="text-sm font-medium flex items-center gap-2 mb-2">
              <CheckCircle2 className="h-4 w-4 text-success" />
              {t('treatment.indications')}
            </h4>
            <ul className="space-y-1 ps-6">
              {indications.map((item, i) => (
                <li key={i} className="text-sm text-muted-foreground list-disc">
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Contraindications */}
          <div>
            <h4 className="text-sm font-medium flex items-center gap-2 mb-2">
              <XCircle className="h-4 w-4 text-destructive" />
              {t('treatment.contraindications')}
            </h4>
            <ul className="space-y-1 ps-6">
              {contraindications.map((item, i) => (
                <li key={i} className="text-sm text-muted-foreground list-disc">
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Warnings */}
          <div>
            <h4 className="text-sm font-medium flex items-center gap-2 mb-2">
              <AlertTriangle className="h-4 w-4 text-warning" />
              {t('treatment.warnings')}
            </h4>
            <ul className="space-y-1 ps-6">
              {warnings.map((item, i) => (
                <li key={i} className="text-sm text-muted-foreground list-disc">
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Notes */}
          <div>
            <h4 className="text-sm font-medium flex items-center gap-2 mb-2">
              <FileText className="h-4 w-4 text-info" />
              {t('treatment.notes')}
            </h4>
            <ul className="space-y-1 ps-6">
              {notes.map((item, i) => (
                <li key={i} className="text-sm text-muted-foreground list-disc">
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* References */}
          <div className="pt-2 border-t">
            <div className="flex flex-wrap gap-2">
              {treatment.references.map((ref, i) => (
                <span
                  key={i}
                  className="inline-flex items-center gap-1 text-xs px-2 py-1 rounded-full bg-muted text-muted-foreground"
                >
                  <ExternalLink className="h-3 w-3" />
                  {ref.source} {ref.version}
                </span>
              ))}
            </div>
          </div>
        </div>
      </AccordionContent>
    </AccordionItem>
  );
}

function TreatmentSection({
  title,
  treatments,
  type,
}: {
  title: string;
  treatments: TreatmentOption[];
  type: 'neoadjuvant' | 'adjuvant' | 'primary' | 'alternative';
}) {
  if (treatments.length === 0) return null;

  const getBadgeClass = () => {
    switch (type) {
      case 'neoadjuvant':
        return 'treatment-neoadjuvant';
      case 'adjuvant':
        return 'treatment-adjuvant';
      default:
        return 'bg-primary/10 text-primary';
    }
  };

  return (
    <div className="space-y-3">
      <h3 className="flex items-center gap-2">
        <span className={cn('staging-badge', getBadgeClass())}>{title}</span>
      </h3>
      <Accordion type="single" collapsible className="w-full">
        {treatments.map((treatment) => (
          <TreatmentCard key={treatment.id} treatment={treatment} />
        ))}
      </Accordion>
    </div>
  );
}

export function TreatmentRecommendations({ recommendations }: TreatmentRecommendationsProps) {
  const { t, language } = useLanguage();

  return (
    <div className="space-y-6 animate-slide-up">
      <h2 className="text-lg font-semibold">{t('treatment.title')}</h2>

      {/* Disclaimer Banner */}
      <div className="flex items-start gap-3 p-4 rounded-lg bg-warning/10 border border-warning/30">
        <AlertTriangle className="h-5 w-5 text-warning flex-shrink-0 mt-0.5" />
        <p className="text-sm text-muted-foreground">
          {language === 'ar'
            ? 'التوصيات مبنية على الإرشادات العالمية وقابلة للتفسير. القرار النهائي يعود للطبيب المعالج.'
            : 'Recommendations are guideline-based and interpretable. Final decision rests with the treating physician.'}
        </p>
      </div>

      {/* Neoadjuvant */}
      <TreatmentSection
        title={t('treatment.neoadjuvant')}
        treatments={recommendations.neoadjuvant}
        type="neoadjuvant"
      />

      {/* Primary Treatment */}
      <TreatmentSection
        title={language === 'ar' ? 'العلاج الأساسي' : 'Primary Treatment'}
        treatments={recommendations.primaryTreatment}
        type="primary"
      />

      {/* Adjuvant */}
      <TreatmentSection
        title={t('treatment.adjuvant')}
        treatments={recommendations.adjuvant}
        type="adjuvant"
      />

      {/* Alternative Options */}
      <TreatmentSection
        title={language === 'ar' ? 'خيارات بديلة' : 'Alternative Options'}
        treatments={recommendations.alternativeOptions}
        type="alternative"
      />
    </div>
  );
}
