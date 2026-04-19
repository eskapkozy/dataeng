import './styles.css'
import '../common.css'

const Home = () => {
  const handleCardClick = (cardType: string) => {
    console.log(`Card clicked: ${cardType}`);
    // Ajoutez ici la logique pour gérer les clics
    // Par exemple, navigation vers une page spécifique
    switch(cardType) {
      case 'solvd-digest':
        console.log('Navigating to Solvd Digest...');
        break;
      case 'offices':
        console.log('Navigating to Offices...');
        break;
      case 'argentina':
        console.log('Navigating to Argentina...');
        break;
      case 'white-paper':
        console.log('Navigating to White Paper...');
        break;
      default:
        console.log('Unknown card type');
    }
  };

  return (
    <div className="page home-page">
      
      
      <section className="main-container">
        {/* Div gauche - moitié hauteur, aligné en bas */}
        <div className="left-container">
          <button className="content-card leading-future clickable-card" onClick={() => handleCardClick('event')}>
            <div className="card-logo">SI</div>
            <div className="card-content">
              <h3>Event</h3>
              <p>consulte les evenements</p>
            </div>
            <div className="card-image">
              <img src="/src/assets/hero.png" alt="People with tablet" />
            </div>
            <div className="card-overlay">
              <span className="click-indicator">Click to explore</span>
            </div>
          </button>
        </div>

        {/* Div droit - grille de sous-div égaux */}
        <div className="right-container">
          <div className="grid-2x2">
            {/* Solvd Digest */}
            <div className="grid-item">
              <button className="content-card solvd-digest clickable-card" onClick={() => handleCardClick('solvd-digest')}>
                <div className="card-content">
                  <h3>Solvd Digest</h3>
                  <p className="date">November 2024</p>
                  <p className="description">Stay updated with our company news and achievements</p>
                </div>
                <div className="card-overlay">
                  <span className="click-indicator">Click to explore</span>
                </div>
              </button>
            </div>

            {/* 8 Offices */}
            <div className="grid-item">
              <button className="content-card offices clickable-card" onClick={() => handleCardClick('offices')}>
                <div className="card-content">
                  <h3>8 Offices around the world</h3>
                  <div className="bars-graphic">
                    <div className="bar bar-1"></div>
                    <div className="bar bar-2"></div>
                    <div className="bar bar-3"></div>
                    <div className="bar bar-4"></div>
                    <div className="bar bar-5"></div>
                    <div className="bar bar-6"></div>
                  </div>
                </div>
                <div className="card-overlay">
                  <span className="click-indicator">Click to explore</span>
                </div>
              </button>
            </div>

            {/* Argentina */}
            <div className="grid-item">
              <button className="content-card argentina clickable-card" onClick={() => handleCardClick('argentina')}>
                <div className="card-content">
                  <h3>Say Hi to Solvd Argentina</h3>
                </div>
                <div className="card-image">
                  <img src="/src/assets/hero.png" alt="Argentina team" />
                </div>
                <div className="card-overlay">
                  <span className="click-indicator">Click to explore</span>
                </div>
              </button>
            </div>

            {/* White Paper */}
            <div className="grid-item">
              <button className="content-card white-paper clickable-card" onClick={() => handleCardClick('white-paper')}>
                <div className="card-content">
                  <span className="label">White Paper</span>
                  <h3>Boosting E-Commerce Success Solutions and Strategic Partner</h3>
                  <div className="author">
                    <div className="author-avatar">
                      <img src="/src/assets/hero.png" alt="Venu Kanduri" />
                    </div>
                    <div className="author-info">
                      <p className="author-name">Venu Kanduri</p>
                      <p className="author-title">Senior Vicepresident of Digital Solutions</p>
                    </div>
                  </div>
                </div>
                <div className="card-overlay">
                  <span className="click-indicator">Click to explore</span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="techno-weUse">
        <h2 className="techno-title">Technologies We Use</h2>
        <div className="techno-scroll-container">
          <div className="techno-scroll">
            <div className="techno-item">
              <img src="./assets/techno/java.svg" alt="Java" />
            </div>
            <div className="techno-item">
              <img src="./assets/techno/python.svg" alt="Python" />
            </div>
            <div className="techno-item">
              <img src="./assets/techno/sql.svg" alt="SQL" />
            </div>
            <div className="techno-item">
              <img src="./assets/techno/kafka.svg" alt="Kafka" />
            </div>
            <div className="techno-item">
              <img src="./assets/techno/tensorflow.svg" alt="TensorFlow" />
            </div>
            <div className="techno-item">
              <img src="./assets/techno/mongodb.svg" alt="MongoDB" />
            </div>
            <div className="techno-item">
              <img src="./assets/techno/docker.svg" alt="Docker" />
            </div>
            <div className="techno-item">
              <img src="./assets/techno/aws.svg" alt="AWS" />
            </div>
            <div className="techno-item">
              <img src="./assets/techno/pandas.svg" alt="Pandas" />
            </div>
            <div className="techno-item">
              <img src="./assets/techno/spark.svg" alt="Spark" />
            </div>
            <div className="techno-item">
              <img src="./assets/techno/databricks.svg" alt="Databricks" />
            </div>
            <div className="techno-item">
              <img src="./assets/techno/snowflake.svg" alt="Snowflake" />
            </div>
            <div className="techno-item">
              <img src="./assets/techno/springboot.svg" alt="Spring Boot" />
            </div>
            <div className="techno-item">
              <img src="./assets/techno/numpy.svg" alt="NumPy" />
            </div>
            <div className="techno-item">
              <img src="./assets/techno/scikit-learn.svg" alt="Scikit-learn" />
            </div>
            <div className="techno-item">
              <img src="./assets/techno/airflow.svg" alt="Airflow" />
            </div>
            {/* Duplicate for infinite scroll */}
            <div className="techno-item">
              <img src="./assets/techno/java.svg" alt="Java" />
            </div>
            <div className="techno-item">
              <img src="./assets/techno/python.svg" alt="Python" />
            </div>
            <div className="techno-item">
              <img src="./assets/techno/sql.svg" alt="SQL" />
            </div>
            <div className="techno-item">
              <img src="./assets/techno/kafka.svg" alt="Kafka" />
            </div>
            <div className="techno-item">
              <img src="./assets/techno/tensorflow.svg" alt="TensorFlow" />
            </div>
            <div className="techno-item">
              <img src="./assets/techno/mongodb.svg" alt="MongoDB" />
            </div>
            <div className="techno-item">
              <img src="./assets/techno/docker.svg" alt="Docker" />
            </div>
            <div className="techno-item">
              <img src="./assets/techno/aws.svg" alt="AWS" />
            </div>
            <div className="techno-item">
              <img src="./assets/techno/pandas.svg" alt="Pandas" />
            </div>
            <div className="techno-item">
              <img src="./assets/techno/spark.svg" alt="Spark" />
            </div>
            <div className="techno-item">
              <img src="./assets/techno/databricks.svg" alt="Databricks" />
            </div>
            <div className="techno-item">
              <img src="./assets/techno/snowflake.svg" alt="Snowflake" />
            </div>
            <div className="techno-item">
              <img src="./assets/techno/springboot.svg" alt="Spring Boot" />
            </div>
            <div className="techno-item">
              <img src="./assets/techno/numpy.svg" alt="NumPy" />
            </div>
            <div className="techno-item">
              <img src="./assets/techno/scikit-learn.svg" alt="Scikit-learn" />
            </div>
            <div className="techno-item">
              <img src="./assets/techno/airflow.svg" alt="Airflow" />
            </div>
          </div>
        </div>
      </section>
      <section className="Features">
        
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
