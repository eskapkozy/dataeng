import './styles.css'
import '../common.css'

const Home = () => {
  return (
    <div className="page home-page">
      <section className="hero">
        <h1>Bienvenue dans la Communauté <span>Data</span> <span className="brand-blue">eng</span></h1>
        <p>Connectez-vous avec des passionnés de data science, data engineering et développement logiciel</p>
      </section>
      
      <section className="features">
        <div className="feature-card">
          <div className="icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
              <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
            </svg>
          </div>
          <h3>Articles</h3>
          <p>Partagez vos connaissances et apprenez des <span className="accent">experts</span> et <span className="accent-secondary">professionnels</span></p>
        </div>
        <div className="feature-card">
          <div className="icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="16" y1="2" x2="16" y2="6"></line>
              <line x1="8" y1="2" x2="8" y2="6"></line>
              <line x1="3" y1="10" x2="21" y2="10"></line>
            </svg>
          </div>
          <h3>Événements</h3>
          <p>Découvrez les événements <span className="accent">data</span> en <span className="accent-secondary">Afrique</span></p>
        </div>
        <div className="feature-card">
          <div className="icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
              <circle cx="9" cy="7" r="4"></circle>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
            </svg>
          </div>
          <h3>Communauté</h3>
          <p>Rejoignez un réseau de <span className="accent">professionnels</span> <span className="accent-secondary">passionnés</span></p>
        </div>
      </section>
    </div>
  )
}

export default Home
