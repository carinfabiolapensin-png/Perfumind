import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { User, PlanType } from '@/types/user';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, name: string) => Promise<void>;
  logout: () => void;
  upgradeToPremium: () => void;
  addFavorite: (perfumeId: string) => void;
  removeFavorite: (perfumeId: string) => void;
  isFavorite: (perfumeId: string) => boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simular carregamento inicial
    // Quando Supabase estiver conectado, verificar sessão aqui
    const loadUser = async () => {
      try {
        // TODO: Integrar com Supabase
        // const session = await supabase.auth.getSession();
        // if (session?.user) { setUser(...) }
        
        setIsLoading(false);
      } catch (error) {
        console.error('Erro ao carregar usuário:', error);
        setIsLoading(false);
      }
    };

    loadUser();
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // TODO: Integrar com Supabase Auth
      // const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      
      // Mock temporário
      const mockUser: User = {
        id: '1',
        email,
        name: email.split('@')[0],
        plan: 'free',
        createdAt: new Date().toISOString(),
        favoritesPerfumes: [],
        searchHistory: [],
      };
      
      setUser(mockUser);
    } catch (error) {
      throw new Error('Erro ao fazer login');
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (email: string, password: string, name: string) => {
    setIsLoading(true);
    try {
      // TODO: Integrar com Supabase Auth
      // const { data, error } = await supabase.auth.signUp({ email, password });
      
      // Mock temporário
      const mockUser: User = {
        id: '1',
        email,
        name,
        plan: 'free',
        createdAt: new Date().toISOString(),
        favoritesPerfumes: [],
        searchHistory: [],
      };
      
      setUser(mockUser);
    } catch (error) {
      throw new Error('Erro ao criar conta');
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    // TODO: Integrar com Supabase
    // await supabase.auth.signOut();
    setUser(null);
  };

  const upgradeToPremium = () => {
    if (user) {
      setUser({ ...user, plan: 'premium' });
      // TODO: Integrar com sistema de pagamento
    }
  };

  const addFavorite = (perfumeId: string) => {
    if (user && !user.favoritesPerfumes.includes(perfumeId)) {
      setUser({
        ...user,
        favoritesPerfumes: [...user.favoritesPerfumes, perfumeId],
      });
      // TODO: Salvar no Supabase
    }
  };

  const removeFavorite = (perfumeId: string) => {
    if (user) {
      setUser({
        ...user,
        favoritesPerfumes: user.favoritesPerfumes.filter(id => id !== perfumeId),
      });
      // TODO: Salvar no Supabase
    }
  };

  const isFavorite = (perfumeId: string): boolean => {
    return user?.favoritesPerfumes.includes(perfumeId) || false;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        signup,
        logout,
        upgradeToPremium,
        addFavorite,
        removeFavorite,
        isFavorite,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
