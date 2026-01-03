import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { useCase } from '@/contexts/CaseContext';
import { CancerTypeSelector } from '@/components/case/CancerTypeSelector';
import { PreOpDataForm } from '@/components/case/PreOpDataForm';
import { PathologyDataForm } from '@/components/case/PathologyDataForm';
import { PostOpTNMForm } from '@/components/case/PostOpTNMForm';
import { StagingResult } from '@/components/case/StagingResult';
import { TreatmentRecommendations } from '@/components/case/TreatmentRecommendations';
import { calculatePostOpKidneyStage, calculateWilmsStage, StagingResult as StagingResultType } from '@/lib/stagingEngine';
import { getPostOpTreatmentRecommendations, getWilmsTreatmentRecommendations, TreatmentRecommendation } from '@/lib/treatmentEngine';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { ArrowRight, ArrowLeft, Calculator, Pill, RotateCcw } from 'lucide-react';

const STEPS = ['cancer', 'preop', 'pathology', 'ptnm', 'staging', 'treatment'];

export default function PostOpCase() {
  const { t, language, direction } = useLanguage();
  const { currentCase, createNewCase, setCancerType, setCaseType, setStage, resetCurrentCase } = useCase();
  const navigate = useNavigate();

  const [step, setStep] = useState(0);
  const [selectedCancer, setSelectedCancer] = useState<string | null>(null);
  const [stagingResult, setStagingResult] = useState<StagingResultType | null>(null);
  const [recommendations, setRecommendations] = useState<TreatmentRecommendation | null>(null);

  useEffect(() => {
    if (!currentCase) {
      createNewCase();
    }
    setCaseType('postOp');
  }, [currentCase, createNewCase, setCaseType]);

  const handleCancerSelect = (id: string) => {
    setSelectedCancer(id);
    if (id === 'kidney') {
      setCancerType('kidney');
    } else if (id === 'wilms') {
      setCancerType('wilms');
    }
  };

  const handleCalculateStaging = () => {
    if (!currentCase?.postOpTNM) return;

    let result: StagingResultType | null = null;
    if (currentCase.cancerType === 'kidney') {
      result = calculatePostOpKidneyStage(currentCase.postOpTNM, currentCase.pathology);
    } else if (currentCase.cancerType === 'wilms') {
      result = calculateWilmsStage(currentCase.postOpTNM, currentCase.pathology);
    }

    if (result) {
      setStagingResult(result);
      setStage(result.stage);
      setStep(4);
    }
  };

  const handleGetRecommendations = () => {
    if (!currentCase || !stagingResult) return;

    let recs: TreatmentRecommendation | null = null;
    if (currentCase.cancerType === 'kidney') {
      recs = getPostOpTreatmentRecommendations(currentCase, stagingResult);
    } else if (currentCase.cancerType === 'wilms') {
      recs = getWilmsTreatmentRecommendations(currentCase, stagingResult);
    }

    setRecommendations(recs);
    setStep(5);
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
        return !!(currentCase?.patient.age && (currentCase?.preOp?.surgeryType || currentCase?.cancerType === 'wilms'));
      case 2:
        return !!(currentCase?.pathology?.histology);
      case 3:
        return !!(currentCase?.postOpTNM?.pT && currentCase?.postOpTNM?.pN);
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
      case 1: return language === 'ar' ? 'بيانات ما قبل العملية' : 'Pre-Op Data';
      case 2: return language === 'ar' ? 'نتيجة العينة' : 'Pathology';
      case 3: return language === 'ar' ? 'التصنيف المرضي' : 'pTNM';
      case 4: return language === 'ar' ? 'المرحلة النهائية' : 'Final Stage';
      case 5: return language === 'ar' ? 'التوصيات العلاجية' : 'Treatment';
      default: return '';
    }
  };

  const renderStep = () => {
    switch (step) {
      case 0:
        return <CancerTypeSelector selected={selectedCancer} onSelect={handleCancerSelect} />;
      case 1:
        return <PreOpDataForm />;
      case 2:
        return <PathologyDataForm />;
      case 3:
        return <PostOpTNMForm />;
      case 4:
        return stagingResult ? <StagingResult result={stagingResult} /> : null;
      case 5:
        return recommendations ? <TreatmentRecommendations recommendations={recommendations} /> : null;
      default:
        return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-10">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-bold">
          {language === 'ar' ? 'حالة ما بعد العملية' : 'Post-Operative Case'}
        </h1>
        <p className="text-muted-foreground">
          {language === 'ar'
            ? 'تحديد خطة العلاج المكمل بناءً على نتائج العينة'
            : 'Determine adjuvant treatment based on pathology results'}
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

      <div className="min-h-[400px]">
        {renderStep()}
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between pt-6 border-t">
        <Button
          variant="outline"
          onClick={() => setStep(prev => prev - 1)}
          disabled={step === 0}
        >
          <BackIcon className="h-4 w-4 me-2" />
          {t('action.back')}
        </Button>

        <div className="flex items-center gap-2">
          {step === 5 && (
            <Button variant="outline" onClick={handleReset}>
              <RotateCcw className="h-4 w-4 me-2" />
              {t('action.reset')}
            </Button>
          )}

          {step === 3 ? (
            <Button onClick={handleCalculateStaging} disabled={!canProceed()}>
              <Calculator className="h-4 w-4 me-2" />
              {t('action.calculate')}
            </Button>
          ) : step === 4 ? (
            <Button onClick={handleGetRecommendations} disabled={!canProceed()}>
              <Pill className="h-4 w-4 me-2" />
              {t('action.getRecommendations')}
            </Button>
          ) : step < 5 ? (
            <Button onClick={() => setStep(prev => prev + 1)} disabled={!canProceed()}>
              {t('action.next')}
              <NextIcon className="h-4 w-4 ms-2" />
            </Button>
          ) : null}
        </div>
      </div>
    </div>
  );
}
