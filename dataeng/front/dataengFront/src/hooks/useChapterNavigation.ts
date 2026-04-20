import { useState, useEffect } from 'react';

export function useChapterNavigation() {
  const [showNavigation, setShowNavigation] = useState(false);
  const [activeSection, setActiveSection] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('section[id]');
      const scrollPosition = window.scrollY + window.innerHeight / 2;
      
      // Logique simplifiée : afficher la navigation dès qu'on quitte le hero
      const heroSection = document.getElementById('hero');
      const firstChapter = document.getElementById('origine');
      
      let shouldShow = false;
      
      if (heroSection) {
        const heroBottom = (heroSection as HTMLElement).offsetTop + (heroSection as HTMLElement).offsetHeight;
        shouldShow = scrollPosition >= heroBottom;
      } else if (firstChapter) {
        const firstChapterTop = (firstChapter as HTMLElement).offsetTop;
        shouldShow = scrollPosition >= firstChapterTop;
      } else {
        // Fallback : afficher si on a scrollé au moins 200px
        shouldShow = scrollPosition > 200;
      }
      
      setShowNavigation(shouldShow);

      // Mettre à jour la section active
      sections.forEach((section, index) => {
        const element = section as HTMLElement;
        const { offsetTop, offsetHeight } = element;
        
        if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
          setActiveSection(index);
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial call
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return {
    showNavigation,
    activeSection,
    scrollToSection,
  };
}
