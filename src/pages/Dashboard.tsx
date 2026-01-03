import { useLanguage } from '@/contexts/LanguageContext';
import { useCase } from '@/contexts/CaseContext';
import { StatCard } from '@/components/dashboard/StatCard';
import { QuickAccessCard } from '@/components/dashboard/QuickAccessCard';
import { 
  FolderOpen, 
  FileText, 
  Activity, 
  Clock,
  FilePlus,
  BookOpen,
  Shield,
  Stethoscope,
} from 'lucide-react';
import { format } from 'date-fns';
import { ar, enUS } from 'date-fns/locale';

export default function Dashboard() {
  const { t, language } = useLanguage();
  const { savedCases } = useCase();

  const thisMonth = savedCases.filter((c) => {
    const now = new Date();
    return (
      c.createdAt.getMonth() === now.getMonth() &&
      c.createdAt.getFullYear() === now.getFullYear()
    );
  }).length;

  const pendingReview = savedCases.filter((c) => !c.stage).length;

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Welcome Section */}
      <div>
        <h1 className="text-2xl font-bold">{t('dashboard.welcome')}</h1>
        <p className="text-muted-foreground mt-1">
          {language === 'ar' 
            ? 'نظام دعم القرار السريري للأورام'
            : 'Oncology Clinical Decision Support System'}
        </p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <StatCard
          icon={<FolderOpen className="h-5 w-5" />}
          label={t('dashboard.totalCases')}
          value={savedCases.length}
        />
        <StatCard
          icon={<FileText className="h-5 w-5" />}
          label={t('dashboard.thisMonth')}
          value={thisMonth}
          trend={thisMonth > 0 ? { value: 12, positive: true } : undefined}
        />
        <StatCard
          icon={<Activity className="h-5 w-5" />}
          label={t('dashboard.pendingReview')}
          value={pendingReview}
        />
      </div>

      {/* Quick Access */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold">{t('dashboard.quickAccess')}</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <QuickAccessCard
            to="/new-case"
            icon={<FilePlus className="h-6 w-6" />}
            title={t('nav.newCase')}
            description={language === 'ar' ? 'بدء تقييم حالة جديدة' : 'Start a new case assessment'}
          />
          <QuickAccessCard
            to="/post-op-case"
            icon={<Stethoscope className="h-6 w-6" />}
            title={t('nav.postOpCase')}
            description={language === 'ar' ? 'تقييم العلاج المساعد بعد العملية' : 'Post-operative adjuvant therapy assessment'}
            badge={language === 'ar' ? 'جديد' : 'New'}
          />
          <QuickAccessCard
            to="/cases"
            icon={<FolderOpen className="h-6 w-6" />}
            title={t('nav.cases')}
            description={language === 'ar' ? 'عرض وإدارة الحالات المحفوظة' : 'View and manage saved cases'}
          />
          <QuickAccessCard
            to="/references"
            icon={<BookOpen className="h-6 w-6" />}
            title={t('nav.references')}
            description={language === 'ar' ? 'الإرشادات والمراجع الطبية' : 'Medical guidelines and references'}
          />
        </div>
      </div>

      {/* Recent Cases */}
      {savedCases.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">{t('dashboard.recentCases')}</h2>
          <div className="medical-card overflow-hidden p-0">
            <div className="divide-y divide-border">
              {savedCases.slice(0, 5).map((caseItem) => (
                <div
                  key={caseItem.id}
                  className="flex items-center justify-between p-4 hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <FileText className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-medium">{caseItem.patient.caseId || caseItem.id}</p>
                      <p className="text-sm text-muted-foreground">
                        {caseItem.stage 
                          ? `${language === 'ar' ? 'المرحلة' : 'Stage'} ${caseItem.stage}`
                          : language === 'ar' ? 'قيد المراجعة' : 'Pending'}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    {format(caseItem.updatedAt, 'PP', { 
                      locale: language === 'ar' ? ar : enUS 
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
