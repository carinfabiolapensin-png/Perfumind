import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, FlatList, TextInput, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import SearchBar from '@/components/ui/SearchBar';
import PerfumeCard from '@/components/ui/PerfumeCard';
import { IntelligentRecommendationService } from '@/services/recommendation';
import { Perfume, SearchResult } from '@/types/perfume';
import { FEMININE_PERFUMES, MASCULINE_PERFUMES } from '@/constants/perfumes';
import { useAuth } from '@/hooks/useAuth';

export default function HomePage() {
  const { user, isAuthenticated } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult>({ perfumes: [], searchTerm: '', fuzzyMatches: false });
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const searchInputRef = useRef<TextInput>(null);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.length >= 2) {
      const results = IntelligentRecommendationService.fuzzySearch(query);
      setSearchResults(results);
    } else {
      setSearchResults({ perfumes: [], searchTerm: query, fuzzyMatches: false });
    }
  };

  const handlePerfumePress = (perfume: Perfume) => {
    router.push({
      pathname: '/perfume/[id]',
      params: { id: perfume.id }
    });
  };

  const renderPerfumeSection = (title: string, perfumes: Perfume[], gradient: string[]) => (
    <View style={styles.section}>
      <LinearGradient
        colors={gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.sectionHeader}
      >
        <Text style={styles.sectionTitle}>{title}</Text>
        <Text style={styles.sectionSubtitle}>
          {perfumes.length} fragrâncias selecionadas
        </Text>
      </LinearGradient>
      
      <FlatList
        data={perfumes.slice(0, 4)}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <PerfumeCard
            perfume={item}
            onPress={() => handlePerfumePress(item)}
          />
        )}
        showsVerticalScrollIndicator={false}
        scrollEnabled={false}
      />
    </View>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <LinearGradient
        colors={['#667eea', '#764ba2', '#f093fb']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.header}
      >
        <View style={styles.headerTop}>
          <Text style={styles.title}>Perfumind</Text>
          {!isAuthenticated ? (
            <TouchableOpacity 
              style={styles.loginButton}
              onPress={() => router.push('/(auth)/login')}
            >
              <Ionicons name="person-circle-outline" size={28} color="white" />
            </TouchableOpacity>
          ) : (
            <View style={styles.userInfo}>
              <Text style={styles.userName}>{user?.name}</Text>
              {user?.plan === 'free' && (
                <TouchableOpacity 
                  style={styles.premiumBadge}
                  onPress={() => router.push('/(auth)/premium')}
                >
                  <Ionicons name="diamond-outline" size={16} color="#F59E0B" />
                  <Text style={styles.premiumText}>Premium</Text>
                </TouchableOpacity>
              )}
            </View>
          )}
        </View>
        <Text style={styles.subtitle}>
          Descubra fragrâncias que revelam sua essência única
        </Text>
        <Text style={styles.description}>
          Sistema inteligente de recomendação baseado em análise olfativa e comportamental
        </Text>
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <SearchBar
          value={searchQuery}
          onChangeText={handleSearch}
          placeholder="Digite o nome do seu perfume atual..."
          focused={isSearchFocused}
        />

        {searchResults.perfumes.length > 0 ? (
          <View style={styles.section}>
            <View style={styles.searchResultsHeader}>
              <Text style={styles.sectionTitle}>
                {searchResults.fuzzyMatches ? 'Resultados Similares' : 'Resultados da Busca'}
              </Text>
              <Text style={styles.resultsCount}>
                {searchResults.perfumes.length} perfume{searchResults.perfumes.length !== 1 ? 's' : ''} encontrado{searchResults.perfumes.length !== 1 ? 's' : ''}
              </Text>
            </View>
            
            {searchResults.perfumes.map((perfume) => (
              <PerfumeCard
                key={perfume.id}
                perfume={perfume}
                onPress={() => handlePerfumePress(perfume)}
              />
            ))}
          </View>
        ) : (
          <>
            {renderPerfumeSection(
              'Coleção Feminina', 
              FEMININE_PERFUMES,
              ['#FFE5F1', '#FFB8DD']
            )}
            {renderPerfumeSection(
              'Coleção Masculina', 
              MASCULINE_PERFUMES,
              ['#E5F3FF', '#B8DEFF']
            )}
          </>
        )}

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Powered by Intelligent Recommendation System
          </Text>
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
    padding: 32,
    paddingTop: 50,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  loginButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  userInfo: {
    alignItems: 'flex-end',
  },
  userName: {
    fontSize: 14,
    color: 'white',
    fontWeight: '600',
    marginBottom: 4,
  },
  premiumBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4,
  },
  premiumText: {
    fontSize: 12,
    color: '#F59E0B',
    fontWeight: 'bold',
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: 'white',
  },
  subtitle: {
    fontSize: 18,
    color: 'rgba(255, 255, 255, 0.95)',
    textAlign: 'center',
    marginBottom: 8,
    fontWeight: '500',
  },
  description: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
    fontWeight: '400',
  },
  content: {
    flex: 1,
    padding: 24,
  },
  section: {
    marginBottom: 40,
  },
  sectionHeader: {
    padding: 20,
    borderRadius: 16,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 4,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
    fontWeight: '400',
  },
  searchResultsHeader: {
    backgroundColor: '#F8F9FA',
    padding: 20,
    borderRadius: 16,
    marginBottom: 20,
    borderLeftWidth: 4,
    borderLeftColor: '#667eea',
  },
  resultsCount: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 4,
  },
  footer: {
    padding: 20,
    alignItems: 'center',
    marginTop: 20,
  },
  footerText: {
    fontSize: 12,
    color: '#9CA3AF',
    fontStyle: 'italic',
  },
});