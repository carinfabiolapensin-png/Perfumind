export type PlanType = 'free' | 'premium';

export interface User {
  id: string;
  email: string;
  name: string;
  plan: PlanType;
  createdAt: string;
  favoritesPerfumes: string[];
  searchHistory: string[];
}

export interface PlanFeatures {
  maxRecommendations: number;
  maxFavorites: number;
  advancedAnalysis: boolean;
  affiliateLinks: boolean;
  adFree: boolean;
  newReleasesAlerts: boolean;
}

export const PLAN_FEATURES: Record<PlanType, PlanFeatures> = {
  free: {
    maxRecommendations: 3,
    maxFavorites: 5,
    advancedAnalysis: false,
    affiliateLinks: false,
    adFree: false,
    newReleasesAlerts: false,
  },
  premium: {
    maxRecommendations: -1, // ilimitado
    maxFavorites: -1,
    advancedAnalysis: true,
    affiliateLinks: true,
    adFree: true,
    newReleasesAlerts: true,
  },
};
