import './styles.css'
import '../common.css'

const Home = () => {
  return (
    <div className="page home-page">
      <section className="hero">
        <h1>Bienvenue dans la Communauté Data</h1>
        <p>Connectez-vous avec des passionnés de data science, data engineering et développement logiciel</p>
      </section>
      
      <section className="features">
        <div className="feature-card">
          <h3>Articles</h3>
          <p>Partagez vos connaissances et apprenez des experts</p>
        </div>
        <div className="feature-card">
          <h3>Événements</h3>
          <p>Découvrez les événements data en Afrique</p>
        </div>
        <div className="feature-card">
          <h3>Communauté</h3>
          <p>Rejoignez un réseau de professionnels passionnés</p>
        </div>
      </section>
    </div>
  )
}

export default Home
