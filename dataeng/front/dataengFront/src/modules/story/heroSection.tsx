import { useEffect, useState, useRef } from 'react';
import { useScrollProgress } from '../../hooks/useScrollreveal';
import { useScrollReveal } from '../../hooks/useScrollreveal';

const WORDS = ['données', 'talents', 'connexions', 'futures', 'histoires'];

export function HeroSection() {
  const [wordIndex, setWordIndex] = useState(0);
  const scrollYProgress = useScrollProgress();

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % WORDS.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="hero-section" id="hero" aria-labelledby="hero-title">
      <div className="hero-background">
        <div 
          className="hero-orb"
          style={{
            transform: `translateY(${scrollYProgress * 100}px) scale(${1 + scrollYProgress * 0.5})`,
            opacity: 1 - scrollYProgress * 0.3
          }}
          aria-hidden="true"
        />
        <div className="hero-grid" aria-hidden="true" />
      </div>

      <div className="hero-content">
        <div className="hero-text">
          <h1 className="hero-title" id="hero-title">
            <span className="hero-static">Data Eng Congo</span>
            <br />
            <span className="hero-dynamic">
              Nous construisons l'avenir des{' '}
              <span 
                className="hero-word"
                style={{
                  color: wordIndex === 2 ? 'var(--accent-blue)' : 
                         wordIndex === 4 ? 'var(--active-green)' : 
                         'var(--text-primary)'
                }}
                aria-live="polite"
                aria-atomic="true"
              >
                {WORDS[wordIndex]}
              </span>
            </span>
          </h1>
          
          <p className="hero-subtitle">
            Le premier réseau data structuré au Congo Brazzaville
          </p>
        </div>

        <div className="hero-visual">
          <HeroCode />
        </div>
      </div>

      <div className="hero-scroll-container">
        <button
          className="hero-scroll-indicator"
          onClick={() => {
            const origineSection = document.getElementById('origine');
            if (origineSection) {
              origineSection.scrollIntoView({ behavior: 'smooth' });
            }
          }}
          aria-label="Découvrir l'histoire de Data Eng Congo"
        >
          <div className="scroll-mouse" aria-hidden="true">
            <div className="scroll-wheel"></div>
          </div>
          <div className="scroll-content">
            <span className="scroll-text">Découvrir l'histoire</span>
            <div className="scroll-arrow" aria-hidden="true">
              <svg width="20" height="12" viewBox="0 0 20 12" fill="none">
                <path d="M1 1L10 10L19 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </div>
          </div>
        </button>
      </div>
    </section>
  );
}

function HeroCode() {
  const codeRef = useRef<HTMLDivElement>(null);
  const { isVisible } = useScrollReveal({ threshold: 0.3 });
  const lines = [
    { text: 'const community = {', indent: 0, type: 'key' },
    { text: '  mission: "Connecter. Construire. Grandir.",', indent: 1, type: 'string' },
    { text: '  location: "Brazzaville, Congo",', indent: 1, type: 'string' },
    { text: '};', indent: 0, type: 'key' },
  ];

  return (
    <div 
      ref={codeRef}
      className="code-block"
      role="img"
      aria-label="Code JavaScript représentant la mission Data Eng Congo"
    >
      {lines.map((line, i) => (
        <div
          key={i}
          className={`code-line code-line--${line.type}`}
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'none' : 'translateX(-16px)',
            transition: `opacity 0.5s ease ${i * 80 + 200}ms, transform 0.5s ease ${i * 80 + 200}ms`,
          }}
          aria-hidden="true"
        >
          {line.text}
        </div>
      ))}
    </div>
  );
}
