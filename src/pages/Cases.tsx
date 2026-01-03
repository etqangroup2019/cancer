import { useLanguage } from '@/contexts/LanguageContext';
import { useCase } from '@/contexts/CaseContext';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  FileText, 
  Clock, 
  Trash2, 
  FolderOpen,
  FilePlus,
  AlertCircle,
} from 'lucide-react';
import { format } from 'date-fns';
import { ar, enUS } from 'date-fns/locale';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { cn } from '@/lib/utils';

export default function Cases() {
  const { t, language } = useLanguage();
  const { savedCases, deleteCase, loadCase } = useCase();
  const navigate = useNavigate();

  const handleLoadCase = (id: string) => {
    loadCase(id);
    navigate('/new-case');
  };

  const getStageColor = (stage: string | null) => {
    switch (stage) {
      case 'I':
        return 'bg-success/10 text-success';
      case 'II':
        return 'bg-info/10 text-info';
      case 'III':
        return 'bg-warning/10 text-warning';
      case 'IV':
        return 'bg-destructive/10 text-destructive';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  if (savedCases.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center animate-fade-in">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted mb-4">
          <FolderOpen className="h-8 w-8 text-muted-foreground" />
        </div>
        <h2 className="text-xl font-semibold mb-2">
          {language === 'ar' ? 'لا توجد حالات محفوظة' : 'No Saved Cases'}
        </h2>
        <p className="text-muted-foreground mb-6 max-w-sm">
          {language === 'ar'
            ? 'ابدأ بإنشاء حالة جديدة لتظهر هنا'
            : 'Start by creating a new case to see it here'}
        </p>
        <Button onClick={() => navigate('/new-case')}>
          <FilePlus className="h-4 w-4 me-2" />
          {t('nav.newCase')}
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">{t('nav.cases')}</h1>
        <Button onClick={() => navigate('/new-case')}>
          <FilePlus className="h-4 w-4 me-2" />
          {t('nav.newCase')}
        </Button>
      </div>

      <div className="grid gap-4">
        {savedCases.map((caseItem) => (
          <div
            key={caseItem.id}
            className="medical-card flex flex-col sm:flex-row sm:items-center justify-between gap-4"
          >
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary flex-shrink-0">
                <FileText className="h-6 w-6" />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="font-semibold">
                    {caseItem.patient.caseId || caseItem.id}
                  </h3>
                  {caseItem.stage && (
                    <span className={cn('text-xs px-2 py-0.5 rounded-full font-medium', getStageColor(caseItem.stage))}>
                      {language === 'ar' ? 'المرحلة' : 'Stage'} {caseItem.stage}
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                  <span>
                    {caseItem.cancerType === 'kidney' ? t('cancer.kidney') : '-'}
                  </span>
                  {caseItem.patient.age && (
                    <span>
                      {caseItem.patient.age} {t('misc.years')}
                    </span>
                  )}
                  {caseItem.patient.gender && (
                    <span>
                      {caseItem.patient.gender === 'male' ? t('patient.male') : t('patient.female')}
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-1 mt-2 text-xs text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  {format(caseItem.updatedAt, 'PPp', { 
                    locale: language === 'ar' ? ar : enUS 
                  })}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 sm:flex-shrink-0">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleLoadCase(caseItem.id)}
              >
                {language === 'ar' ? 'فتح' : 'Open'}
              </Button>
              
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle className="flex items-center gap-2">
                      <AlertCircle className="h-5 w-5 text-destructive" />
                      {language === 'ar' ? 'حذف الحالة' : 'Delete Case'}
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      {language === 'ar'
                        ? 'هل أنت متأكد من حذف هذه الحالة؟ لا يمكن التراجع عن هذا الإجراء.'
                        : 'Are you sure you want to delete this case? This action cannot be undone.'}
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>
                      {language === 'ar' ? 'إلغاء' : 'Cancel'}
                    </AlertDialogCancel>
                    <AlertDialogAction
                      onClick={() => deleteCase(caseItem.id)}
                      className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                    >
                      {language === 'ar' ? 'حذف' : 'Delete'}
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
