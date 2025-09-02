import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { Perfume } from '@/types/perfume';

const { width } = Dimensions.get('window');

interface PerfumeCardProps {
  perfume: Perfume;
  onPress: () => void;
  matchScore?: number;
  showMatchBadge?: boolean;
}

export default function PerfumeCard({ 
  perfume, 
  onPress, 
  matchScore,
  showMatchBadge = false 
}: PerfumeCardProps) {
  
  const gradientColors = perfume.gender === 'feminino' 
    ? ['#FFE5F1', '#FFB8DD', '#FF8CC8'] 
    : ['#E5F3FF', '#B8DEFF', '#8CC8FF'];

  const getSillageIcon = (sillage: string) => {
    switch (sillage) {
      case 'muito-forte': return 'radio-button-on';
      case 'forte': return 'ellipse';
      case 'moderado': return 'ellipse-outline';
      default: return 'remove-outline';
    }
  };

  return (
    <TouchableOpacity onPress={onPress} style={styles.container} activeOpacity={0.8}>
      <LinearGradient
        colors={gradientColors}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradient}
      >
        <View style={styles.header}>
          <View>
            <Text style={styles.brand}>{perfume.brand}</Text>
            <Text style={styles.name}>{perfume.name}</Text>
          </View>
          
          {showMatchBadge && matchScore && (
            <View style={styles.matchContainer}>
              <View style={styles.matchBadge}>
                <Ionicons name="heart" size={12} color="white" />
                <Text style={styles.matchText}>{Math.round(matchScore)}%</Text>
              </View>
            </View>
          )}
        </View>

        <View style={styles.notesSection}>
          <View style={styles.noteCategory}>
            <Text style={styles.noteCategoryTitle}>Topo</Text>
            <Text style={styles.notesList} numberOfLines={1}>
              {perfume.topNotes.slice(0, 3).map(note => note.name).join(', ')}
            </Text>
          </View>
          
          <View style={styles.noteCategory}>
            <Text style={styles.noteCategoryTitle}>Coração</Text>
            <Text style={styles.notesList} numberOfLines={1}>
              {perfume.heartNotes.slice(0, 3).map(note => note.name).join(', ')}
            </Text>
          </View>
        </View>

        <Text style={styles.description} numberOfLines={2}>
          {perfume.description}
        </Text>

        <View style={styles.footer}>
          <View style={styles.traits}>
            {perfume.personalityTraits.slice(0, 2).map(trait => (
              <View key={trait} style={styles.trait}>
                <Text style={styles.traitText}>{trait}</Text>
              </View>
            ))}
          </View>
          
          <View style={styles.sillageContainer}>
            <Ionicons 
              name={getSillageIcon(perfume.sillage)} 
              size={16} 
              color="rgba(0,0,0,0.6)" 
            />
            <Text style={styles.sillageText}>{perfume.sillage}</Text>
          </View>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    borderRadius: 20,
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
  },
  gradient: {
    padding: 24,
    borderRadius: 20,
    minHeight: 200,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  brand: {
    fontSize: 12,
    fontWeight: '700',
    color: 'rgba(0,0,0,0.7)',
    textTransform: 'uppercase',
    letterSpacing: 1.2,
    marginBottom: 4,
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    lineHeight: 26,
  },
  matchContainer: {
    alignItems: 'flex-end',
  },
  matchBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FF6B6B',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 16,
    gap: 4,
  },
  matchText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  notesSection: {
    marginBottom: 16,
    gap: 8,
  },
  noteCategory: {
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    padding: 12,
    borderRadius: 12,
    borderLeftWidth: 3,
    borderLeftColor: 'rgba(0,0,0,0.2)',
  },
  noteCategoryTitle: {
    fontSize: 11,
    fontWeight: '700',
    color: 'rgba(0,0,0,0.8)',
    textTransform: 'uppercase',
    marginBottom: 4,
    letterSpacing: 0.5,
  },
  notesList: {
    fontSize: 13,
    color: 'rgba(0,0,0,0.7)',
    fontStyle: 'italic',
    lineHeight: 18,
  },
  description: {
    fontSize: 14,
    color: 'rgba(0,0,0,0.8)',
    lineHeight: 20,
    marginBottom: 16,
    fontWeight: '400',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  traits: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    flex: 1,
  },
  trait: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  traitText: {
    fontSize: 11,
    color: 'rgba(0,0,0,0.8)',
    fontWeight: '500',
  },
  sillageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  sillageText: {
    fontSize: 11,
    color: 'rgba(0,0,0,0.6)',
    fontWeight: '500',
  },
});