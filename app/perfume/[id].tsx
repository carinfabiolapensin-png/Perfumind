import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { router, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import PerfumeCard from '@/components/ui/PerfumeCard';
import PersonalityInsight from '@/components/ui/PersonalityInsight';
import { IntelligentRecommendationService } from '@/services/recommendation';
import { Perfume, PersonalityProfile, RecommendationMatch } from '@/types/perfume';
import { ALL_PERFUMES } from '@/constants/perfumes';

export default function PerfumeDetailPage() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [perfume, setPerfume] = useState<Perfume | null>(null);
  const [personalityProfile, setPersonalityProfile] = useState<PersonalityProfile | null>(null);
  const [recommendations, setRecommendations] = useState<RecommendationMatch[]>([]);

  useEffect(() => {
    if (id) {
      const foundPerfume = ALL_PERFUMES.find(p => p.id === id);
      if (foundPerfume) {
        setPerfume(foundPerfume);
        setPersonalityProfile(
          IntelligentRecommendationService.generateAdvancedPersonalityProfile([foundPerfume])
        );
        setRecommendations(
          IntelligentRecommendationService.getIntelligentRecommendations(foundPerfume)
        );
      }
    }
  }, [id]);

  if (!perfume) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Ionicons name="sad-outline" size={64} color="#9CA3AF" />
          <Text style={styles.errorText}>Perfume não encontrado</Text>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <Text style={styles.backButtonText}>Voltar</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  const gradientColors = perfume.gender === 'feminino' 
    ? ['#FFE5F1', '#FFB8DD', '#FF8CC8'] 
    : ['#E5F3FF', '#B8DEFF', '#8CC8FF'];

  const renderNotesSection = (title: string, notes: any[], color: string) => (
    <View style={styles.notesGroup}>
      <View style={[styles.notesHeader, { backgroundColor: color }]}>
        <Text style={styles.notesTitle}>{title}</Text>
      </View>
      <View style={styles.notesList}>
        {notes.map((note, index) => (
          <View key={index} style={styles.noteItem}>
            <Text style={styles.noteName}>{note.name}</Text>
            <View style={styles.intensityBar}>
              <View 
                style={[
                  styles.intensityFill, 
                  { width: `${(note.intensity || 5) * 10}%` }
                ]} 
              />
            </View>
          </View>
        ))}
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <LinearGradient colors={gradientColors} style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        
        <View style={styles.headerContent}>
          <Text style={styles.brand}>{perfume.brand}</Text>
          <Text style={styles.name}>{perfume.name}</Text>
          
          <View style={styles.headerInfo}>
            <View style={styles.infoItem}>
              <Ionicons name="time-outline" size={16} color="rgba(0,0,0,0.7)" />
              <Text style={styles.infoText}>{perfume.longevity}</Text>
            </View>
            <View style={styles.infoItem}>
              <Ionicons name="radio-button-on-outline" size={16} color="rgba(0,0,0,0.7)" />
              <Text style={styles.infoText}>{perfume.sillage}</Text>
            </View>
          </View>
        </View>
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {personalityProfile && (
          <PersonalityInsight profile={personalityProfile} />
        )}

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Pirâmide Olfativa</Text>
          
          {renderNotesSection('Notas de Topo', perfume.topNotes, '#FFD700')}
          {renderNotesSection('Notas de Coração', perfume.heartNotes, '#FF69B4')}
          {renderNotesSection('Notas de Fundo', perfume.baseNotes, '#8B4513')}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recomendações Inteligentes</Text>
          <Text style={styles.sectionSubtitle}>
            Baseadas em compatibilidade olfativa e alinhamento comportamental
          </Text>
          
          {recommendations.map((recommendation) => (
            <View key={recommendation.perfume.id} style={styles.recommendationItem}>
              <PerfumeCard
                perfume={recommendation.perfume}
                matchScore={recommendation.matchScore}
                showMatchBadge={true}
                onPress={() => router.push({
                  pathname: '/perfume/[id]',
                  params: { id: recommendation.perfume.id }
                })}
              />
              
              <View style={styles.matchDetails}>
                <View style={styles.matchScores}>
                  <View style={styles.scoreItem}>
                    <Text style={styles.scoreLabel}>Olfativo</Text>
                    <Text style={styles.scoreValue}>
                      {Math.round(recommendation.olfactoryCompatibility)}%
                    </Text>
                  </View>
                  <View style={styles.scoreItem}>
                    <Text style={styles.scoreLabel}>Comportamental</Text>
                    <Text style={styles.scoreValue}>
                      {Math.round(recommendation.personalityAlignment)}%
                    </Text>
                  </View>
                </View>
                <Text style={styles.reasonText}>{recommendation.reason}</Text>
              </View>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Descrição Completa</Text>
          <View style={styles.descriptionContainer}>
            <Text style={styles.description}>{perfume.description}</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFBFC',
  },
  header: {
    padding: 24,
    paddingTop: 60,
    position: 'relative',
  },
  backButton: {
    position: 'absolute',
    left: 20,
    top: 60,
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  headerContent: {
    alignItems: 'center',
    marginTop: 20,
  },
  brand: {
    fontSize: 14,
    fontWeight: '700',
    color: 'rgba(0,0,0,0.7)',
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    marginBottom: 8,
  },
  name: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 16,
  },
  headerInfo: {
    flexDirection: 'row',
    gap: 20,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  infoText: {
    fontSize: 12,
    color: 'rgba(0,0,0,0.7)',
    fontWeight: '500',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 8,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 20,
    fontStyle: 'italic',
  },
  notesGroup: {
    marginBottom: 20,
    backgroundColor: 'white',
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  notesHeader: {
    padding: 16,
  },
  notesTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: 'white',
    textAlign: 'center',
  },
  notesList: {
    padding: 16,
  },
  noteItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  noteName: {
    fontSize: 14,
    color: '#374151',
    fontWeight: '500',
    flex: 1,
  },
  intensityBar: {
    width: 60,
    height: 6,
    backgroundColor: '#E5E7EB',
    borderRadius: 3,
    overflow: 'hidden',
  },
  intensityFill: {
    height: '100%',
    backgroundColor: '#667eea',
    borderRadius: 3,
  },
  recommendationItem: {
    marginBottom: 24,
  },
  matchDetails: {
    backgroundColor: 'white',
    marginTop: -10,
    padding: 16,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    elevation: 2,
  },
  matchScores: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 12,
  },
  scoreItem: {
    alignItems: 'center',
  },
  scoreLabel: {
    fontSize: 12,
    color: '#6B7280',
    fontWeight: '500',
  },
  scoreValue: {
    fontSize: 16,
    color: '#667eea',
    fontWeight: 'bold',
  },
  reasonText: {
    fontSize: 13,
    color: '#4B5563',
    fontStyle: 'italic',
    textAlign: 'center',
    lineHeight: 18,
  },
  descriptionContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#667eea',
  },
  description: {
    fontSize: 16,
    color: '#374151',
    lineHeight: 24,
    fontWeight: '400',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    fontSize: 18,
    color: '#6B7280',
    marginTop: 16,
    marginBottom: 24,
  },
  backButtonText: {
    color: '#667eea',
    fontSize: 16,
    fontWeight: '600',
  },
});