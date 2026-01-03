import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { useCase } from '@/contexts/CaseContext';
import { CancerTypeSelector } from '@/components/case/CancerTypeSelector';
import { PatientDataForm } from '@/components/case/PatientDataForm';
import { TumorDataForm } from '@/components/case/TumorDataForm';
import { TNMForm } from '@/components/case/TNMForm';
import { StagingResult } from '@/components/case/StagingResult';
import { TreatmentRecommendations } from '@/components/case/TreatmentRecommendations';
import { calculateKidneyStage, StagingResult as StagingResultType } from '@/lib/stagingEngine';
import { getKidneyTreatmentRecommendations, TreatmentRecommendation } from '@/lib/treatmentEngine';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { ArrowRight, ArrowLeft, Calculator, Pill, Save, RotateCcw } from 'lucide-react';
import { toast } from 'sonner';

const STEPS = ['cancer', 'patient', 'tumor', 'tnm', 'staging', 'treatment'];

export default function NewCase() {
  const { t, language, direction } = useLanguage();
  const { currentCase, createNewCase, setCancerType, setStage, saveCase, resetCurrentCase } = useCase();
  const navigate = useNavigate();

  const [step, setStep] = useState(0);
  const [selectedCancer, setSelectedCancer] = useState<string | null>(null);
  const [stagingResult, setStagingResult] = useState<StagingResultType | null>(null);
  const [recommendations, setRecommendations] = useState<TreatmentRecommendation | null>(null);

  useEffect(() => {
    if (!currentCase) {
      createNewCase();
    }
  }, [currentCase, createNewCase]);

  const handleCancerSelect = (id: string) => {
    setSelectedCancer(id);
    if (id === 'kidney') {
      setCancerType('kidney');
    }
  };

  const handleCalculateStaging = () => {
    if (!currentCase?.tnm) return;

    const result = calculateKidneyStage(currentCase.tnm);
    if (result) {
      setStagingResult(result);
      setStage(result.stage);
      setStep(4);
    }
  };

  const handleGetRecommendations = () => {
    if (!currentCase || !stagingResult) return;

    const recs = getKidneyTreatmentRecommendations(currentCase, stagingResult);
    setRecommendations(recs);
    setStep(5);
  };

  const handleSave = () => {
    saveCase();
    toast.success(language === 'ar' ? 'تم حفظ الحالة بنجاح' : 'Case saved successfully');
  };

  const handleReset = () => {
    resetCurrentCase();
    setStep(0);
    setSelectedCancer(null);
    setStagingResult(null);
    setRecommendations(null);
    createNewCase();
  };

  const canProceed = () => {
    switch (step) {
      case 0:
        return !!selectedCancer;
      case 1:
        return !!(currentCase?.patient.age && currentCase?.patient.gender);
      case 2:
        return !!(currentCase?.tumor.histology);
      case 3:
        return !!(currentCase?.tnm.t && currentCase?.tnm.n && currentCase?.tnm.m);
      case 4:
        return !!stagingResult;
      default:
        return true;
    }
  };

  const progress = ((step + 1) / STEPS.length) * 100;

  const NextIcon = direction === 'rtl' ? ArrowLeft : ArrowRight;
  const BackIcon = direction === 'rtl' ? ArrowRight : ArrowLeft;

  const getStepTitle = () => {
    switch (step) {
      case 0: return language === 'ar' ? 'نوع السرطان' : 'Cancer Type';
      case 1: return language === 'ar' ? 'بيانات المريض' : 'Patient Data';
      case 2: return language === 'ar' ? 'بيانات الورم' : 'Tumor Data';
      case 3: return language === 'ar' ? 'تصنيف TNM' : 'TNM Classification';
      case 4: return language === 'ar' ? 'مرحلة الورم' : 'Tumor Stage';
      case 5: return language === 'ar' ? 'التوصيات العلاجية' : 'Treatment Recommendations';
      default: return '';
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6 animate-fade-in">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-bold">
          {t('newCase.title')}
        </h1>
        <p className="text-muted-foreground">
          {t('newCase.subtitle')}
        </p>
      </div>

      {/* Progress */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">
            {getStepTitle()}
          </span>
          <span className="font-medium">
            {language === 'ar' ? `${step + 1} من ${STEPS.length}` : `${step + 1} of ${STEPS.length}`}
          </span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      {/* Content */}
      <div className="medical-card">
        {step === 0 && (
          <CancerTypeSelector selected={selectedCancer} onSelect={handleCancerSelect} />
        )}
        {step === 1 && <PatientDataForm />}
        {step === 2 && <TumorDataForm />}
        {step === 3 && <TNMForm />}
        {step === 4 && stagingResult && <StagingResult result={stagingResult} />}
        {step === 5 && recommendations && (
          <TreatmentRecommendations recommendations={recommendations} />
        )}
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between gap-4">
        <Button
          variant="outline"
          onClick={() => setStep(Math.max(0, step - 1))}
          disabled={step === 0}
        >
          <BackIcon className="h-4 w-4 me-2" />
          {t('action.back')}
        </Button>

        <div className="flex gap-2">
          {step === 5 && (
            <Button variant="outline" onClick={handleReset} className="w-full sm:w-auto">
              <RotateCcw className="h-4 w-4 me-2" />
              {t('action.reset')}
            </Button>
          )}

          {step === 3 && (
            <Button onClick={handleCalculateStaging} disabled={!canProceed()}>
              <Calculator className="h-4 w-4 me-2" />
              {t('action.calculate')}
            </Button>
          )}

          {step === 4 && (
            <Button onClick={handleGetRecommendations}>
              <Pill className="h-4 w-4 me-2" />
              {t('action.getRecommendations')}
            </Button>
          )}

          {step < 3 && (
            <Button onClick={() => setStep(step + 1)} disabled={!canProceed()}>
              {t('action.next')}
              <NextIcon className="h-4 w-4 ms-2" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
