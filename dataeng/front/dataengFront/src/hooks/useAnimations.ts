import { useState, useEffect, useCallback } from 'react'

// Hook pour l'effet d'étirement entre sections
export function useStretchEffect() {
  const [stretchFactor, setStretchFactor] = useState(1);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          const windowHeight = window.innerHeight;
          const documentHeight = document.documentElement.scrollHeight;
          const scrollProgress = scrollY / (documentHeight - windowHeight);
          
          // Effet d'étirement léger (1 à 1.05)
          const stretch = 1 + (scrollProgress * 0.05);
          setStretchFactor(stretch);
          
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return { stretchFactor };
}

// Hook pour les effets de particules
export function useParticleEffect() {
  const [particles, setParticles] = useState<Array<{id: number, x: number, y: number, size: number, color: string}>>([]);

  const createParticles = useCallback((x: number, y: number, count = 5) => {
    const newParticles = Array.from({ length: count }, (_, i) => ({
      id: Date.now() + i,
      x: x + (Math.random() - 0.5) * 50,
      y: y + (Math.random() - 0.5) * 50,
      size: Math.random() * 4 + 2,
      color: ['#4F6EF7', '#7B5CF5', '#3ecf8e', '#F5A623'][Math.floor(Math.random() * 4)]
    }));
    
    setParticles(prev => [...prev, ...newParticles]);
    
    // Nettoyer les particules après l'animation
    setTimeout(() => {
      setParticles(prev => prev.filter(p => !newParticles.some(np => np.id === p.id)));
    }, 1000);
  }, []);

  return { particles, createParticles };
}
