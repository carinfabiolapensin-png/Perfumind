export interface PerfumeNote {
  name: string;
  intensity: number; // 1-10
  family: 'citrus' | 'floral' | 'woody' | 'oriental' | 'fresh' | 'gourmand' | 'aromatic';
  characteristics?: string;
}

export interface Perfume {
  id: string;
  name: string;
  brand: string;
  gender: 'feminino' | 'masculino';
  topNotes: PerfumeNote[];
  heartNotes: PerfumeNote[];
  baseNotes: PerfumeNote[];
  description: string;
  personalityTraits: string[];
  season: ('primavera' | 'verão' | 'outono' | 'inverno')[];
  occasions: string[];
  sillage: 'baixo' | 'moderado' | 'forte' | 'muito-forte';
  longevity: 'fraca' | 'moderada' | 'boa' | 'excelente';
  year?: number;
  price?: string;
}

export interface RecommendationMatch {
  perfume: Perfume;
  matchScore: number;
  commonNotes: string[];
  reason: string;
  personalityAlignment: number;
  olfactoryCompatibility: number;
}

export interface PersonalityProfile {
  dominantTraits: string[];
  secondaryTraits: string[];
  olfactoryPreferences: {
    topNotesPreference: string[];
    heartNotesPreference: string[];
    baseNotesPreference: string[];
  };
  behavioralAnalysis: {
    lifestyle: string;
    personality: string;
    recommendations: string[];
  };
  essenceDescription: string;
  compatibilityInsights: string[];
}

export interface UserProfile {
  currentPerfumes: Perfume[];
  personalityProfile?: PersonalityProfile;
  preferences: {
    gender: 'feminino' | 'masculino' | 'both';
    occasions: string[];
    intensity: 'leve' | 'moderada' | 'intensa';
  };
}

export interface SearchResult {
  perfumes: Perfume[];
  searchTerm: string;
  fuzzyMatches: boolean;
}