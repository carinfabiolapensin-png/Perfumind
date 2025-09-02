import { Perfume, RecommendationMatch, PersonalityProfile, SearchResult } from '@/types/perfume';
import { ALL_PERFUMES } from '@/constants/perfumes';

export class IntelligentRecommendationService {
  
  // Busca fuzzy avançada
  static fuzzySearch(query: string, threshold: number = 0.6): SearchResult {
    if (!query || query.length < 2) {
      return { perfumes: [], searchTerm: query, fuzzyMatches: false };
    }

    const searchTerm = query.toLowerCase().trim();
    const exactMatches: Perfume[] = [];
    const fuzzyMatches: Perfume[] = [];

    ALL_PERFUMES.forEach(perfume => {
      const name = perfume.name.toLowerCase();
      const brand = perfume.brand.toLowerCase();
      const fullName = `${brand} ${name}`;

      // Busca exata
      if (name.includes(searchTerm) || brand.includes(searchTerm) || fullName.includes(searchTerm)) {
        exactMatches.push(perfume);
        return;
      }

      // Busca fuzzy
      const similarity = this.calculateSimilarity(searchTerm, fullName);
      if (similarity >= threshold) {
        fuzzyMatches.push(perfume);
      }
    });

    const results = [...exactMatches, ...fuzzyMatches].slice(0, 20);
    return {
      perfumes: results,
      searchTerm: query,
      fuzzyMatches: fuzzyMatches.length > 0
    };
  }

  // Calcula similaridade entre strings
  private static calculateSimilarity(str1: string, str2: string): number {
    const longer = str1.length > str2.length ? str1 : str2;
    const shorter = str1.length > str2.length ? str2 : str1;
    
    if (longer.length === 0) return 1.0;
    
    const editDistance = this.levenshteinDistance(longer, shorter);
    return (longer.length - editDistance) / longer.length;
  }

  // Distância de Levenshtein para busca fuzzy
  private static levenshteinDistance(str1: string, str2: string): number {
    const matrix = [];
    
    for (let i = 0; i <= str2.length; i++) {
      matrix[i] = [i];
    }
    
    for (let j = 0; j <= str1.length; j++) {
      matrix[0][j] = j;
    }
    
    for (let i = 1; i <= str2.length; i++) {
      for (let j = 1; j <= str1.length; j++) {
        if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
          matrix[i][j] = matrix[i - 1][j - 1];
        } else {
          matrix[i][j] = Math.min(
            matrix[i - 1][j - 1] + 1,
            matrix[i][j - 1] + 1,
            matrix[i - 1][j] + 1
          );
        }
      }
    }
    
    return matrix[str2.length][str1.length];
  }

  // Recomendações inteligentes baseadas em múltiplos fatores
  static getIntelligentRecommendations(currentPerfume: Perfume, limit: number = 6): RecommendationMatch[] {
    const recommendations: RecommendationMatch[] = [];
    
    const currentNotes = this.extractAllNotes(currentPerfume);
    const currentTraits = currentPerfume.personalityTraits.map(t => t.toLowerCase());

    ALL_PERFUMES.forEach(perfume => {
      if (perfume.id === currentPerfume.id) return;

      const perfumeNotes = this.extractAllNotes(perfume);
      const perfumeTraits = perfume.personalityTraits.map(t => t.toLowerCase());

      // Calcular compatibilidade olfativa
      const olfactoryScore = this.calculateOlfactoryCompatibility(currentNotes, perfumeNotes, currentPerfume, perfume);
      
      // Calcular alinhamento de personalidade
      const personalityScore = this.calculatePersonalityAlignment(currentTraits, perfumeTraits);
      
      // Score final ponderado
      const finalScore = (olfactoryScore * 0.6) + (personalityScore * 0.4);
      
      if (finalScore > 0.3) {
        const commonNotes = this.findCommonNotes(currentNotes, perfumeNotes);
        
        recommendations.push({
          perfume,
          matchScore: finalScore * 100,
          commonNotes,
          reason: this.generateIntelligentReason(olfactoryScore, personalityScore, commonNotes, perfume),
          personalityAlignment: personalityScore * 100,
          olfactoryCompatibility: olfactoryScore * 100
        });
      }
    });

    return recommendations
      .sort((a, b) => b.matchScore - a.matchScore)
      .slice(0, limit);
  }

  // Extrai todas as notas de um perfume
  private static extractAllNotes(perfume: Perfume): string[] {
    return [
      ...perfume.topNotes.map(n => n.name.toLowerCase()),
      ...perfume.heartNotes.map(n => n.name.toLowerCase()),
      ...perfume.baseNotes.map(n => n.name.toLowerCase())
    ];
  }

  // Calcula compatibilidade olfativa avançada
  private static calculateOlfactoryCompatibility(notes1: string[], notes2: string[], perfume1: Perfume, perfume2: Perfume): number {
    const commonNotes = this.findCommonNotes(notes1, notes2);
    const notesScore = commonNotes.length / Math.max(notes1.length, notes2.length);
    
    // Bonus por mesmo gênero
    const genderBonus = perfume1.gender === perfume2.gender ? 0.1 : 0;
    
    // Bonus por ocasiões similares
    const commonOccasions = perfume1.occasions?.filter(o => perfume2.occasions?.includes(o)) || [];
    const occasionBonus = commonOccasions.length > 0 ? 0.05 : 0;
    
    return Math.min(1, notesScore + genderBonus + occasionBonus);
  }

  // Calcula alinhamento de personalidade
  private static calculatePersonalityAlignment(traits1: string[], traits2: string[]): number {
    const commonTraits = traits1.filter(trait => 
      traits2.some(t => t.includes(trait) || trait.includes(t))
    );
    
    return commonTraits.length / Math.max(traits1.length, traits2.length);
  }

  // Encontra notas em comum
  private static findCommonNotes(notes1: string[], notes2: string[]): string[] {
    return notes1.filter(note => 
      notes2.some(note2 => 
        note2.includes(note) || 
        note.includes(note2) ||
        this.calculateSimilarity(note, note2) > 0.8
      )
    );
  }

  // Gera razão inteligente para recomendação
  private static generateIntelligentReason(olfactoryScore: number, personalityScore: number, commonNotes: string[], perfume: Perfume): string {
    const compatibility = Math.round((olfactoryScore + personalityScore) * 50);
    const notesText = commonNotes.slice(0, 3).join(', ');
    
    if (olfactoryScore > personalityScore) {
      return `${compatibility}% de afinidade olfativa - Notas em comum: ${notesText}. Combina perfeitamente com seu estilo.`;
    } else {
      return `${compatibility}% de alinhamento comportamental - Essência similar: ${perfume.personalityTraits.slice(0, 2).join(', ').toLowerCase()}.`;
    }
  }

  // Análise avançada de personalidade
  static generateAdvancedPersonalityProfile(perfumes: Perfume[]): PersonalityProfile {
    if (perfumes.length === 0) {
      return this.getDefaultProfile();
    }

    const allTraits = perfumes.flatMap(p => p.personalityTraits);
    const allNotes = {
      top: perfumes.flatMap(p => p.topNotes.map(n => n.name)),
      heart: perfumes.flatMap(p => p.heartNotes.map(n => n.name)),
      base: perfumes.flatMap(p => p.baseNotes.map(n => n.name))
    };

    // Análise de traços dominantes
    const traitFrequency = this.calculateFrequency(allTraits);
    const dominantTraits = Object.keys(traitFrequency)
      .sort((a, b) => traitFrequency[b] - traitFrequency[a])
      .slice(0, 4);

    const secondaryTraits = Object.keys(traitFrequency)
      .sort((a, b) => traitFrequency[b] - traitFrequency[a])
      .slice(4, 8);

    // Análise de preferências olfativas
    const topPrefs = this.getTopPreferences(allNotes.top);
    const heartPrefs = this.getTopPreferences(allNotes.heart);
    const basePrefs = this.getTopPreferences(allNotes.base);

    const essenceDescription = this.generateEssenceDescription(dominantTraits, perfumes);
    const behavioralAnalysis = this.generateBehavioralAnalysis(dominantTraits, perfumes);
    const compatibilityInsights = this.generateCompatibilityInsights(dominantTraits, allNotes);

    return {
      dominantTraits,
      secondaryTraits,
      olfactoryPreferences: {
        topNotesPreference: topPrefs,
        heartNotesPreference: heartPrefs,
        baseNotesPreference: basePrefs
      },
      behavioralAnalysis,
      essenceDescription,
      compatibilityInsights
    };
  }

  // Calcula frequência de elementos
  private static calculateFrequency<T extends string>(items: T[]): Record<string, number> {
    return items.reduce((acc, item) => {
      acc[item] = (acc[item] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
  }

  // Obtém preferências principais
  private static getTopPreferences(notes: string[]): string[] {
    const frequency = this.calculateFrequency(notes);
    return Object.keys(frequency)
      .sort((a, b) => frequency[b] - frequency[a])
      .slice(0, 5);
  }

  // Gera descrição da essência
  private static generateEssenceDescription(traits: string[], perfumes: Perfume[]): string {
    const primaryTrait = traits[0]?.toLowerCase() || 'única';
    const secondaryTrait = traits[1]?.toLowerCase() || 'especial';
    const brands = [...new Set(perfumes.map(p => p.brand))];
    
    return `Sua essência revela uma personalidade ${primaryTrait} e ${secondaryTrait}. Com preferência por fragrâncias de ${brands.slice(0, 2).join(' e ')}, você demonstra um gosto refinado e uma identidade olfativa bem definida. Sua aura transmite confiança e sofisticação, atraindo pessoas que apreciam autenticidade e elegância.`;
  }

  // Gera análise comportamental
  private static generateBehavioralAnalysis(traits: string[], perfumes: Perfume[]): {
    lifestyle: string;
    personality: string;
    recommendations: string[];
  } {
    const lifestyle = this.analyzeLifestyle(perfumes);
    const personality = `Personalidade ${traits.slice(0, 2).join(' e ').toLowerCase()}, com forte senso estético`;
    
    const recommendations = [
      'Explore fragrâncias com notas complementares para diferentes ocasiões',
      'Considere perfumes com intensidade similar ao seu estilo atual',
      'Experimente fragrâncias da mesma família olfativa para expandir seu repertório'
    ];

    return { lifestyle, personality, recommendations };
  }

  // Analisa estilo de vida
  private static analyzeLifestyle(perfumes: Perfume[]): string {
    const allOccasions = perfumes.flatMap(p => p.occasions || []);
    const frequency = this.calculateFrequency(allOccasions);
    const topOccasion = Object.keys(frequency)[0] || 'versátil';
    
    return `Estilo de vida ${topOccasion}, com preferência por fragrâncias que complementam sua rotina`;
  }

  // Gera insights de compatibilidade
  private static generateCompatibilityInsights(traits: string[], notes: any): string[] {
    return [
      `Sua preferência por notas ${notes.top.slice(0, 2).join(' e ').toLowerCase()} sugere uma personalidade vibrante`,
      `As notas de coração revelam seu lado ${traits[0]?.toLowerCase() || 'autêntico'}`,
      `Sua base olfativa indica profundidade e sofisticação em suas escolhas`
    ];
  }

  // Perfil padrão
  private static getDefaultProfile(): PersonalityProfile {
    return {
      dominantTraits: ['Autêntica', 'Elegante'],
      secondaryTraits: ['Sofisticada', 'Confiante'],
      olfactoryPreferences: {
        topNotesPreference: [],
        heartNotesPreference: [],
        baseNotesPreference: []
      },
      behavioralAnalysis: {
        lifestyle: 'Descobrindo seu estilo',
        personality: 'Em busca da fragrância perfeita',
        recommendations: ['Explore diferentes famílias olfativas', 'Descubra sua identidade aromática']
      },
      essenceDescription: 'Sua jornada olfativa está começando. Explore diferentes fragrâncias para descobrir sua essência única.',
      compatibilityInsights: ['Mantenha-se aberta a novas experiências aromáticas']
    };
  }
}