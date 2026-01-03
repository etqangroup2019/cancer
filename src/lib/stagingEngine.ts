import { TNMData, PathologyData, PostOpTNMData } from '@/contexts/CaseContext';

export interface StagingResult {
  stage: string;
  stageNumeric: number;
  explanation: string;
  factors: string[];
}

// Kidney Cancer (RCC) Staging based on AJCC 8th Edition
export function calculateKidneyStage(tnm: TNMData): StagingResult | null {
  const { t, n, m } = tnm;
  
  if (!t || !n || !m) {
    return null;
  }

  // Normalize T value
  const tValue = t.toLowerCase();
  const nValue = n.toLowerCase();
  const mValue = m.toLowerCase();

  // Stage IV: Any T, Any N, M1
  if (mValue === 'm1') {
    return {
      stage: 'IV',
      stageNumeric: 4,
      explanation: 'Stage IV due to presence of distant metastasis (M1)',
      factors: [
        'Distant metastasis present',
        'Regardless of primary tumor size',
        'Regardless of lymph node involvement',
      ],
    };
  }

  // Stage IV: T4, Any N, M0
  if (tValue === 't4' && mValue === 'm0') {
    return {
      stage: 'IV',
      stageNumeric: 4,
      explanation: 'Stage IV due to tumor invasion beyond Gerota fascia (T4)',
      factors: [
        'Tumor extends beyond Gerota fascia',
        'May involve adjacent organs',
        'Ipsilateral adrenal gland involvement via contiguous extension',
      ],
    };
  }

  // Stage III: T1-T3, N1, M0
  if (nValue === 'n1' && mValue === 'm0') {
    return {
      stage: 'III',
      stageNumeric: 3,
      explanation: 'Stage III due to regional lymph node metastasis (N1)',
      factors: [
        'Regional lymph node metastasis present',
        'No distant metastasis',
        `Primary tumor classification: ${t.toUpperCase()}`,
      ],
    };
  }

  // Stage III: T3, N0, M0
  if (tValue.startsWith('t3') && nValue === 'n0' && mValue === 'm0') {
    const t3Factors = [];
    if (tValue === 't3a') {
      t3Factors.push('Tumor extends into renal vein or perinephric fat');
    } else if (tValue === 't3b') {
      t3Factors.push('Tumor extends into vena cava below diaphragm');
    } else if (tValue === 't3c') {
      t3Factors.push('Tumor extends into vena cava above diaphragm or invades vena cava wall');
    } else {
      t3Factors.push('Tumor extends into major veins or perinephric tissues');
    }
    
    return {
      stage: 'III',
      stageNumeric: 3,
      explanation: `Stage III due to tumor extension beyond kidney (${t.toUpperCase()})`,
      factors: [
        ...t3Factors,
        'No regional lymph node metastasis',
        'No distant metastasis',
      ],
    };
  }

  // Stage II: T2, N0, M0
  if (tValue.startsWith('t2') && nValue === 'n0' && mValue === 'm0') {
    return {
      stage: 'II',
      stageNumeric: 2,
      explanation: `Stage II: Large tumor (>7 cm) limited to kidney (${t.toUpperCase()})`,
      factors: [
        tValue === 't2a' ? 'Tumor >7 cm and ≤10 cm' : 'Tumor >10 cm',
        'Tumor limited to kidney',
        'No regional lymph node metastasis',
        'No distant metastasis',
      ],
    };
  }

  // Stage I: T1, N0, M0
  if (tValue.startsWith('t1') && nValue === 'n0' && mValue === 'm0') {
    return {
      stage: 'I',
      stageNumeric: 1,
      explanation: `Stage I: Small tumor (≤7 cm) limited to kidney (${t.toUpperCase()})`,
      factors: [
        tValue === 't1a' ? 'Tumor ≤4 cm' : 'Tumor >4 cm and ≤7 cm',
        'Tumor limited to kidney',
        'No regional lymph node metastasis',
        'No distant metastasis',
      ],
    };
  }

  // Default case for TX, T0, or unrecognized combinations
  return {
    stage: 'Unknown',
    stageNumeric: 0,
    explanation: 'Unable to determine stage with provided TNM values',
    factors: [
      `T: ${t.toUpperCase()}`,
      `N: ${n.toUpperCase()}`,
      `M: ${m.toUpperCase()}`,
      'Please verify TNM classification',
    ],
  };
}

// Post-operative pathological staging for Kidney Cancer
export function calculatePostOpKidneyStage(
  postOpTNM: PostOpTNMData,
  pathology?: PathologyData
): StagingResult | null {
  const { pT, pN, pM } = postOpTNM;
  
  if (!pT || !pN) {
    return null;
  }

  const tValue = pT.toLowerCase().replace('pt', 't');
  const nValue = pN.toLowerCase().replace('pn', 'n');
  const mValue = (pM || 'pm0').toLowerCase().replace('pm', 'm');

  // Build factors list including pathology details
  const pathologyFactors: string[] = [];
  if (pathology) {
    if (pathology.histology) {
      pathologyFactors.push(`Histology: ${pathology.histology}`);
    }
    if (pathology.grade) {
      pathologyFactors.push(`Grade: ${pathology.grade}/4 (ISUP/WHO)`);
    }
    if (pathology.marginStatus === 'positive') {
      pathologyFactors.push('⚠️ Positive surgical margins');
    }
    if (pathology.vascularInvasion) {
      pathologyFactors.push('⚠️ Vascular invasion present');
    }
    if (pathology.lymphNodeInvasion) {
      pathologyFactors.push('⚠️ Lymphovascular invasion');
    }
    if (pathology.sarcomatoidFeatures) {
      pathologyFactors.push('⚠️ Sarcomatoid features present');
    }
    if (pathology.necrosis) {
      pathologyFactors.push('Tumor necrosis present');
    }
  }

  // Stage IV: Any pT, Any pN, pM1
  if (mValue === 'm1') {
    return {
      stage: 'IV',
      stageNumeric: 4,
      explanation: 'Stage IV (Pathological) due to distant metastasis (pM1)',
      factors: [
        'Distant metastasis confirmed pathologically',
        `Primary tumor: ${pT}`,
        `Lymph nodes: ${pN}`,
        ...pathologyFactors,
      ],
    };
  }

  // Stage IV: pT4, Any pN, pM0
  if (tValue === 't4' && mValue === 'm0') {
    return {
      stage: 'IV',
      stageNumeric: 4,
      explanation: 'Stage IV (Pathological) due to tumor beyond Gerota fascia (pT4)',
      factors: [
        'Tumor extends beyond Gerota fascia',
        `Lymph nodes: ${pN}`,
        ...pathologyFactors,
      ],
    };
  }

  // Stage III: Any pT, pN1, pM0
  if (nValue === 'n1' && mValue === 'm0') {
    return {
      stage: 'III',
      stageNumeric: 3,
      explanation: 'Stage III (Pathological) due to lymph node metastasis (pN1)',
      factors: [
        'Regional lymph node metastasis confirmed',
        `Primary tumor: ${pT}`,
        ...pathologyFactors,
      ],
    };
  }

  // Stage III: pT3, pN0, pM0
  if (tValue.startsWith('t3') && nValue === 'n0' && mValue === 'm0') {
    const t3Factors = [];
    if (tValue === 't3a') {
      t3Factors.push('Tumor in renal vein or perinephric fat (pT3a)');
    } else if (tValue === 't3b') {
      t3Factors.push('Tumor in vena cava below diaphragm (pT3b)');
    } else if (tValue === 't3c') {
      t3Factors.push('Tumor in vena cava above diaphragm (pT3c)');
    }
    
    return {
      stage: 'III',
      stageNumeric: 3,
      explanation: `Stage III (Pathological) - ${pT}`,
      factors: [
        ...t3Factors,
        'No lymph node metastasis',
        'No distant metastasis',
        ...pathologyFactors,
      ],
    };
  }

  // Stage II: pT2, pN0, pM0
  if (tValue.startsWith('t2') && nValue === 'n0' && mValue === 'm0') {
    return {
      stage: 'II',
      stageNumeric: 2,
      explanation: `Stage II (Pathological) - Large tumor >7cm (${pT})`,
      factors: [
        tValue === 't2a' ? 'Tumor >7 cm and ≤10 cm' : 'Tumor >10 cm',
        'Tumor limited to kidney',
        'No lymph node metastasis',
        ...pathologyFactors,
      ],
    };
  }

  // Stage I: pT1, pN0, pM0
  if (tValue.startsWith('t1') && nValue === 'n0' && mValue === 'm0') {
    return {
      stage: 'I',
      stageNumeric: 1,
      explanation: `Stage I (Pathological) - Small tumor ≤7cm (${pT})`,
      factors: [
        tValue === 't1a' ? 'Tumor ≤4 cm' : 'Tumor >4 cm and ≤7 cm',
        'Tumor limited to kidney',
        'No lymph node metastasis',
        ...pathologyFactors,
      ],
    };
  }

  // Default
  return {
    stage: 'Unknown',
    stageNumeric: 0,
    explanation: 'Unable to determine pathological stage',
    factors: [
      `pT: ${pT}`,
      `pN: ${pN}`,
      `pM: ${pM || 'Not specified'}`,
      ...pathologyFactors,
    ],
  };
}

export function getStageColor(stageNumeric: number): string {
  switch (stageNumeric) {
    case 1:
      return 'success';
    case 2:
      return 'info';
    case 3:
      return 'warning';
    case 4:
      return 'destructive';
    default:
      return 'muted';
  }
}
