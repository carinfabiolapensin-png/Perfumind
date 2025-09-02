import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { PersonalityProfile } from '@/types/perfume';

interface PersonalityInsightProps {
  profile: PersonalityProfile;
}

export default function PersonalityInsight({ profile }: PersonalityInsightProps) {
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#667eea', '#764ba2']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.header}
      >
        <Ionicons name="sparkles" size={24} color="white" />
        <Text style={styles.headerTitle}>Sua Essência Olfativa</Text>
      </LinearGradient>

      <View style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.essenceDescription}>
            {profile.essenceDescription}
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Traços Dominantes</Text>
          <View style={styles.traitsContainer}>
            {profile.dominantTraits.map((trait, index) => (
              <View key={trait} style={[styles.trait, { backgroundColor: index < 2 ? '#667eea' : '#8B5CF6' }]}>
                <Text style={styles.traitText}>{trait}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Preferências Olfativas</Text>
          <View style={styles.preferencesContainer}>
            <View style={styles.preferenceGroup}>
              <Text style={styles.preferenceTitle}>Notas de Topo</Text>
              <Text style={styles.preferenceText}>
                {profile.olfactoryPreferences.topNotesPreference.slice(0, 3).join(', ')}
              </Text>
            </View>
            <View style={styles.preferenceGroup}>
              <Text style={styles.preferenceTitle}>Notas de Coração</Text>
              <Text style={styles.preferenceText}>
                {profile.olfactoryPreferences.heartNotesPreference.slice(0, 3).join(', ')}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Insights de Compatibilidade</Text>
          {profile.compatibilityInsights.map((insight, index) => (
            <View key={index} style={styles.insightItem}>
              <Ionicons name="bulb" size={16} color="#F59E0B" />
              <Text style={styles.insightText}>{insight}</Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 20,
    overflow: 'hidden',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    marginBottom: 24,
  },
  header: {
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  content: {
    padding: 24,
  },
  section: {
    marginBottom: 24,
  },
  essenceDescription: {
    fontSize: 16,
    lineHeight: 24,
    color: '#374151',
    fontWeight: '400',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 12,
  },
  traitsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  trait: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  traitText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  preferencesContainer: {
    gap: 16,
  },
  preferenceGroup: {
    backgroundColor: '#F9FAFB',
    padding: 16,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#667eea',
  },
  preferenceTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#4B5563',
    marginBottom: 6,
  },
  preferenceText: {
    fontSize: 14,
    color: '#6B7280',
    fontStyle: 'italic',
  },
  insightItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    marginBottom: 12,
    paddingHorizontal: 4,
  },
  insightText: {
    flex: 1,
    fontSize: 14,
    color: '#4B5563',
    lineHeight: 20,
  },
});