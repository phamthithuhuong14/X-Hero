import React, { createContext, useState, useContext, useEffect } from 'react';

interface Hero {
  id: number;
  name: string;
  image: string;
  stats: {
    attack: number;
    defense: number;
  };
}

interface HeroProviderProps {
    children: React.ReactNode;
  }

interface HeroContextType {
  heroes: Hero[];
  addHero: (hero: Omit<Hero, 'id'>) => void;
}

const HeroContext = createContext<HeroContextType | undefined>(undefined);

export const HeroProvider: React.FC<HeroProviderProps> = ({ children }) => {
  const [heroes, setHeroes] = useState<Hero[]>([]);

  useEffect(() => {
    
    const storedHeroes = localStorage.getItem('heroes');
    if (storedHeroes) {
      setHeroes(JSON.parse(storedHeroes));
    }
  }, []);

  const addHero = (newHero: Omit<Hero, 'id'>) => {
    const hero = { ...newHero, id: Date.now() };
    
    setHeroes
    (() => {
        const updatedHeroes = [...heroes, hero]
        localStorage.setItem('heroes', JSON.stringify(updatedHeroes))
        return updatedHeroes;
    })
  };

  return (
    <HeroContext.Provider value={{ heroes, addHero }}>
      {children}
    </HeroContext.Provider>
  );
};

export const useHero = () => {
  const context = useContext(HeroContext);
  if (context === undefined) {
    throw new Error('useHero must be used within a HeroProvider');
  }
  return context;
};