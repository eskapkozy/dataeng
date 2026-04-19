import React from 'react';
import './styles.css'
import '../common.css'

const Home = () => {

  // How it works animation system
  React.useEffect(() => {
    const DURATION = 3000; // 3 seconds per step
    let animationId = null;
    let startTime = null;
    let currentStep = 0;
    let isPaused = false;
    
    const cards = document.querySelectorAll('.step-card');
    const totalSteps = cards.length;
    
    // Initialize first card as active
    function activateStep(stepIndex) {
      cards.forEach((card) => {
        card.classList.remove('active', 'active-glow');
        const progressBar = card.querySelector('.progress-bar');
        if (progressBar) {
          (progressBar as HTMLElement).style.transform = 'scaleX(0)';
        }
      });
      
      const activeCard = cards[stepIndex];
      if (activeCard) {
        activeCard.classList.add('active');
        // Trigger glow effect after a small delay
        setTimeout(() => {
          activeCard.classList.add('active-glow');
        }, 100);
      }
    }
    
    // Animation loop
    function animate(timestamp) {
      if (!startTime) startTime = timestamp;
      if (isPaused) return;
      
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / DURATION, 1);
      
      // Update progress bar
      const activeCard = cards[currentStep];
      const progressBar = activeCard?.querySelector('.progress-bar');
      if (progressBar) {
        (progressBar as HTMLElement).style.transform = `scaleX(${progress})`;
      }
      
      // When progress is complete, move to next step
      if (progress >= 1) {
        currentStep = (currentStep + 1) % totalSteps;
        activateStep(currentStep);
        startTime = timestamp; // Reset start time for next step
      }
      
      animationId = requestAnimationFrame(animate);
    }
    
    // Start animation
    function startAutoplay() {
      isPaused = false;
      activateStep(currentStep);
      animationId = requestAnimationFrame(animate);
    }
    
    // Pause animation
    function pauseAutoplay() {
      isPaused = true;
      if (animationId) {
        cancelAnimationFrame(animationId);
        animationId = null;
      }
    }
    
    // Manual navigation
    function goToStep(stepIndex) {
      pauseAutoplay();
      currentStep = stepIndex;
      activateStep(currentStep);
      startTime = null;
      // Restart autoplay after a delay
      setTimeout(() => {
        startAutoplay();
      }, 5000);
    }
    
    // Add click handlers to cards
    cards.forEach((card, index) => {
      card.addEventListener('click', () => goToStep(index));
      
      // Add click handler to badge dots
      const badgeDot = card.querySelector('.badge-dot');
      if (badgeDot) {
        badgeDot.addEventListener('click', (e) => {
          e.stopPropagation();
          goToStep(index);
        });
      }
    });
    
    // Start the animation
    startAutoplay();
    
    // Cleanup on unmount
    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, []);

  // Typewriter effect for hero title
  React.useEffect(() => {
    const words = ['Congo.', 'réseau.', 'avenir.'];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typewriterElement = null;
    
    const typeWriter = () => {
      if (!typewriterElement) {
        typewriterElement = document.getElementById('typewriter');
        if (!typewriterElement) return;
      }
      
      const currentWord = words[wordIndex];
      
      if (isDeleting) {
        typewriterElement.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
        
        if (charIndex === 0) {
          isDeleting = false;
          wordIndex = (wordIndex + 1) % words.length;
          setTimeout(typeWriter, 500);
          return;
        }
      } else {
        typewriterElement.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
        
        if (charIndex === currentWord.length) {
          isDeleting = true;
          setTimeout(typeWriter, 1800);
          return;
        }
      }
      
      setTimeout(typeWriter, isDeleting ? 60 : 100);
    };
    
    typeWriter();
  }, []);
  
  // Animated counters for stats
  React.useEffect(() => {
    const animateCounter = (elementId, target, delay) => {
      setTimeout(() => {
        const element = document.getElementById(elementId);
        if (!element) return;
        
        let current = 0;
        const step = Math.ceil(target / 40);
        const increment = () => {
          current = Math.min(current + step, target);
          element.textContent = current + (elementId === 'stat4' ? '%' : '');
          
          if (current < target) {
            setTimeout(increment, 30);
          }
        };
        increment();
      }, delay);
    };
    
    animateCounter('stat1', 250, 900);
    animateCounter('stat2', 45, 1000);
    animateCounter('stat3', 12, 1100);
    animateCounter('stat4', 98, 1200);
  }, []);
  
  // Ticker content generation
  React.useEffect(() => {
    const tickerItems = [
      'Data Science Congo', 'Machine Learning', 'AI Community', 'Data Engineering',
      'Analytics Congo', 'Python Data', 'Data Visualization', 'Big Data Congo',
      'Deep Learning', 'Data Mining', 'Statistical Analysis', 'Data Architecture'
    ];
    
    const tickerElement = document.getElementById('ticker-content');
    if (tickerElement) {
      const duplicatedItems = [...tickerItems, ...tickerItems, ...tickerItems, ...tickerItems];
      tickerElement.innerHTML = duplicatedItems.map(item => {
        const hasDataOrCongo = item.includes('Data') || item.includes('Congo');
        const colorClass = hasDataOrCongo ? 'text-accent' : '';
        return `<span class="ticker-item ${colorClass}">${item}</span>`;
      }).join('');
    }
  }, []);

  return (
    <div className="page home-page">
      <section className="hero-full">
        {/* Background Layers */}
        <div className="bg-grid"></div>
        <div className="bg-orb orb1"></div>
        <div className="bg-orb orb2"></div>
        
        {/* Navbar */}
        <nav className="navbar">
          <div className="nav-logo">
            <span className="logo-main">Data</span>
            <span className="logo-sub">.community</span>
          </div>
          
          <div className="nav-links">
            <a href="#" className="nav-link">Accueil</a>
            <a href="#" className="nav-link">Articles</a>
            <a href="#" className="nav-link">Événements</a>
            <a href="#" className="nav-link">À propos</a>
          </div>
          
          <div className="nav-cta">
            <button className="cta-button">Rejoindre</button>
          </div>
        </nav>
        
        {/* Hero Body */}
        <div className="hero-body">
          <div className="hero-content">
            {/* Pill Badge */}
            <div className="pill-badge">
              <div className="pill-dot"></div>
              <span className="pill-text">Communauté <span className="pill-highlight">active</span></span>
            </div>
            
            {/* Title with Typewriter */}
            <h1 className="hero-title">
              <div className="title-line">Rejoignez la</div>
              <div className="title-line">Communauté Data</div>
              <div className="title-line">du <span id="typewriter" className="typewriter-text"></span><span className="cursor"></span></div>
            </h1>
            
            {/* Subtitle */}
            <p className="hero-subtitle">
              Connectez-vous avec les <strong>data scientists</strong>, ingénieurs et développeurs passionnés par l'innovation <strong>data au Congo</strong>. Explorez, apprenez et grandissez dans notre <strong>écosystème</strong> dynamique.
            </p>
            
            {/* Buttons */}
            <div className="hero-buttons">
              <button className="btn-primary">Commencer maintenant</button>
              <button className="btn-secondary">
                En savoir plus
                <span className="btn-arrow">→</span>
              </button>
            </div>
            
            {/* Stats Row */}
            <div className="stats-row">
              <div className="stat-item">
                <div className="stat-value" id="stat1">0</div>
                <div className="stat-unit">membres</div>
                <div className="stat-label">Communauté</div>
              </div>
              <div className="stat-item">
                <div className="stat-value" id="stat2">0</div>
                <div className="stat-unit">articles</div>
                <div className="stat-label">Ressources</div>
              </div>
              <div className="stat-item">
                <div className="stat-value" id="stat3">0</div>
                <div className="stat-unit">événements</div>
                <div className="stat-label">Rencontres</div>
              </div>
              <div className="stat-item">
                <div className="stat-value" id="stat4">0</div>
                <div className="stat-unit">%</div>
                <div className="stat-label">Satisfaction</div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Ticker */}
        <div className="ticker">
          <div className="ticker-content" id="ticker-content"></div>
        </div>
      </section>
      
      <section className="main-container">
        <div className="hero-content">
          {/* First div - Title */}
          <div className="title-div">
            <h1 className="main-title">Rejoignez la Communauté Data<br/>du Congo Brazzaville</h1>
          </div>
          
          {/* Subtitle section with text blocks */}
          <div className="subtitle-section">
            <div className="subtitle-item">
              <p>Connectez-vous avec les data scientists, ingénieurs et développeurs passionnés par l'innovation data au Congo.</p>
              <a href="#" className="text-link">
                <span className="link-text">Rejoindre le réseau</span>
                <span className="view-count">250+ Membres</span>
              </a>
            </div>
            
            <div className="subtitle-item">
              <p>Explorez les sujets data autour du Congo et développez vos compétences grâce à notre communauté autodidacte.</p>
              <a href="#" className="text-link">
                <span className="link-text">Découvrir les articles</span>
                <span className="view-count">45 Articles</span>
              </a>
            </div>
            
            <div className="subtitle-item">
              <p>Participez à nos événements data et accélérez votre réussite professionnelle dans le domaine de la data.</p>
              <a href="#" className="text-link">
                <span className="link-text">Voir les événements</span>
                <span className="view-count">12 Événements</span>
              </a>
            </div>
            
            <div className="subtitle-item">
              <p>Sensibilisons les entreprises et les jeunes aux opportunités data pour construire l'écosystème du Congo.</p>
              <a href="#" className="text-link">
                <span className="link-text">S'inscrire au club</span>
                <span className="view-count">Point d'enrôlement</span>
              </a>
            </div>
          </div>
          
          {/* Second div - Group of 4 colored card buttons */}
          <div className="content-div">
            <div className="content-item purple-card card-hover">
              <div className="card-number">01</div>
              <div className="card-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  <circle cx="8.5" cy="7" r="4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="m20 8-6 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="m20 14-6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </div>
              <div className="card-illustration">
                <svg width="120" height="120" viewBox="0 0 200 200" fill="none">
                  <circle cx="100" cy="100" r="80" stroke="currentColor" stroke-width="2" opacity="0.3"/>
                  <circle cx="100" cy="100" r="60" stroke="currentColor" stroke-width="2" opacity="0.5"/>
                  <circle cx="100" cy="100" r="40" stroke="currentColor" stroke-width="2" opacity="0.7"/>
                  <circle cx="100" cy="100" r="20" fill="currentColor" opacity="0.9"/>
                  <path d="M100 60 L100 140 M60 100 L140 100" stroke="currentColor" stroke-width="3" opacity="0.8"/>
                  <circle cx="60" cy="60" r="8" fill="currentColor" opacity="0.6"/>
                  <circle cx="140" cy="60" r="8" fill="currentColor" opacity="0.6"/>
                  <circle cx="60" cy="140" r="8" fill="currentColor" opacity="0.6"/>
                  <circle cx="140" cy="140" r="8" fill="currentColor" opacity="0.6"/>
                </svg>
              </div>
              <div className="card-overlay">
                <div className="overlay-button">
                  Rejoindre le réseau
                </div>
              </div>
            </div>
            
            <div className="content-item orange-card card-hover">
              <div className="card-number">02</div>
              <div className="card-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  <polyline points="14,2 14,8 20,8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  <line x1="16" y1="13" x2="8" y2="13" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  <line x1="16" y1="17" x2="8" y2="17" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  <polyline points="10,9 9,9 8,9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </div>
              <div className="card-illustration">
                <svg width="120" height="120" viewBox="0 0 200 200" fill="none">
                  <rect x="40" y="30" width="120" height="140" rx="8" stroke="currentColor" stroke-width="2" opacity="0.3"/>
                  <rect x="50" y="40" width="100" height="120" rx="4" stroke="currentColor" stroke-width="2" opacity="0.5"/>
                  <line x1="60" y1="60" x2="140" y2="60" stroke="currentColor" stroke-width="2" opacity="0.7"/>
                  <line x1="60" y1="80" x2="140" y2="80" stroke="currentColor" stroke-width="2" opacity="0.7"/>
                  <line x1="60" y1="100" x2="120" y2="100" stroke="currentColor" stroke-width="2" opacity="0.7"/>
                  <line x1="60" y1="120" x2="130" y2="120" stroke="currentColor" stroke-width="2" opacity="0.7"/>
                  <line x1="60" y1="140" x2="110" y2="140" stroke="currentColor" stroke-width="2" opacity="0.7"/>
                  <circle cx="150" cy="50" r="15" fill="currentColor" opacity="0.8"/>
                  <path d="M150 45 L155 50 L150 55" stroke="white" stroke-width="2" fill="none"/>
                </svg>
              </div>
              <div className="card-overlay">
                <div className="overlay-button">
                  Découvrir les articles
                </div>
              </div>
            </div>
            
            <div className="content-item green-card card-hover">
              <div className="card-number">03</div>
              <div className="card-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  <line x1="16" y1="2" x2="16" y2="6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  <line x1="8" y1="2" x2="8" y2="6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  <line x1="3" y1="10" x2="21" y2="10" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </div>
              <div className="card-illustration">
                <svg width="120" height="120" viewBox="0 0 200 200" fill="none">
                  <rect x="30" y="50" width="140" height="100" rx="8" stroke="currentColor" stroke-width="2" opacity="0.3"/>
                  <rect x="40" y="60" width="120" height="80" rx="4" stroke="currentColor" stroke-width="2" opacity="0.5"/>
                  <rect x="50" y="70" width="100" height="60" rx="2" stroke="currentColor" stroke-width="2" opacity="0.7"/>
                  <line x1="60" y1="80" x2="140" y2="80" stroke="currentColor" stroke-width="2" opacity="0.8"/>
                  <line x1="60" y1="90" x2="130" y2="90" stroke="currentColor" stroke-width="2" opacity="0.8"/>
                  <line x1="60" y1="100" x2="120" y2="100" stroke="currentColor" stroke-width="2" opacity="0.8"/>
                  <line x1="60" y1="110" x2="110" y2="110" stroke="currentColor" stroke-width="2" opacity="0.8"/>
                  <line x1="60" y1="120" x2="100" y2="120" stroke="currentColor" stroke-width="2" opacity="0.8"/>
                  <circle cx="100" cy="40" r="12" fill="currentColor" opacity="0.9"/>
                  <circle cx="130" cy="40" r="12" fill="currentColor" opacity="0.9"/>
                  <circle cx="70" cy="40" r="12" fill="currentColor" opacity="0.9"/>
                </svg>
              </div>
              <div className="card-overlay">
                <div className="overlay-button">
                  Voir les événements
                </div>
              </div>
            </div>
            
            <div className="content-item grey-card card-hover">
              <div className="card-number">04</div>
              <div className="card-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  <circle cx="9" cy="7" r="4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </div>
              <div className="card-illustration">
                <svg width="120" height="120" viewBox="0 0 200 200" fill="none">
                  <circle cx="100" cy="80" r="40" stroke="currentColor" stroke-width="2" opacity="0.3"/>
                  <circle cx="70" cy="120" r="30" stroke="currentColor" stroke-width="2" opacity="0.4"/>
                  <circle cx="130" cy="120" r="30" stroke="currentColor" stroke-width="2" opacity="0.4"/>
                  <circle cx="100" cy="80" r="20" fill="currentColor" opacity="0.8"/>
                  <circle cx="70" cy="120" r="15" fill="currentColor" opacity="0.7"/>
                  <circle cx="130" cy="120" r="15" fill="currentColor" opacity="0.7"/>
                  <path d="M100 80 L70 120 M100 80 L130 120" stroke="currentColor" stroke-width="2" opacity="0.6"/>
                  <circle cx="100" cy="80" r="8" fill="white" opacity="0.9"/>
                  <circle cx="70" cy="120" r="6" fill="white" opacity="0.8"/>
                  <circle cx="130" cy="120" r="6" fill="white" opacity="0.8"/>
                  <circle cx="50" cy="60" r="8" fill="currentColor" opacity="0.5"/>
                  <circle cx="150" cy="60" r="8" fill="currentColor" opacity="0.5"/>
                  <circle cx="50" cy="140" r="8" fill="currentColor" opacity="0.5"/>
                  <circle cx="150" cy="140" r="8" fill="currentColor" opacity="0.5"/>
                </svg>
              </div>
              <div className="card-overlay">
                <div className="overlay-button">
                  S'inscrire au club
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

            <section className="how-it-works">
              <div className="section-header">
                <h2 className="section-title">How it works</h2>
                <div className="section-subtitle">Découvrez comment rejoindre notre communauté data en 4 étapes simples</div>
              </div>
              
              <div className="steps-container">
                <div className="step-card" data-step="0">
                  <div className="progress-bar"></div>
                  <div className="step-number">01</div>
                  <div className="step-icon">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                      <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                      <circle cx="8.5" cy="7" r="4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                      <path d="m20 8-6 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                      <path d="m20 14-6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                  </div>
                  <h3 className="step-title">Rejoindre le réseau</h3>
                  <p className="step-description">Connectez-vous avec les data scientists, ingénieurs et développeurs passionnés par l'innovation data au Congo.</p>
                  <div className="step-badge">
                    <div className="badge-dot"></div>
                    <span className="badge-text">En cours</span>
                  </div>
                </div>
                
                <div className="step-card" data-step="1">
                  <div className="progress-bar"></div>
                  <div className="step-number">02</div>
                  <div className="step-icon">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                      <polyline points="14,2 14,8 20,8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                      <line x1="16" y1="13" x2="8" y2="13" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                      <line x1="16" y1="17" x2="8" y2="17" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                      <polyline points="10,9 9,9 8,9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                  </div>
                  <h3 className="step-title">Explorer les articles</h3>
                  <p className="step-description">Explorez les sujets data autour du Congo et développez vos compétences grâce à notre communauté autodidacte.</p>
                  <div className="step-badge">
                    <div className="badge-dot"></div>
                    <span className="badge-text">Apprendre</span>
                  </div>
                </div>
                
                <div className="step-card" data-step="2">
                  <div className="progress-bar"></div>
                  <div className="step-number">03</div>
                  <div className="step-icon">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                      <line x1="16" y1="2" x2="16" y2="6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                      <line x1="8" y1="2" x2="8" y2="6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                      <line x1="3" y1="10" x2="21" y2="10" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                  </div>
                  <h3 className="step-title">Participer aux événements</h3>
                  <p className="step-description">Participez à nos événements data et accélérez votre réussite professionnelle dans le domaine de la data.</p>
                  <div className="step-badge">
                    <div className="badge-dot"></div>
                    <span className="badge-text">Événements</span>
                  </div>
                </div>
                
                <div className="step-card" data-step="3">
                  <div className="progress-bar"></div>
                  <div className="step-number">04</div>
                  <div className="step-icon">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                      <circle cx="9" cy="7" r="4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                      <path d="M23 21v-2a4 4 0 0 0-3-3.87" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                      <path d="M16 3.13a4 4 0 0 1 0 7.75" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                  </div>
                  <h3 className="step-title">S'inscrire au club</h3>
                  <p className="step-description">Sensibilisons les entreprises et les jeunes aux opportunités data pour construire l'écosystème du Congo.</p>
                  <div className="step-badge">
                    <div className="badge-dot"></div>
                    <span className="badge-text">Club</span>
                  </div>
                </div>
              </div>
            </section>

      <section className="feature">
        <div className="feature-container">
          {/* Feature 1 — Apprendre par le réel */}
          <div className="feature-card learn">
            <div className="feature-icon">
              <div className="icon-projects">📊</div>
            </div>
            <h3 className="feature-title">De l'Autoformation à l'Expertise</h3>
            <p className="feature-description">
              Arrêtez d'apprendre seul ! Transformez vos connaissances autodidactes 
              en projets concrets. Passez de théorie à la pratique avec des vrais défis.
            </p>
            <div className="feature-visual">
              <div className="project-card">
                <div className="project-header">
                  <span className="project-tag">PROJET RÉEL</span>
                  <span className="project-status">💻 Actif</span>
                </div>
                <h4 className="project-title">API Data pour Start-up Locale</h4>
                <p className="project-desc">Full-stack : Python + React + PostgreSQL</p>
              </div>
            </div>
            <a href="#" className="feature-link">Lancer mon premier projet pro &#8594;</a>
          </div>

          {/* Feature 2 — Montrer ses compétences */}
          <div className="feature-card portfolio">
            <div className="feature-icon">
              <div className="icon-portfolio">💼</div>
            </div>
            <h3 className="feature-title">Validez Vos Compétences </h3>
            <p className="feature-description">
              Pas de diplôme ? Pas de problème ! Montrez ce que vous savez FAIRE. 
              Votre portfolio vaut plus qu'un CV classique pour les recruteurs.
            </p>
            <div className="feature-visual">
              <div className="profile-preview">
                <div className="profile-header">
                  <div className="profile-avatar">🚀</div>
                  <div className="profile-info">
                    <h5>Mon Portfolio Technique</h5>
                    <span className="profile-stats">🔧 8 projets full-stack</span>
                  </div>
                </div>
                <div className="profile-articles">
                  <div className="article-item">🤖 ML Pipeline from scratch</div>
                  <div className="article-item">⚡ Microservices architecture</div>
                </div>
              </div>
            </div>
            <a href="#" className="feature-link">Créer mon portfolio dev &#8594;</a>
          </div>

          {/* Feature 3 — Rejoindre une communauté */}
          <div className="feature-card community">
            <div className="feature-icon">
              <div className="icon-community">🌍</div>
            </div>
            <h3 className="feature-title">Connectez-vous avec des Pairs</h3>
            <p className="feature-description">
              Retrouvez d'autres autodidactes comme vous ! Échangez sur les défis 
              techniques, partagez vos ressources et avancez ensemble dans votre carrière.
            </p>
            <div className="feature-visual">
              <div className="community-preview">
                <div className="event-item">
                  <span className="event-date">👨‍💻 25 Jan</span>
                  <span className="event-title">Code Review Session - Data & Software</span>
                </div>
                <div className="event-item">
                  <span className="event-date">🔧 08 Fév</span>
                  <span className="event-title">Partage : Comment passer de Junior à Senior</span>
                </div>
                <div className="community-stats">
                  <span>👥 500+ dev & data autodidactes</span>
                  <span>💡 20 sessions mentorat/mois</span>
                </div>
              </div>
            </div>
            <a href="#" className="feature-link">Rejoindre les devs autodidactes &#8594;</a>
          </div>
        </div>
      </section>   
      <section className="testimonials">
        <h2 className="testimonials-title">Leurs retours d'expérience</h2>
        <div className="testimonials-container">
          <div className="testimonial-card">
            <div className="testimonial-content">
              <p className="testimonial-quote">
                "Bondlayer made our process so simple! We can design and test in use immediatly."
              </p>
            </div>
            <div className="testimonial-author">
              <div className="author-avatar">
                <img src="/src/assets/hero.png" alt="Lisa Cosme" />
              </div>
              <div className="author-info">
                <h4 className="author-name">Lisa Cosme</h4>
                <p className="author-title">Designer at Significa</p>
              </div>
            </div>
          </div>

          <div className="testimonial-card">
            <div className="testimonial-content">
              <p className="testimonial-quote">
                "We created all the Rock in Rio website in 14 days without the single line of code!"
              </p>
              <div className="zero-code-badge">
                <span className="zero-code-text">ZERO CODE</span>
                <span className="hashtag">#nocode</span>
              </div>
            </div>
            <div className="testimonial-author">
              <div className="author-avatar">
                <img src="/src/assets/hero.png" alt="Gioseppe Prancetino" />
              </div>
              <div className="author-info">
                <h4 className="author-name">Gioseppe Prancetino</h4>
                <p className="author-title">Marketing VP at Rockin Rio</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
