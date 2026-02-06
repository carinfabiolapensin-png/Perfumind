import { Head } from 'expo-router';

export function WebHead() {
  return (
    <Head>
      <title>Perfumind - Sistema Inteligente de Recomendação de Perfumes</title>
      <meta name="description" content="Descubra fragrâncias que revelam sua essência única através de análise olfativa e comportamental avançada. Sistema inteligente de recomendação de perfumes baseado em IA." />
      <meta name="keywords" content="perfumes, fragrâncias, recomendação de perfumes, análise olfativa, perfumes femininos, perfumes masculinos, cheiro, essência" />
      
      {/* Open Graph */}
      <meta property="og:title" content="Perfumind - Recomendação Inteligente de Perfumes" />
      <meta property="og:description" content="Sistema inteligente que combina análise olfativa com perfil comportamental para recomendar perfumes perfeitos para você." />
      <meta property="og:type" content="website" />
      <meta property="og:image" content="/og-image.png" />
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Perfumind - Recomendação Inteligente de Perfumes" />
      <meta name="twitter:description" content="Descubra sua fragrância ideal através de análise comportamental avançada." />
      
      {/* Viewport & Mobile */}
      <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
      <meta name="theme-color" content="#667eea" />
      
      {/* Performance */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
    </Head>
  );
}
