import React, { useEffect, useState } from 'react'
import './styles.css'

const Events: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'upcoming' | 'past'>('upcoming')
  const [activeFilter, setActiveFilter] = useState('tous')
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, mins: 0, secs: 0 })
  const [visibleCount, setVisibleCount] = useState(0)

  // Données des événements
  const upcomingEvents = [
    {
      id: 'e1', tab: 'upcoming', type: 'meetup', color: '#4F6EF7',
      date: 'Sam 15 juin 2025 · 14h00',
      title: 'Data Engineering #3 - Pipelines & Orchestration',
      desc: 'Construire des pipelines robustes avec Airflow et Docker. Retours d\'expérience terrain.',
      speakers: ['JM','GK','CB'], lieu: 'Brazzaville · Présentiel', participants: 87
    },
    {
      id: 'e2', tab: 'upcoming', type: 'workshop', color: '#3ecf8e',
      date: 'Sam 29 juin 2025 · 10h00',
      title: 'Workshop Python & Data',
      desc: 'Atelier pratique sur les bibliothèques Python pour l\'analyse de données.',
      speakers: ['LP','OT'], lieu: 'Brazzaville · Présentiel', participants: 45
    },
    {
      id: 'e3', tab: 'upcoming', type: 'hackathon', color: '#7B5CF5',
      date: 'Ven 12 juillet 2025 · 18h00',
      title: 'Data Hackathon 2025',
      desc: '48h pour résoudre des défis data réels avec des datasets congolais.',
      speakers: ['JM','GK','CB','LP','OT'], lieu: 'Kinshasa · Hybride', participants: 120
    },
    {
      id: 'e4', tab: 'upcoming', type: 'online', color: '#F5A623',
      date: 'Mer 24 juillet 2025 · 16h00',
      title: 'Webinar ML Engineering',
      desc: 'Déploiement de modèles ML en production avec MLOps.',
      speakers: ['CB'], lieu: 'Online · Zoom', participants: 200
    }
  ]

  const pastEvents = [
    {
      id: 'p1', tab: 'past', type: 'meetup', color: '#4F6EF7',
      date: 'Sam 18 mai 2024',
      title: 'Data Engineering #2 - ETL & Docker',
      desc: 'Pipeline ETL avec Airflow, Docker et PostgreSQL. 80 participants présents.',
      speakers: ['JM','GK','CB'], lieu: 'Brazzaville · Présentiel', stats: { vues: 1240, ressources: 3 }, recap: true
    },
    {
      id: 'p2', tab: 'past', type: 'workshop', color: '#3ecf8e',
      date: 'Sam 6 avril 2024',
      title: 'Workshop Data Visualisation',
      desc: 'Création de dashboards interactifs avec Tableau et Power BI.',
      speakers: ['LP','OT'], lieu: 'Brazzaville · Présentiel', stats: { vues: 890, ressources: 5 }, recap: true
    },
    {
      id: 'p3', tab: 'past', type: 'meetup', color: '#4F6EF7',
      date: 'Ven 15 mars 2024',
      title: 'Data Engineering #1 - Introduction',
      desc: 'Premier meetup Data Eng Congo avec présentation du projet.',
      speakers: ['JM','GK'], lieu: 'Brazzaville · Présentiel', stats: { vues: 2100, ressources: 8 }, recap: true
    }
  ]

  const allEvents = [...upcomingEvents, ...pastEvents]

  // Countdown timer
  useEffect(() => {
    const targetDate = new Date('2025-06-15T14:00:00').getTime()
    
    const updateCountdown = () => {
      const now = new Date().getTime()
      const distance = targetDate - now
      
      if (distance > 0) {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24))
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
        const mins = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
        const secs = Math.floor((distance % (1000 * 60)) / 1000)
        
        setCountdown({ days, hours, mins, secs })
      }
    }
    
    updateCountdown()
    const timer = setInterval(updateCountdown, 1000)
    
    return () => clearInterval(timer)
  }, [])

  // Filter events
  const filteredEvents = allEvents.filter(event => {
    const tabMatch = event.tab === activeTab
    const filterMatch = activeFilter === 'tous' || event.type === activeFilter
    return tabMatch && filterMatch
  })

  useEffect(() => {
    setVisibleCount(filteredEvents.length)
  }, [filteredEvents])

  return (
    <div className="events-page">
      {/* Hero Section - Aligné à gauche */}
      <section className="hero-section">
        {/* Arrière-plan dynamique digital */}
        <div className="hero-bg">
          {/* Grille digitale animée */}
          <div className="digital-grid"></div>
          
          {/* Points de connexion */}
          <div className="connection-dots">
            <div className="connection-dot"></div>
            <div className="connection-dot"></div>
            <div className="connection-dot"></div>
            <div className="connection-dot"></div>
            <div className="connection-dot"></div>
          </div>
          
          {/* Lignes de connexion */}
          <div className="connection-lines">
            <div className="connection-line"></div>
            <div className="connection-line"></div>
            <div className="connection-line"></div>
          </div>
          
          {/* Carte du Congo */}
          <div className="congo-map">
            <img 
              src="/src/assets/congo-map-simplified.svg" 
              alt="Carte du Congo" 
              className="map-svg"
            />
          </div>
          
          {/* Particules flottantes */}
          <div className="floating-particles">
            <div className="particle"></div>
            <div className="particle"></div>
            <div className="particle"></div>
            <div className="particle"></div>
            <div className="particle"></div>
            <div className="particle"></div>
            <div className="particle"></div>
            <div className="particle"></div>
          </div>
        </div>
        
        <div className="hero-content">
          <div className="event-badge">
            <div className="badge-dot"></div>
            <span>Événement en cours</span>
          </div>
          
          <h1 className="hero-title">
            Data Engineering #3 - <span className="accent">Pipelines</span> & Orchestration
          </h1>
          
          <div className="event-date">
            Samedi 15 juin 2025 · Brazzaville
          </div>

          <div className="countdown">
            <div className="countdown-block">
              <span className="countdown-value">{String(countdown.days).padStart(2,'0')}</span>
              <span className="countdown-label">Jours</span>
            </div>
            <div className="countdown-block">
              <span className="countdown-value">{String(countdown.hours).padStart(2,'0')}</span>
              <span className="countdown-label">Heures</span>
            </div>
            <div className="countdown-block">
              <span className="countdown-value">{String(countdown.mins).padStart(2,'0')}</span>
              <span className="countdown-label">Min</span>
            </div>
            <div className="countdown-block">
              <span className="countdown-value">{String(countdown.secs).padStart(2,'0')}</span>
              <span className="countdown-label">Sec</span>
            </div>
          </div>

          <div className="hero-cta">
            <button className="cta-button">
              S'inscrire maintenant
            </button>
            <span className="cta-text">
              Places limitées • 120 participants max
            </span>
          </div>
        </div>
      </section>

      {/* Navigation et filtres */}
      <section className="nav-filters">
        <div className="tabs">
          <button 
            className={`tab-btn ${activeTab === 'upcoming' ? 'active' : ''}`}
            onClick={() => setActiveTab('upcoming')}
          >
            Upcoming
          </button>
          <button 
            className={`tab-btn ${activeTab === 'past' ? 'active' : ''}`}
            onClick={() => setActiveTab('past')}
          >
            Past
          </button>
        </div>
        
        <div className="filters">
          {['tous', 'meetup', 'workshop', 'hackathon', 'online'].map(filter => (
            <button
              key={filter}
              className={`filter-btn ${activeFilter === filter ? 'active' : ''}`}
              onClick={() => setActiveFilter(filter)}
            >
              {filter}
            </button>
          ))}
        </div>
        
        <div className="results-count">
          {visibleCount} événement{visibleCount > 1 ? 's' : ''}
        </div>
      </section>

      {/* Grille d'événements */}
      <section className="events-grid">
        {filteredEvents.map((event) => (
          <div 
            key={event.id} 
            className="event-card"
            data-tab={event.tab} 
            data-type={event.type}
          >
            <div className="event-content">
              {/* Category tag - Pattern home */}
              <span className="event-category-tag">{event.type}</span>
              
              {/* Title - Pattern home */}
              <h3 className="event-title">{event.title}</h3>
              
              {/* Description - Pattern home */}
              <p className="event-description">{event.desc}</p>
              
              {/* Author/Event info - Pattern home */}
              <div className="event-author">
                <div className="event-avatar" style={{ backgroundColor: event.color }}>
                  DE
                </div>
                <div className="event-author-info">
                  <div className="event-author-name">Data Eng Congo</div>
                  <div className="event-author-meta">{event.date}</div>
                </div>
              </div>
              
              {/* Stats - Pattern home */}
              <div className="event-stats">
                <div className="event-stat-item">
                  <svg width="14" height="14" viewBox="0 0 20 20" fill="none">
                    <path d="M12 5v10M8 7v8M4 9v2m12-2v2" stroke="currentColor" strokeWidth="1.5"/>
                  </svg>
                  <span>{'participants' in event ? event.participants : 0} participants</span>
                </div>
                <div className="event-stat-item">
                  <svg width="14" height="14" viewBox="0 0 20 20" fill="none">
                    <path d="M3 5h14M3 10h14M3 15h14" stroke="currentColor" strokeWidth="1.5"/>
                  </svg>
                  <span>{'lieu' in event ? event.lieu : 'En ligne'}</span>
                </div>
              </div>
              
              {/* RSVP Button - Pattern home */}
              <button className="event-rsvp-btn">RSVP</button>
            </div>
          </div>
        ))}
      </section>

      {/* Ticker section */}
      <section className="ticker-section">
        <div className="ticker-content">
          {['Meetup','Hackathon','Workshop','Online','Brazzaville','Kinshasa','Data Engineering','Machine Learning','Python','Big Data','2025'].map((word, i) => (
            <span key={i} className={`ticker-word ${['Meetup','Brazzaville','Data Engineering'].includes(word) ? 'accent' : ''}`}>
              {word}
            </span>
          ))}
        </div>
      </section>

      {/* Section Archives */}
      <section className="archives-section">
        <div className="archives-header">
          <span className="section-label">// Ce qu'on a déjà construit.</span>
          <h2 className="section-title">Archives</h2>
          <span className="section-stats">12 événements · 800+ participants</span>
        </div>
        
        <div className="archives-grid">
          <div className="main-past-card">
            <div className="past-cover">
              <div style={{width: '100%', height: '240px', background: '#1a1a1a', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#333'}}>
                <span>Data Engineering #2</span>
              </div>
            </div>
            <div className="past-body">
              <div className="past-date">Sam 18 mai 2024</div>
              <h3>Data Engineering #2 - ETL & Docker</h3>
              <p>Pipeline ETL avec Airflow, Docker et PostgreSQL. 80 participants présents.</p>
              <div className="past-speakers">
                {['JM','GK','CB'].map((speaker, i) => (
                  <div key={i} className="past-speaker" style={{marginLeft: i > 0 ? '-6px' : '0', backgroundColor: '#4F6EF7'}}>
                    {speaker}
                  </div>
                ))}
                <span>3 speakers</span>
              </div>
              <div className="past-stats">
                <span>1240 vues</span>
                <span>3 ressources</span>
              </div>
              <button className="recap-btn">Voir le recap &gt;</button>
            </div>
          </div>
          
          <div className="mini-past-cards">
            {pastEvents.slice(1).map(event => (
              <div key={event.id} className="mini-past-card">
                <div className="mini-cover" style={{backgroundColor: `${event.color}15`}}>
                  <span className="mini-tag">{event.type}</span>
                </div>
                <div className="mini-body">
                  <div className="mini-date">{event.date}</div>
                  <h4>{event.title}</h4>
                  <p>{event.desc}</p>
                  <div className="mini-stats">
                    <span>{event.stats.vues} vues</span>
                    {event.stats.ressources && <span>{event.stats.ressources} ressources</span>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section CTA */}
      <section className="cta-section">
        <div className="cta-grid">
          <div className="cta-left">
            <span className="cta-label">// Vous avez quelque chose à partager ?</span>
            <h2 className="cta-title">Devenez <span className="accent">speaker.</span></h2>
            <p className="cta-desc">Partagez votre expertise avec la communauté data du Congo.</p>
            
            <div className="cta-items">
              <div className="cta-item">
                <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
                  <path d="M6 10l5 5 7-7" stroke="#4F6EF7" strokeWidth="1.5"/>
                </svg>
                <span>Choisissez votre format - talk, workshop, demo live</span>
              </div>
              <div className="cta-item">
                <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
                  <path d="M6 10l5 5 7-7" stroke="#4F6EF7" strokeWidth="1.5"/>
                </svg>
                <span>30 à 60 minutes devant 50-150 personnes</span>
              </div>
              <div className="cta-item">
                <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
                  <path d="M6 10l5 5 7-7" stroke="#4F6EF7" strokeWidth="1.5"/>
                </svg>
                <span>On s'occupe de la logistique, vous apportez le contenu</span>
              </div>
            </div>
          </div>
          
          <div className="cta-right">
            <div className="cta-form">
              <input type="text" placeholder="Votre nom" className="form-input"/>
              <input type="email" placeholder="Email" className="form-input"/>
              <input type="text" placeholder="Sujet du talk" className="form-input"/>
              <select className="form-input">
                <option>Meetup</option>
                <option>Workshop</option>
                <option>Demo</option>
                <option>Hackathon</option>
              </select>
              <button className="submit-btn">Soumettre ma proposition &gt;</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Events
