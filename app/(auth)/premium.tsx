import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '@/hooks/useAuth';

export default function PremiumPage() {
  const { user, upgradeToPremium } = useAuth();

  const handleUpgrade = () => {
    // TODO: Integrar com Stripe/PayPal
    upgradeToPremium();
    router.back();
  };

  const features = [
    {
      icon: 'infinite',
      title: 'Recomendações Ilimitadas',
      description: 'Descubra quantos perfumes quiser, sem limites',
    },
    {
      icon: 'heart',
      title: 'Favoritos Ilimitados',
      description: 'Salve todos os seus perfumes preferidos',
    },
    {
      icon: 'analytics',
      title: 'Análise Avançada',
      description: 'Perfil comportamental detalhado e insights profundos',
    },
    {
      icon: 'link',
      title: 'Links de Afiliados',
      description: 'Compre direto com descontos exclusivos',
    },
    {
      icon: 'notifications',
      title: 'Alertas de Lançamentos',
      description: 'Seja o primeiro a saber de novos perfumes',
    },
    {
      icon: 'ban',
      title: 'Sem Anúncios',
      description: 'Experiência premium sem interrupções',
    },
  ];

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <LinearGradient
        colors={['#F59E0B', '#D97706', '#B45309']}
        style={styles.header}
      >
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="close" size={24} color="white" />
        </TouchableOpacity>
        
        <View style={styles.headerContent}>
          <Ionicons name="diamond" size={60} color="white" />
          <Text style={styles.title}>Perfumind Premium</Text>
          <Text style={styles.subtitle}>Desbloqueie todo o potencial</Text>
        </View>

        <View style={styles.priceContainer}>
          <Text style={styles.priceLabel}>A partir de</Text>
          <Text style={styles.price}>R$ 9,90<Text style={styles.pricePeriod}>/mês</Text></Text>
          <Text style={styles.priceAnnual}>ou R$ 79,90/ano (economize 33%)</Text>
        </View>
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.featuresTitle}>Recursos Premium</Text>
        
        {features.map((feature, index) => (
          <View key={index} style={styles.featureCard}>
            <View style={styles.featureIconContainer}>
              <Ionicons name={feature.icon as any} size={28} color="#F59E0B" />
            </View>
            <View style={styles.featureContent}>
              <Text style={styles.featureTitle}>{feature.title}</Text>
              <Text style={styles.featureDescription}>{feature.description}</Text>
            </View>
          </View>
        ))}

        <View style={styles.comparisonContainer}>
          <Text style={styles.comparisonTitle}>Comparação de Planos</Text>
          
          <View style={styles.comparisonTable}>
            <View style={styles.comparisonRow}>
              <Text style={styles.comparisonLabel}>Recomendações</Text>
              <Text style={styles.comparisonFree}>3 por busca</Text>
              <Text style={styles.comparisonPremium}>Ilimitadas</Text>
            </View>
            <View style={styles.comparisonRow}>
              <Text style={styles.comparisonLabel}>Favoritos</Text>
              <Text style={styles.comparisonFree}>Até 5</Text>
              <Text style={styles.comparisonPremium}>Ilimitados</Text>
            </View>
            <View style={styles.comparisonRow}>
              <Text style={styles.comparisonLabel}>Análise</Text>
              <Text style={styles.comparisonFree}>Básica</Text>
              <Text style={styles.comparisonPremium}>Avançada</Text>
            </View>
          </View>
        </View>

        <View style={styles.guaranteeContainer}>
          <Ionicons name="shield-checkmark" size={32} color="#10B981" />
          <Text style={styles.guaranteeText}>
            Garantia de 7 dias - Cancele quando quiser
          </Text>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.upgradeButton} onPress={handleUpgrade}>
          <LinearGradient
            colors={['#F59E0B', '#D97706']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.upgradeButtonGradient}
          >
            <Ionicons name="diamond" size={20} color="white" />
            <Text style={styles.upgradeButtonText}>Assinar Premium</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
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
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerContent: {
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 16,
  },
  subtitle: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.9)',
    marginTop: 8,
  },
  priceContainer: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
  },
  priceLabel: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.9)',
    fontWeight: '500',
  },
  price: {
    fontSize: 48,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 4,
  },
  pricePeriod: {
    fontSize: 20,
  },
  priceAnnual: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.9)',
    marginTop: 8,
  },
  content: {
    flex: 1,
    padding: 24,
  },
  featuresTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 20,
  },
  featureCard: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  featureIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#FEF3C7',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  featureContent: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 4,
  },
  featureDescription: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
  },
  comparisonContainer: {
    marginTop: 32,
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    elevation: 2,
  },
  comparisonTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 16,
  },
  comparisonTable: {
    gap: 12,
  },
  comparisonRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  comparisonLabel: {
    flex: 1,
    fontSize: 14,
    color: '#4B5563',
    fontWeight: '500',
  },
  comparisonFree: {
    flex: 1,
    fontSize: 14,
    color: '#9CA3AF',
    textAlign: 'center',
  },
  comparisonPremium: {
    flex: 1,
    fontSize: 14,
    color: '#F59E0B',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  guaranteeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F0FDF4',
    padding: 16,
    borderRadius: 12,
    marginTop: 24,
    marginBottom: 20,
  },
  guaranteeText: {
    marginLeft: 12,
    fontSize: 14,
    color: '#047857',
    fontWeight: '500',
  },
  footer: {
    padding: 24,
    paddingBottom: 32,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  upgradeButton: {
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 4,
    shadowColor: '#F59E0B',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  upgradeButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 18,
    gap: 8,
  },
  upgradeButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
