import { CaseData } from '@/contexts/CaseContext';
import { StagingResult } from './stagingEngine';

export interface TreatmentOption {
  id: string;
  type: 'surgery' | 'targetedTherapy' | 'immunotherapy' | 'surveillance' | 'combination';
  name: {
    en: string;
    ar: string;
  };
  description: {
    en: string;
    ar: string;
  };
  indications: {
    en: string[];
    ar: string[];
  };
  contraindications: {
    en: string[];
    ar: string[];
  };
  warnings: {
    en: string[];
    ar: string[];
  };
  notes: {
    en: string[];
    ar: string[];
  };
  references: {
    source: 'NCCN' | 'ESMO' | 'WHO';
    version: string;
    year: number;
  }[];
}

export interface TreatmentRecommendation {
  neoadjuvant: TreatmentOption[];
  adjuvant: TreatmentOption[];
  primaryTreatment: TreatmentOption[];
  alternativeOptions: TreatmentOption[];
}

// Kidney Cancer Treatment Options Database
const kidneyTreatments: Record<string, TreatmentOption> = {
  partialNephrectomy: {
    id: 'partial-nephrectomy',
    type: 'surgery',
    name: {
      en: 'Partial Nephrectomy',
      ar: 'استئصال جزئي للكلية',
    },
    description: {
      en: 'Surgical removal of the tumor while preserving the remaining healthy kidney tissue',
      ar: 'استئصال جراحي للورم مع الحفاظ على أنسجة الكلى السليمة المتبقية',
    },
    indications: {
      en: [
        'T1a tumors (≤4 cm)',
        'T1b tumors (4-7 cm) when technically feasible',
        'Solitary kidney',
        'Bilateral tumors',
        'Pre-existing renal insufficiency',
      ],
      ar: [
        'أورام T1a (≤4 سم)',
        'أورام T1b (4-7 سم) عند إمكانية التنفيذ تقنياً',
        'كلية وحيدة',
        'أورام ثنائية الجانب',
        'قصور كلوي موجود مسبقاً',
      ],
    },
    contraindications: {
      en: [
        'Tumor in unfavorable location (central, hilar)',
        'Multiple tumors in same kidney',
        'Patient unable to tolerate surgery',
      ],
      ar: [
        'ورم في موقع غير مناسب (مركزي، سري)',
        'أورام متعددة في نفس الكلية',
        'مريض غير قادر على تحمل الجراحة',
      ],
    },
    warnings: {
      en: [
        'Risk of positive surgical margins',
        'Potential for local recurrence',
        'Technical expertise required',
      ],
      ar: [
        'خطر وجود هوامش جراحية إيجابية',
        'احتمال التكرار الموضعي',
        'تتطلب خبرة تقنية',
      ],
    },
    notes: {
      en: [
        'Preferred approach for T1 tumors when technically feasible',
        'Equivalent oncological outcomes to radical nephrectomy',
        'Better preservation of renal function',
      ],
      ar: [
        'النهج المفضل لأورام T1 عند إمكانية التنفيذ تقنياً',
        'نتائج أورام مكافئة لاستئصال الكلية الجذري',
        'حفظ أفضل لوظائف الكلى',
      ],
    },
    references: [
      { source: 'NCCN', version: '4.2024', year: 2024 },
      { source: 'ESMO', version: '2024', year: 2024 },
    ],
  },
  radicalNephrectomy: {
    id: 'radical-nephrectomy',
    type: 'surgery',
    name: {
      en: 'Radical Nephrectomy',
      ar: 'استئصال الكلية الجذري',
    },
    description: {
      en: 'Complete surgical removal of the kidney, surrounding fat, and Gerota fascia',
      ar: 'استئصال جراحي كامل للكلية والدهون المحيطة ولفافة جيروتا',
    },
    indications: {
      en: [
        'T2 tumors (>7 cm)',
        'T3 tumors with vascular extension',
        'T1 tumors not amenable to partial nephrectomy',
        'Locally advanced disease',
      ],
      ar: [
        'أورام T2 (>7 سم)',
        'أورام T3 مع امتداد وعائي',
        'أورام T1 غير قابلة لاستئصال جزئي',
        'مرض متقدم موضعياً',
      ],
    },
    contraindications: {
      en: [
        'Solitary kidney (relative)',
        'Severe renal insufficiency (relative)',
        'Patient unfit for major surgery',
      ],
      ar: [
        'كلية وحيدة (نسبي)',
        'قصور كلوي شديد (نسبي)',
        'مريض غير مناسب لجراحة كبرى',
      ],
    },
    warnings: {
      en: [
        'Permanent loss of renal unit',
        'Risk of chronic kidney disease',
        'Adrenalectomy may not always be necessary',
      ],
      ar: [
        'فقدان دائم للوحدة الكلوية',
        'خطر مرض الكلى المزمن',
        'استئصال الغدة الكظرية قد لا يكون ضرورياً دائماً',
      ],
    },
    notes: {
      en: [
        'Consider adrenal-sparing approach if not involved',
        'Lymph node dissection for staging purposes',
        'Thrombectomy required for vena cava involvement',
      ],
      ar: [
        'النظر في نهج الحفاظ على الغدة الكظرية إذا لم تكن مصابة',
        'تشريح العقد اللمفاوية لأغراض التصنيف',
        'استئصال الخثرة مطلوب لإصابة الوريد الأجوف',
      ],
    },
    references: [
      { source: 'NCCN', version: '4.2024', year: 2024 },
      { source: 'ESMO', version: '2024', year: 2024 },
    ],
  },
  activeSurveillance: {
    id: 'active-surveillance',
    type: 'surveillance',
    name: {
      en: 'Active Surveillance',
      ar: 'المراقبة النشطة',
    },
    description: {
      en: 'Close monitoring with imaging and clinical assessment without immediate intervention',
      ar: 'مراقبة دقيقة بالتصوير والتقييم السريري دون تدخل فوري',
    },
    indications: {
      en: [
        'Small renal masses (≤4 cm)',
        'Elderly patients with limited life expectancy',
        'Significant comorbidities increasing surgical risk',
        'Patient preference',
      ],
      ar: [
        'كتل كلوية صغيرة (≤4 سم)',
        'مرضى كبار السن مع متوسط عمر متوقع محدود',
        'أمراض مصاحبة كبيرة تزيد من مخاطر الجراحة',
        'تفضيل المريض',
      ],
    },
    contraindications: {
      en: [
        'Young patients with long life expectancy',
        'Tumors showing rapid growth',
        'Patient anxiety affecting quality of life',
      ],
      ar: [
        'مرضى شباب مع متوسط عمر متوقع طويل',
        'أورام تظهر نمواً سريعاً',
        'قلق المريض يؤثر على جودة الحياة',
      ],
    },
    warnings: {
      en: [
        'Risk of disease progression',
        'Requires reliable follow-up',
        '1-2% risk of metastatic progression',
      ],
      ar: [
        'خطر تقدم المرض',
        'يتطلب متابعة موثوقة',
        'خطر 1-2% للتقدم النقيلي',
      ],
    },
    notes: {
      en: [
        'Follow-up imaging every 3-6 months initially',
        'Consider intervention if growth rate >0.5 cm/year',
        'Can transition to active treatment if needed',
      ],
      ar: [
        'تصوير متابعة كل 3-6 أشهر مبدئياً',
        'النظر في التدخل إذا كان معدل النمو >0.5 سم/سنة',
        'يمكن الانتقال للعلاج النشط إذا لزم الأمر',
      ],
    },
    references: [
      { source: 'NCCN', version: '4.2024', year: 2024 },
    ],
  },
  pembrolizumab: {
    id: 'pembrolizumab-adjuvant',
    type: 'immunotherapy',
    name: {
      en: 'Pembrolizumab (Adjuvant)',
      ar: 'بيمبروليزوماب (مساعد)',
    },
    description: {
      en: 'PD-1 inhibitor immunotherapy given after surgery to reduce recurrence risk',
      ar: 'علاج مناعي مثبط PD-1 يُعطى بعد الجراحة لتقليل خطر التكرار',
    },
    indications: {
      en: [
        'Clear cell RCC after nephrectomy',
        'Intermediate-high or high risk of recurrence',
        'pT2 Grade 4 or sarcomatoid',
        'pT3 or higher',
        'pN+ (node positive)',
        'M1 NED after metastasectomy',
      ],
      ar: [
        'سرطان خلايا صافية بعد استئصال الكلية',
        'خطر متوسط-عالي أو عالي للتكرار',
        'pT2 درجة 4 أو ساركوماتويد',
        'pT3 أو أعلى',
        'pN+ (إيجابي العقد)',
        'M1 NED بعد استئصال النقائل',
      ],
    },
    contraindications: {
      en: [
        'Active autoimmune disease',
        'History of severe immune-related adverse events',
        'Organ transplant recipients',
        'Non-clear cell histology',
      ],
      ar: [
        'مرض مناعي ذاتي نشط',
        'تاريخ أحداث ضارة مناعية شديدة',
        'متلقو زراعة الأعضاء',
        'نسيج غير خلايا صافية',
      ],
    },
    warnings: {
      en: [
        'Immune-related adverse events (pneumonitis, colitis, hepatitis)',
        'Thyroid dysfunction common',
        'May require corticosteroid management',
        'Regular monitoring required',
      ],
      ar: [
        'أحداث ضارة مناعية (التهاب رئوي، التهاب قولون، التهاب كبد)',
        'خلل الغدة الدرقية شائع',
        'قد يتطلب إدارة بالكورتيكوستيرويد',
        'مراقبة منتظمة مطلوبة',
      ],
    },
    notes: {
      en: [
        'Duration: Up to 1 year (17 cycles)',
        'Dose: 200 mg IV every 3 weeks or 400 mg every 6 weeks',
        'Based on KEYNOTE-564 trial',
        'Significant improvement in disease-free survival',
      ],
      ar: [
        'المدة: حتى سنة واحدة (17 دورة)',
        'الجرعة: 200 ملغ وريدياً كل 3 أسابيع أو 400 ملغ كل 6 أسابيع',
        'بناءً على تجربة KEYNOTE-564',
        'تحسن كبير في البقاء دون مرض',
      ],
    },
    references: [
      { source: 'NCCN', version: '4.2024', year: 2024 },
      { source: 'ESMO', version: '2024', year: 2024 },
    ],
  },
  systemicTherapyAdvanced: {
    id: 'systemic-therapy-advanced',
    type: 'combination',
    name: {
      en: 'First-Line Systemic Therapy',
      ar: 'العلاج الجهازي الخط الأول',
    },
    description: {
      en: 'Combination immunotherapy or targeted therapy for metastatic disease',
      ar: 'علاج مناعي مركب أو علاج موجه للمرض النقيلي',
    },
    indications: {
      en: [
        'Stage IV metastatic RCC',
        'Unresectable locally advanced disease',
        'Clear cell histology (preferred regimens)',
      ],
      ar: [
        'المرحلة الرابعة سرطان الكلى النقيلي',
        'مرض متقدم موضعياً غير قابل للاستئصال',
        'نسيج خلايا صافية (الأنظمة المفضلة)',
      ],
    },
    contraindications: {
      en: [
        'Poor performance status (ECOG ≥3)',
        'Active severe infections',
        'Uncontrolled hypertension (for TKIs)',
      ],
      ar: [
        'حالة أداء ضعيفة (ECOG ≥3)',
        'عدوى نشطة شديدة',
        'ارتفاع ضغط دم غير مسيطر عليه (لمثبطات TKI)',
      ],
    },
    warnings: {
      en: [
        'Immune-related adverse events with immunotherapy',
        'Hypertension and cardiac events with TKIs',
        'Regular monitoring of liver and thyroid function',
      ],
      ar: [
        'أحداث ضارة مناعية مع العلاج المناعي',
        'ارتفاع ضغط الدم وأحداث قلبية مع TKI',
        'مراقبة منتظمة لوظائف الكبد والغدة الدرقية',
      ],
    },
    notes: {
      en: [
        'Preferred: Ipilimumab + Nivolumab, Pembrolizumab + Axitinib/Lenvatinib',
        'Alternative: Cabozantinib, Sunitinib (monotherapy)',
        'Consider IMDC risk stratification',
        'Cytoreductive nephrectomy may be considered in selected patients',
      ],
      ar: [
        'المفضل: إيبيليموماب + نيفولوماب، بيمبروليزوماب + أكسيتينيب/لينفاتينيب',
        'بديل: كابوزانتينيب، سونيتينيب (علاج أحادي)',
        'النظر في تقسيم مخاطر IMDC',
        'استئصال الكلية السيتوريدوكتيف قد يُنظر فيه في مرضى مختارين',
      ],
    },
    references: [
      { source: 'NCCN', version: '4.2024', year: 2024 },
      { source: 'ESMO', version: '2024', year: 2024 },
    ],
  },
};

// SIOP-RTSG 2016 Wilms Tumor Treatment Options
const wilmsTreatments: Record<string, TreatmentOption> = {
  preOpVA: {
    id: 'pre-op-va',
    type: 'combination',
    name: { en: 'Pre-op VA (Vincristine + Actinomycin D)', ar: 'علاج VA قبل العملية (فينكريستين + أكتينومايسين د)' },
    description: { en: 'Standard 4-week pre-operative chemotherapy for localized tumors', ar: 'علاج كيماوي قياسي لمدة 4 أسابيع قبل العملية للأورام الموضعية' },
    indications: { en: ['Localized pediatric renal tumors', 'Patient age > 6 months'], ar: ['أورام الكلى الموضعية عند الأطفال', 'عمر المريض > 6 أشهر'] },
    contraindications: { en: ['Patient < 6 months old', 'Suspected clear cell sarcoma or rhabdoid tumor'], ar: ['مريض عمره أقل من 6 أشهر', 'اشتباه في ساركوما الخلايا الصافية أو ورم رابدويد'] },
    warnings: { en: ['Vincristine neurotoxicity', 'Actinomycin D liver toxicity'], ar: ['سمية عصبية من الفينكريستين', 'سمية كبدية من الأكتينومايسين د'] },
    notes: { en: ['Standard for SIOP protocols', 'Goal is tumor shrinkage to reduce rupture risk'], ar: ['معيار بروتوكولات SIOP', 'الهدف هو تصغير الورم لتقليل خطر الانفجار'] },
    references: [{ source: 'WHO', version: 'SIOP-RTSG 2016', year: 2016 }],
  },
  postOpVA_9w: {
    id: 'post-op-va-9w',
    type: 'combination',
    name: { en: 'Post-op VA (9 Weeks)', ar: 'علاج VA بعد العملية (9 أسابيع)' },
    description: { en: 'Short courses of Vincristine and Actinomycin D', ar: 'دورات قصيرة من فينكريستين وأكتينومايسين د' },
    indications: { en: ['Stage I Intermediate Risk', 'Stage I Low Risk (some cases)'], ar: ['المرحلة الأولى خطر متوسط', 'المرحلة الأولى خطر منخفض (في بعض الحالات)'] },
    contraindications: { en: [], ar: [] },
    warnings: { en: [], ar: [] },
    notes: { en: ['Reduced intensity for favorable stages'], ar: ['كثافة منخفضة للمراحل المفضلة'] },
    references: [{ source: 'WHO', version: 'SIOP-RTSG 2016', year: 2016 }],
  },
  postOpVAD_28w: {
    id: 'post-op-vad-28w',
    type: 'combination',
    name: { en: 'Post-op VAD (28 Weeks)', ar: 'علاج VAD بعد العملية (28 أسبوع)' },
    description: { en: 'Vincristine + Actinomycin D + Doxorubicin intensified regimen', ar: 'نظام مكثف من فينكريستين + أكتينومايسين د + دوكسوروبيسين' },
    indications: { en: ['Stage III Intermediate Risk', 'Stage II/III High Risk'], ar: ['المرحلة الثالثة خطر متوسط', 'المرحلة الثانية/الثالثة خطر عالٍ'] },
    contraindications: { en: [], ar: [] },
    warnings: { en: ['Cardiotoxicity from Doxorubicin'], ar: ['سمية لقلب من دوكسوروبيسين'] },
    notes: { en: ['Requires cardiac monitoring (Echo)'], ar: ['يتطلب مراقبة للقلب (إيكو)'] },
    references: [{ source: 'WHO', version: 'SIOP-RTSG 2016', year: 2016 }],
  },
  radiotherapyAbdominal: {
    id: 'radiotherapy-abdominal',
    type: 'combination', // Using combination as a catch-all for now
    name: { en: 'Abdominal Radiotherapy', ar: 'العلاج الإشعاعي للبطن' },
    description: { en: 'Local radiation to the tumor bed', ar: 'إشعاع موضعي لمكان الورم' },
    indications: { en: ['Stage III Intermediate Risk', 'Any Stage High Risk (except Stage I LR)'], ar: ['المرحلة الثالثة خطر متوسط', 'أي مرحلة خطر عالٍ (عدا المرحلة الأولى منخفضة الخطر)'] },
    contraindications: { en: [], ar: [] },
    warnings: { en: ['Late effects on growth and secondary malignancies'], ar: ['تأثيرات متأخرة على النمو وأورام ثانوية'] },
    notes: { en: ['Flank radiation or whole abdomen if diffuse contamination'], ar: ['إشعاع للجنب أو كامل البطن في حال التلوث المنتشر'] },
    references: [{ source: 'WHO', version: 'SIOP-RTSG 2016', year: 2016 }],
  },
};

export function getWilmsTreatmentRecommendations(
  caseData: CaseData,
  staging: StagingResult
): TreatmentRecommendation {
  const recommendation: TreatmentRecommendation = {
    neoadjuvant: [],
    adjuvant: [],
    primaryTreatment: [],
    alternativeOptions: [],
  };

  const { stageNumeric } = staging;
  const pathology = caseData.pathology;
  const histology = pathology?.histology;

  // Pre-operative is standard for SIOP unless age < 6m
  recommendation.neoadjuvant.push(wilmsTreatments.preOpVA);

  // Post-operative decisions
  if (stageNumeric === 1) {
    if (histology === 'wilms-low') {
      recommendation.primaryTreatment.push({ ...wilmsTreatments.postOpVA_9w, name: { en: 'Observation or 4w VA', ar: 'الملاحظة أو 4 أسابيع VA' } });
    } else {
      recommendation.adjuvant.push(wilmsTreatments.postOpVA_9w);
    }
  } else if (stageNumeric === 2) {
    if (histology === 'wilms-high') {
      recommendation.adjuvant.push(wilmsTreatments.postOpVAD_28w);
      recommendation.adjuvant.push(wilmsTreatments.radiotherapyAbdominal);
    } else {
      recommendation.adjuvant.push(wilmsTreatments.postOpVA_9w);
    }
  } else if (stageNumeric === 3) {
    recommendation.adjuvant.push(wilmsTreatments.postOpVAD_28w);
    recommendation.adjuvant.push(wilmsTreatments.radiotherapyAbdominal);
  } else if (stageNumeric === 4) {
    recommendation.adjuvant.push(wilmsTreatments.postOpVAD_28w);
    // Plus pulmonary RT if lung mets
  }

  return recommendation;
}


export function getKidneyTreatmentRecommendations(
  caseData: CaseData,
  staging: StagingResult
): TreatmentRecommendation {
  const recommendation: TreatmentRecommendation = {
    neoadjuvant: [],
    adjuvant: [],
    primaryTreatment: [],
    alternativeOptions: [],
  };

  const { stageNumeric } = staging;
  const histology = caseData.tumor.histology;
  const grade = caseData.tumor.grade;
  const tValue = caseData.tnm.t?.toLowerCase() || '';

  // Stage I
  if (stageNumeric === 1) {
    if (tValue === 't1a') {
      recommendation.primaryTreatment.push(kidneyTreatments.partialNephrectomy);
      recommendation.alternativeOptions.push(kidneyTreatments.activeSurveillance);
    } else {
      recommendation.primaryTreatment.push(kidneyTreatments.partialNephrectomy);
      recommendation.alternativeOptions.push(kidneyTreatments.radicalNephrectomy);
    }
  }

  // Stage II
  if (stageNumeric === 2) {
    recommendation.primaryTreatment.push(kidneyTreatments.radicalNephrectomy);
    recommendation.alternativeOptions.push(kidneyTreatments.partialNephrectomy);

    // Adjuvant for high-grade
    if (histology === 'clearCell' && grade && grade >= 3) {
      recommendation.adjuvant.push(kidneyTreatments.pembrolizumab);
    }
  }

  // Stage III
  if (stageNumeric === 3) {
    recommendation.primaryTreatment.push(kidneyTreatments.radicalNephrectomy);

    // Adjuvant pembrolizumab for clear cell
    if (histology === 'clearCell') {
      recommendation.adjuvant.push(kidneyTreatments.pembrolizumab);
    }
  }

  // Stage IV
  if (stageNumeric === 4) {
    recommendation.primaryTreatment.push(kidneyTreatments.systemicTherapyAdvanced);

    // Cytoreductive nephrectomy as alternative in selected cases
    recommendation.alternativeOptions.push(kidneyTreatments.radicalNephrectomy);
  }

  return recommendation;
}

// Post-operative treatment recommendations based on pathology
export function getPostOpTreatmentRecommendations(
  caseData: CaseData,
  staging: StagingResult
): TreatmentRecommendation {
  const recommendation: TreatmentRecommendation = {
    neoadjuvant: [],
    adjuvant: [],
    primaryTreatment: [],
    alternativeOptions: [],
  };

  const { stageNumeric } = staging;
  const pathology = caseData.pathology;
  const histology = pathology?.histology;
  const grade = pathology?.grade;
  const pT = caseData.postOpTNM?.pT?.toLowerCase() || '';

  // High-risk features that warrant adjuvant therapy
  const hasHighRiskFeatures =
    pathology?.sarcomatoidFeatures ||
    pathology?.vascularInvasion ||
    pathology?.marginStatus === 'positive' ||
    (grade && grade >= 3);

  // Stage I with high-risk features
  if (stageNumeric === 1) {
    if (hasHighRiskFeatures && histology === 'clearCell') {
      // Consider adjuvant for high-risk pT1 with adverse features
      recommendation.adjuvant.push(kidneyTreatments.pembrolizumab);
      recommendation.alternativeOptions.push(kidneyTreatments.activeSurveillance);
    } else {
      recommendation.primaryTreatment.push(kidneyTreatments.activeSurveillance);
    }
  }

  // Stage II - Adjuvant based on KEYNOTE-564 criteria
  if (stageNumeric === 2) {
    if (histology === 'clearCell') {
      // pT2 Grade 4 or sarcomatoid features
      if (grade === 4 || pathology?.sarcomatoidFeatures) {
        recommendation.adjuvant.push(kidneyTreatments.pembrolizumab);
      } else if (grade && grade >= 3) {
        // pT2 Grade 3 - consider adjuvant
        recommendation.adjuvant.push(kidneyTreatments.pembrolizumab);
        recommendation.alternativeOptions.push(kidneyTreatments.activeSurveillance);
      } else {
        recommendation.primaryTreatment.push(kidneyTreatments.activeSurveillance);
      }
    } else {
      // Non-clear cell - surveillance preferred
      recommendation.primaryTreatment.push(kidneyTreatments.activeSurveillance);
    }
  }

  // Stage III - Strong indication for adjuvant
  if (stageNumeric === 3) {
    if (histology === 'clearCell') {
      recommendation.adjuvant.push(kidneyTreatments.pembrolizumab);
    } else {
      // Non-clear cell - consider clinical trial or surveillance
      recommendation.primaryTreatment.push(kidneyTreatments.activeSurveillance);
    }
  }

  // Stage IV (M1 NED after metastasectomy or positive margins)
  if (stageNumeric === 4) {
    if (histology === 'clearCell') {
      recommendation.adjuvant.push(kidneyTreatments.pembrolizumab);
      recommendation.alternativeOptions.push(kidneyTreatments.systemicTherapyAdvanced);
    } else {
      recommendation.primaryTreatment.push(kidneyTreatments.systemicTherapyAdvanced);
    }
  }

  return recommendation;
}
