import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Language = 'ar' | 'en';
type Direction = 'rtl' | 'ltr';

interface LanguageContextType {
  language: Language;
  direction: Direction;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  ar: {
    // App
    'app.title': 'نظام دعم القرار الطبي',
    'app.subtitle': 'دعم قرار الأورام السريري',
    'app.disclaimer': 'تنبيه مهم',
    'app.disclaimer.text': 'هذا التطبيق ليس أداة تشخيص ولا يُغني عن الطبيب. هو نظام دعم قرار سريري مبني على إرشادات الأورام العالمية فقط.',
    'app.disclaimer.accept': 'أفهم وأوافق',

    // Navigation
    'nav.newCase': 'حالة جديدة',
    'nav.postOpCase': 'ما بعد العملية',
    'nav.references': 'المراجع',
    'nav.settings': 'الإعدادات',

    // Cancer Types
    'cancer.select': 'اختر نوع السرطان',
    'cancer.kidney': 'سرطان الكلى',
    'cancer.kidney.desc': 'سرطان الخلايا الكلوية',
    'cancer.breast': 'سرطان الثدي',
    'cancer.lung': 'سرطان الرئة',
    'cancer.colorectal': 'سرطان القولون والمستقيم',
    'cancer.comingSoon': 'قريباً',

    // Patient Data
    'patient.data': 'بيانات المريض',
    'patient.id': 'معرّف الحالة',
    'patient.age': 'العمر',
    'patient.gender': 'الجنس',
    'patient.male': 'ذكر',
    'patient.female': 'أنثى',
    'patient.comorbidities': 'الأمراض المصاحبة',

    // Tumor Data
    'tumor.data': 'بيانات الورم',
    'tumor.size': 'حجم الورم',
    'tumor.grade': 'الدرجة',
    'tumor.histology': 'النسيج المرضي',
    'tumor.clearCell': 'خلايا صافية',
    'tumor.papillary': 'حليمي',
    'tumor.chromophobe': 'كاره للصبغة',
    'tumor.other': 'أخرى',

    // TNM Staging
    'tnm.title': 'تصنيف TNM',
    'tnm.t': 'الورم الأولي (T)',
    'tnm.n': 'العقد اللمفاوية (N)',
    'tnm.m': 'النقائل البعيدة (M)',
    'tnm.stage': 'المرحلة',

    // TNM Values
    'tnm.tx': 'TX - لا يمكن تقييم الورم الأولي',
    'tnm.t0': 'T0 - لا دليل على ورم أولي',
    'tnm.t1': 'T1 - ورم ≤7 سم محصور في الكلى',
    'tnm.t1a': 'T1a - ورم ≤4 سم',
    'tnm.t1b': 'T1b - ورم >4 سم و ≤7 سم',
    'tnm.t2': 'T2 - ورم >7 سم محصور في الكلى',
    'tnm.t2a': 'T2a - ورم >7 سم و ≤10 سم',
    'tnm.t2b': 'T2b - ورم >10 سم',
    'tnm.t3': 'T3 - امتداد للأوردة الكبرى أو الأنسجة حول الكلية',
    'tnm.t3a': 'T3a - امتداد للوريد الكلوي أو الدهون حول الكلية',
    'tnm.t3b': 'T3b - امتداد للوريد الأجوف تحت الحجاب',
    'tnm.t3c': 'T3c - امتداد للوريد الأجوف فوق الحجاب أو جداره',
    'tnm.t4': 'T4 - غزو ما بعد لفافة جيروتا',

    'tnm.nx': 'NX - لا يمكن تقييم العقد اللمفاوية',
    'tnm.n0': 'N0 - لا نقائل للعقد اللمفاوية',
    'tnm.n1': 'N1 - نقائل للعقد اللمفاوية الإقليمية',

    'tnm.mx': 'MX - لا يمكن تقييم النقائل البعيدة',
    'tnm.m0': 'M0 - لا نقائل بعيدة',
    'tnm.m1': 'M1 - نقائل بعيدة موجودة',

    // Stages
    'stage.i': 'المرحلة الأولى',
    'stage.ii': 'المرحلة الثانية',
    'stage.iii': 'المرحلة الثالثة',
    'stage.iv': 'المرحلة الرابعة',

    // Treatment
    'treatment.title': 'التوصيات العلاجية',
    'treatment.neoadjuvant': 'علاج قبل الجراحة',
    'treatment.neoadjuvant.desc': 'العلاج المُعطى قبل الجراحة الأساسية',
    'treatment.adjuvant': 'علاج بعد الجراحة',
    'treatment.adjuvant.desc': 'العلاج المُعطى بعد الجراحة الأساسية',
    'treatment.surgery': 'الجراحة',
    'treatment.targetedTherapy': 'العلاج الموجه',
    'treatment.immunotherapy': 'العلاج المناعي',
    'treatment.surveillance': 'المراقبة النشطة',
    'treatment.indications': 'دواعي الاستخدام',
    'treatment.contraindications': 'موانع الاستخدام',
    'treatment.warnings': 'تحذيرات',
    'treatment.notes': 'ملاحظات للطبيب',

    // Pathology (Post-Op)
    'pathology.title': 'نتيجة العينة النسيجية',
    'pathology.histology': 'نوع النسيج',
    'pathology.sarcomatoid': 'ساركوماتويد',
    'pathology.grade': 'درجة الورم (ISUP/WHO)',
    'pathology.grade1': 'الدرجة 1 - منخفضة',
    'pathology.grade2': 'الدرجة 2 - متوسطة منخفضة',
    'pathology.grade3': 'الدرجة 3 - متوسطة عالية',
    'pathology.grade4': 'الدرجة 4 - عالية',
    'pathology.tumorSize': 'حجم الورم الفعلي',
    'pathology.margin': 'الهوامش الجراحية',
    'pathology.marginNegative': 'سالبة (خالية من الورم)',
    'pathology.marginPositive': 'موجبة (ورم في الهامش)',
    'pathology.marginClose': 'قريبة (<1 مم)',
    'pathology.vascularInvasion': 'الغزو الوعائي',
    'pathology.vascularInvasion.desc': 'وجود خلايا سرطانية في الأوعية الدموية',
    'pathology.lymphInvasion': 'الغزو اللمفاوي الوعائي',
    'pathology.lymphInvasion.desc': 'وجود خلايا سرطانية في الأوعية اللمفاوية',
    'pathology.sarcomatoidFeatures': 'ملامح ساركوماتويد',
    'pathology.sarcomatoidFeatures.desc': 'وجود تمايز ساركوماتويد في الورم',
    'pathology.necrosis': 'النخر الورمي',
    'pathology.necrosis.desc': 'وجود مناطق نخر في الورم',

    // Pre-Op Data
    'preop.title': 'بيانات قبل العملية',
    'preop.desc': 'المعلومات السريرية قبل الجراحة',
    'preop.clinicalStage': 'المرحلة السريرية',
    'preop.tumorSize': 'حجم الورم قبل العملية',
    'preop.ct': 'تصنيف cT السريري',
    'preop.surgeryType': 'نوع العملية المُجراة',
    'preop.partial': 'استئصال جزئي للكلية',
    'preop.radical': 'استئصال كلي للكلية',
    'preop.cytoreductive': 'استئصال تخفيفي',

    // Post-Op TNM
    'postop.ptnm.title': 'التصنيف المرضي pTNM',
    'postop.ptnm.desc': 'التصنيف النهائي بناءً على فحص العينة',
    'postop.pt': 'الورم المرضي (pT)',
    'postop.pn': 'العقد اللمفاوية المرضية (pN)',
    'postop.pm': 'النقائل المرضية (pM)',
    'postop.pt1a': 'pT1a - ورم ≤4 سم',
    'postop.pt1b': 'pT1b - ورم >4 سم و ≤7 سم',
    'postop.pt2a': 'pT2a - ورم >7 سم و ≤10 سم',
    'postop.pt2b': 'pT2b - ورم >10 سم',
    'postop.pt3a': 'pT3a - امتداد للوريد الكلوي/الدهون',
    'postop.pt3b': 'pT3b - امتداد للوريد الأجوف تحت الحجاب',
    'postop.pt3c': 'pT3c - امتداد للوريد الأجوف فوق الحجاب',
    'postop.pt4': 'pT4 - غزو ما بعد لفافة جيروتا',
    'postop.pnx': 'pNX - لم يتم فحص العقد',
    'postop.pn0': 'pN0 - لا نقائل في العقد المفحوصة',
    'postop.pn1': 'pN1 - نقائل في العقد اللمفاوية',
    'postop.pmx': 'pMX - لا يمكن تقييم النقائل',
    'postop.pm0': 'pM0 - لا نقائل بعيدة',
    'postop.pm1': 'pM1 - نقائل بعيدة مؤكدة',

    // Actions
    'action.calculate': 'حساب المرحلة',
    'action.getRecommendations': 'الحصول على التوصيات',
    'action.save': 'حفظ الحالة',
    'action.export': 'تصدير PDF',
    'action.print': 'طباعة',
    'action.back': 'رجوع',
    'action.next': 'التالي',
    'action.reset': 'إعادة تعيين',

    // Settings
    'settings.language': 'اللغة',
    'settings.theme': 'المظهر',
    'settings.light': 'فاتح',
    'settings.dark': 'داكن',
    'settings.security': 'الأمان',
    'settings.enablePin': 'تفعيل رمز PIN',

    // References
    'ref.nccn': 'إرشادات NCCN',
    'ref.esmo': 'إرشادات ESMO',
    'ref.version': 'الإصدار',
    'ref.lastUpdated': 'آخر تحديث',

    // Misc
    'misc.or': 'أو',
    'misc.and': 'و',
    'misc.loading': 'جاري التحميل...',
    'misc.noData': 'لا توجد بيانات',
    'misc.required': 'مطلوب',
    'misc.optional': 'اختياري',
    'misc.years': 'سنة',
    'misc.cm': 'سم',
  },
  en: {
    // App
    'app.title': 'Medical Decision Support',
    'app.subtitle': 'Oncology Clinical Decision Support',
    'app.disclaimer': 'Important Notice',
    'app.disclaimer.text': 'This application is not a diagnostic tool and does not replace physician judgment. It is a clinical decision support system based solely on international oncology guidelines.',
    'app.disclaimer.accept': 'I Understand and Agree',

    // Navigation
    'nav.newCase': 'New Case',
    'nav.postOpCase': 'Post-Op Case',
    'nav.references': 'References',
    'nav.settings': 'Settings',

    // Cancer Types
    'cancer.select': 'Select Cancer Type',
    'cancer.kidney': 'Kidney Cancer',
    'cancer.kidney.desc': 'Renal Cell Carcinoma',
    'cancer.breast': 'Breast Cancer',
    'cancer.lung': 'Lung Cancer',
    'cancer.colorectal': 'Colorectal Cancer',
    'cancer.comingSoon': 'Coming Soon',

    // Patient Data
    'patient.data': 'Patient Data',
    'patient.id': 'Case ID',
    'patient.age': 'Age',
    'patient.gender': 'Gender',
    'patient.male': 'Male',
    'patient.female': 'Female',
    'patient.comorbidities': 'Comorbidities',

    // Tumor Data
    'tumor.data': 'Tumor Data',
    'tumor.size': 'Tumor Size',
    'tumor.grade': 'Grade',
    'tumor.histology': 'Histology',
    'tumor.clearCell': 'Clear Cell',
    'tumor.papillary': 'Papillary',
    'tumor.chromophobe': 'Chromophobe',
    'tumor.other': 'Other',

    // TNM Staging
    'tnm.title': 'TNM Classification',
    'tnm.t': 'Primary Tumor (T)',
    'tnm.n': 'Regional Lymph Nodes (N)',
    'tnm.m': 'Distant Metastasis (M)',
    'tnm.stage': 'Stage',

    // TNM Values
    'tnm.tx': 'TX - Primary tumor cannot be assessed',
    'tnm.t0': 'T0 - No evidence of primary tumor',
    'tnm.t1': 'T1 - Tumor ≤7 cm, limited to kidney',
    'tnm.t1a': 'T1a - Tumor ≤4 cm',
    'tnm.t1b': 'T1b - Tumor >4 cm and ≤7 cm',
    'tnm.t2': 'T2 - Tumor >7 cm, limited to kidney',
    'tnm.t2a': 'T2a - Tumor >7 cm and ≤10 cm',
    'tnm.t2b': 'T2b - Tumor >10 cm',
    'tnm.t3': 'T3 - Extends into major veins or perinephric tissues',
    'tnm.t3a': 'T3a - Renal vein or perinephric fat extension',
    'tnm.t3b': 'T3b - Vena cava below diaphragm',
    'tnm.t3c': 'T3c - Vena cava above diaphragm or wall invasion',
    'tnm.t4': 'T4 - Beyond Gerota fascia invasion',

    'tnm.nx': 'NX - Regional nodes cannot be assessed',
    'tnm.n0': 'N0 - No regional lymph node metastasis',
    'tnm.n1': 'N1 - Regional lymph node metastasis',

    'tnm.mx': 'MX - Distant metastasis cannot be assessed',
    'tnm.m0': 'M0 - No distant metastasis',
    'tnm.m1': 'M1 - Distant metastasis present',

    // Stages
    'stage.i': 'Stage I',
    'stage.ii': 'Stage II',
    'stage.iii': 'Stage III',
    'stage.iv': 'Stage IV',

    // Treatment
    'treatment.title': 'Treatment Recommendations',
    'treatment.neoadjuvant': 'Neoadjuvant Therapy',
    'treatment.neoadjuvant.desc': 'Treatment given before primary surgery',
    'treatment.adjuvant': 'Adjuvant Therapy',
    'treatment.adjuvant.desc': 'Treatment given after primary surgery',
    'treatment.surgery': 'Surgery',
    'treatment.targetedTherapy': 'Targeted Therapy',
    'treatment.immunotherapy': 'Immunotherapy',
    'treatment.surveillance': 'Active Surveillance',
    'treatment.indications': 'Indications',
    'treatment.contraindications': 'Contraindications',
    'treatment.warnings': 'Warnings',
    'treatment.notes': 'Physician Notes',

    // Pathology (Post-Op)
    'pathology.title': 'Pathology Results',
    'pathology.histology': 'Histology Type',
    'pathology.sarcomatoid': 'Sarcomatoid',
    'pathology.grade': 'Tumor Grade (ISUP/WHO)',
    'pathology.grade1': 'Grade 1 - Low',
    'pathology.grade2': 'Grade 2 - Low-Intermediate',
    'pathology.grade3': 'Grade 3 - High-Intermediate',
    'pathology.grade4': 'Grade 4 - High',
    'pathology.tumorSize': 'Actual Tumor Size',
    'pathology.margin': 'Surgical Margins',
    'pathology.marginNegative': 'Negative (Tumor-free)',
    'pathology.marginPositive': 'Positive (Tumor at margin)',
    'pathology.marginClose': 'Close (<1 mm)',
    'pathology.vascularInvasion': 'Vascular Invasion',
    'pathology.vascularInvasion.desc': 'Presence of tumor cells in blood vessels',
    'pathology.lymphInvasion': 'Lymphovascular Invasion',
    'pathology.lymphInvasion.desc': 'Presence of tumor cells in lymphatic vessels',
    'pathology.sarcomatoidFeatures': 'Sarcomatoid Features',
    'pathology.sarcomatoidFeatures.desc': 'Presence of sarcomatoid differentiation',
    'pathology.necrosis': 'Tumor Necrosis',
    'pathology.necrosis.desc': 'Presence of necrotic areas in tumor',

    // Pre-Op Data
    'preop.title': 'Pre-Operative Data',
    'preop.desc': 'Clinical information before surgery',
    'preop.clinicalStage': 'Clinical Stage',
    'preop.tumorSize': 'Pre-Op Tumor Size',
    'preop.ct': 'Clinical cT Classification',
    'preop.surgeryType': 'Surgery Type Performed',
    'preop.partial': 'Partial Nephrectomy',
    'preop.radical': 'Radical Nephrectomy',
    'preop.cytoreductive': 'Cytoreductive Nephrectomy',

    // Post-Op TNM
    'postop.ptnm.title': 'Pathological pTNM Classification',
    'postop.ptnm.desc': 'Final classification based on specimen examination',
    'postop.pt': 'Pathological Tumor (pT)',
    'postop.pn': 'Pathological Nodes (pN)',
    'postop.pm': 'Pathological Metastasis (pM)',
    'postop.pt1a': 'pT1a - Tumor ≤4 cm',
    'postop.pt1b': 'pT1b - Tumor >4 cm and ≤7 cm',
    'postop.pt2a': 'pT2a - Tumor >7 cm and ≤10 cm',
    'postop.pt2b': 'pT2b - Tumor >10 cm',
    'postop.pt3a': 'pT3a - Renal vein/perinephric fat extension',
    'postop.pt3b': 'pT3b - Vena cava below diaphragm',
    'postop.pt3c': 'pT3c - Vena cava above diaphragm',
    'postop.pt4': 'pT4 - Beyond Gerota fascia',
    'postop.pnx': 'pNX - Nodes not examined',
    'postop.pn0': 'pN0 - No metastasis in examined nodes',
    'postop.pn1': 'pN1 - Lymph node metastasis',
    'postop.pmx': 'pMX - Metastasis cannot be assessed',
    'postop.pm0': 'pM0 - No distant metastasis',
    'postop.pm1': 'pM1 - Distant metastasis confirmed',

    // Actions
    'action.calculate': 'Calculate Stage',
    'action.getRecommendations': 'Get Recommendations',
    'action.save': 'Save Case',
    'action.export': 'Export PDF',
    'action.print': 'Print',
    'action.back': 'Back',
    'action.next': 'Next',
    'action.reset': 'Reset',

    // Settings
    'settings.language': 'Language',
    'settings.theme': 'Theme',
    'settings.light': 'Light',
    'settings.dark': 'Dark',
    'settings.security': 'Security',
    'settings.enablePin': 'Enable PIN Lock',

    // References
    'ref.nccn': 'NCCN Guidelines',
    'ref.esmo': 'ESMO Guidelines',
    'ref.version': 'Version',
    'ref.lastUpdated': 'Last Updated',

    // Misc
    'misc.or': 'or',
    'misc.and': 'and',
    'misc.loading': 'Loading...',
    'misc.noData': 'No data available',
    'misc.required': 'Required',
    'misc.optional': 'Optional',
    'misc.years': 'years',
    'misc.cm': 'cm',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('app-language');
    return (saved as Language) || 'ar';
  });

  const direction: Direction = language === 'ar' ? 'rtl' : 'ltr';

  useEffect(() => {
    localStorage.setItem('app-language', language);
    document.documentElement.dir = direction;
    document.documentElement.lang = language;
  }, [language, direction]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, direction, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
