import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface PatientData {
  caseId: string;
  age: number | null;
  gender: 'male' | 'female' | null;
  comorbidities: string[];
}

export interface TumorData {
  size: number | null;
  grade: 1 | 2 | 3 | 4 | null;
  histology: 'clearCell' | 'papillary' | 'chromophobe' | 'other' | null;
}

export interface TNMData {
  t: string | null;
  n: string | null;
  m: string | null;
}

export interface PathologyData {
  histology: 'clearCell' | 'papillary' | 'chromophobe' | 'sarcomatoid' | 'other' |
  'wilms-low' | 'wilms-intermediate' | 'wilms-high' | 'mesoblastic' | null;
  grade: 1 | 2 | 3 | 4 | null;
  tumorSize: number | null;
  marginStatus: 'negative' | 'positive' | 'close' | null;
  vascularInvasion: boolean;
  lymphNodeInvasion: boolean;
  sarcomatoidFeatures: boolean;
  necrosis: boolean;
  // Pediatric/Wilms specific
  isRuptured?: boolean;
  isBilateral?: boolean;
  wilmsType?: 'necrotic' | 'epithelial' | 'stromal' | 'mixed' | 'regressive' | 'blastemal' | 'anaplastic' | null;
}

export interface PreOpData {
  clinicalStage: string | null;
  tumorSize: number | null;
  cT: string | null;
  surgeryType: 'partial' | 'radical' | 'cytoreductive' | null;
}

export interface PostOpTNMData {
  pT: string | null;
  pN: string | null;
  pM: string | null;
}

export interface CaseData {
  id: string;
  caseType: 'primary' | 'postOp';
  cancerType: 'kidney' | 'wilms' | null;
  patient: PatientData;
  tumor: TumorData;
  tnm: TNMData;
  // Post-op specific data
  pathology?: PathologyData;
  preOp?: PreOpData;
  postOpTNM?: PostOpTNMData;
  stage: string | null;
  createdAt: Date;
  updatedAt: Date;
}

interface CaseContextType {
  currentCase: CaseData | null;
  savedCases: CaseData[];
  createNewCase: () => void;
  updatePatientData: (data: Partial<PatientData>) => void;
  updateTumorData: (data: Partial<TumorData>) => void;
  updateTNMData: (data: Partial<TNMData>) => void;
  updatePathologyData: (data: Partial<PathologyData>) => void;
  updatePreOpData: (data: Partial<PreOpData>) => void;
  updatePostOpTNMData: (data: Partial<PostOpTNMData>) => void;
  setCancerType: (type: 'kidney' | 'wilms') => void;
  setCaseType: (type: 'primary' | 'postOp') => void;
  setStage: (stage: string) => void;
  saveCase: () => void;
  loadCase: (id: string) => void;
  deleteCase: (id: string) => void;
  resetCurrentCase: () => void;
}

const CaseContext = createContext<CaseContextType | undefined>(undefined);

const generateCaseId = () => {
  const date = new Date();
  const prefix = 'CASE';
  const timestamp = date.getTime().toString(36).toUpperCase();
  return `${prefix}-${timestamp}`;
};

const createEmptyCase = (): CaseData => ({
  id: generateCaseId(),
  caseType: 'primary',
  cancerType: null,
  patient: {
    caseId: '',
    age: null,
    gender: null,
    comorbidities: [],
  },
  tumor: {
    size: null,
    grade: null,
    histology: null,
  },
  tnm: {
    t: null,
    n: null,
    m: null,
  },
  pathology: {
    histology: null,
    grade: null,
    tumorSize: null,
    marginStatus: null,
    vascularInvasion: false,
    lymphNodeInvasion: false,
    sarcomatoidFeatures: false,
    necrosis: false,
  },
  preOp: {
    clinicalStage: null,
    tumorSize: null,
    cT: null,
    surgeryType: null,
  },
  postOpTNM: {
    pT: null,
    pN: null,
    pM: null,
  },
  stage: null,
  createdAt: new Date(),
  updatedAt: new Date(),
});

export function CaseProvider({ children }: { children: ReactNode }) {
  const [currentCase, setCurrentCase] = useState<CaseData | null>(null);
  const [savedCases, setSavedCases] = useState<CaseData[]>(() => {
    const saved = localStorage.getItem('saved-cases');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return parsed.map((c: any) => ({
          ...c,
          createdAt: new Date(c.createdAt),
          updatedAt: new Date(c.updatedAt),
        }));
      } catch {
        return [];
      }
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem('saved-cases', JSON.stringify(savedCases));
  }, [savedCases]);

  const createNewCase = () => {
    setCurrentCase(createEmptyCase());
  };

  const updatePatientData = (data: Partial<PatientData>) => {
    if (!currentCase) return;
    setCurrentCase({
      ...currentCase,
      patient: { ...currentCase.patient, ...data },
      updatedAt: new Date(),
    });
  };

  const updateTumorData = (data: Partial<TumorData>) => {
    if (!currentCase) return;
    setCurrentCase({
      ...currentCase,
      tumor: { ...currentCase.tumor, ...data },
      updatedAt: new Date(),
    });
  };

  const updateTNMData = (data: Partial<TNMData>) => {
    if (!currentCase) return;
    setCurrentCase({
      ...currentCase,
      tnm: { ...currentCase.tnm, ...data },
      updatedAt: new Date(),
    });
  };

  const updatePathologyData = (data: Partial<PathologyData>) => {
    if (!currentCase) return;
    setCurrentCase({
      ...currentCase,
      pathology: { ...currentCase.pathology!, ...data },
      updatedAt: new Date(),
    });
  };

  const updatePreOpData = (data: Partial<PreOpData>) => {
    if (!currentCase) return;
    setCurrentCase({
      ...currentCase,
      preOp: { ...currentCase.preOp!, ...data },
      updatedAt: new Date(),
    });
  };

  const updatePostOpTNMData = (data: Partial<PostOpTNMData>) => {
    if (!currentCase) return;
    setCurrentCase({
      ...currentCase,
      postOpTNM: { ...currentCase.postOpTNM!, ...data },
      updatedAt: new Date(),
    });
  };

  const setCancerType = (type: 'kidney' | 'wilms') => {
    if (!currentCase) return;
    setCurrentCase({
      ...currentCase,
      cancerType: type,
      updatedAt: new Date(),
    });
  };

  const setCaseType = (type: 'primary' | 'postOp') => {
    if (!currentCase) return;
    setCurrentCase({
      ...currentCase,
      caseType: type,
      updatedAt: new Date(),
    });
  };

  const setStage = (stage: string) => {
    if (!currentCase) return;
    setCurrentCase({
      ...currentCase,
      stage,
      updatedAt: new Date(),
    });
  };

  const saveCase = () => {
    if (!currentCase) return;
    const existingIndex = savedCases.findIndex(c => c.id === currentCase.id);
    if (existingIndex >= 0) {
      const updated = [...savedCases];
      updated[existingIndex] = currentCase;
      setSavedCases(updated);
    } else {
      setSavedCases([...savedCases, currentCase]);
    }
  };

  const loadCase = (id: string) => {
    const found = savedCases.find(c => c.id === id);
    if (found) {
      setCurrentCase(found);
    }
  };

  const deleteCase = (id: string) => {
    setSavedCases(savedCases.filter(c => c.id !== id));
    if (currentCase?.id === id) {
      setCurrentCase(null);
    }
  };

  const resetCurrentCase = () => {
    setCurrentCase(null);
  };

  return (
    <CaseContext.Provider
      value={{
        currentCase,
        savedCases,
        createNewCase,
        updatePatientData,
        updateTumorData,
        updateTNMData,
        updatePathologyData,
        updatePreOpData,
        updatePostOpTNMData,
        setCancerType,
        setCaseType,
        setStage,
        saveCase,
        loadCase,
        deleteCase,
        resetCurrentCase,
      }}
    >
      {children}
    </CaseContext.Provider>
  );
}

export function useCase() {
  const context = useContext(CaseContext);
  if (context === undefined) {
    throw new Error('useCase must be used within a CaseProvider');
  }
  return context;
}
