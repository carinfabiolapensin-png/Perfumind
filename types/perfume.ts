export type NoteFamily = 'citrus' | 'floral' | 'woody' | 'oriental' | 'fresh' | 'aromatic' | 'gourmand' | 'green' | 'spicy' | 'leather' | 'mineral';
export type Gender = 'feminino' | 'masculino' | 'unissex';
export type Season = 'primavera' | 'verão' | 'outono' | 'inverno';
export type Occasion = 'casual' | 'trabalho' | 'noite' | 'especial' | 'romântico' | 'esporte' | 'formal' | 'praia' | 'viagem' | 'urbano' | 'artístico' | 'cultural' | 'natural' | 'poder' | 'luxo' | 'íntimo' | 'conforto' | 'celebração';
export type Sillage = 'leve' | 'moderado' | 'forte' | 'muito-forte';
export type Longevity = 'curta' | 'moderada' | 'boa' | 'excelente';

export interface Note {
  name: string;
  intensity?: number; // 1-10
  family: NoteFamily;
}

export interface AffiliateLink {
  store: string;
  url: string;
  price?: number;
  discount?: number;
}

export interface Perfume {
  id: string;
  name: string;
  brand: string;
  gender: Gender;
  topNotes: Note[];
  heartNotes: Note[];
  baseNotes: Note[];
  description: string;
  personalityTraits: string[];
  season?: Season[];
  occasions?: Occasion[];
  sillage: Sillage;
  longevity: Longevity;
  year?: number;
  affiliateLinks?: AffiliateLink[];
}

export interface RecommendationMatch {
  perfume: Perfume;
  matchScore: number; // 0-100
  commonNotes: string[];
  reason: string;
  personalityAlignment: number; // 0-100
  olfactoryCompatibility: number; // 0-100
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

export interface SearchResult {
  perfumes: Perfume[];
  searchTerm: string;
  fuzzyMatches: boolean;
}
