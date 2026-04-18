import './styles.css'
import '../common.css'

const Story = () => {
  return (
    <div className="page story-page">
      <section className="hero">
        <h1>Notre Histoire</h1>
        <p>La mission et la vision de notre communauté data</p>
      </section>
      
      <section className="mission">
        <h2>Notre Mission</h2>
        <p>
          Créer un espace collaboratif où les passionnés de data science, data engineering 
          et développement peuvent partager leurs connaissances, collaborer sur des projets 
          innovants et contribuer au développement de l'écosystème data en Afrique.
        </p>
      </section>
      
      <section className="vision">
        <h2>Notre Vision</h2>
        <p>
          Devenir la référence francophone pour l'apprentissage et le développement 
          des compétences data en Afrique, en facilitant l'accès aux connaissances 
          et en créant des opportunités pour tous les membres de la communauté.
        </p>
      </section>
      
      <section className="values">
        <h2>Nos Valeurs</h2>
        <div className="values-grid">
          <div className="value-card">
            <h3>Partage</h3>
            <p>Le savoir se multiplie quand il est partagé</p>
          </div>
          <div className="value-card">
            <h3>Collaboration</h3>
            <p>Ensemble nous allons plus loin</p>
          </div>
          <div className="value-card">
            <h3>Innovation</h3>
            <p>Pousser les limites de ce qui est possible</p>
          </div>
          <div className="value-card">
            <h3>Inclusion</h3>
            <p>Chaque voix compte dans notre communauté</p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Story
