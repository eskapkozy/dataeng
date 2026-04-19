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
              <img src="./assets/technologies/java.svg" alt="Java" />
            </div>
            <div className="techno-item">
              <img src="./assets/technologies/python.svg" alt="Python" />
            </div>
            <div className="techno-item">
              <img src="./assets/technologies/sql.svg" alt="SQL" />
            </div>
            <div className="techno-item">
              <img src="./assets/technologies/kafka.svg" alt="Kafka" />
            </div>
            <div className="techno-item">
              <img src="./assets/technologies/tensorflow.svg" alt="TensorFlow" />
            </div>
            <div className="techno-item">
              <img src="./assets/technologies/mongodb.svg" alt="MongoDB" />
            </div>
            <div className="techno-item">
              <img src="./assets/technologies/docker.svg" alt="Docker" />
            </div>
            <div className="techno-item">
              <img src="./assets/technologies/aws.svg" alt="AWS" />
            </div>
            <div className="techno-item">
              <img src="./assets/technologies/pandas.svg" alt="Pandas" />
            </div>
            <div className="techno-item">
              <img src="./assets/technologies/spark.svg" alt="Spark" />
            </div>
            <div className="techno-item">
              <img src="./assets/technologies/databricks.svg" alt="Databricks" />
            </div>
            <div className="techno-item">
              <img src="./assets/technologies/snowflake.svg" alt="Snowflake" />
            </div>
            <div className="techno-item">
              <img src="./assets/technologies/springboot.svg" alt="Spring Boot" />
            </div>
            <div className="techno-item">
              <img src="./assets/technologies/numpy.svg" alt="NumPy" />
            </div>
            <div className="techno-item">
              <img src="./assets/technologies/scikit-learn.svg" alt="Scikit-learn" />
            </div>
            <div className="techno-item">
              <img src="./assets/technologies/airflow.svg" alt="Airflow" />
            </div>
            {/* Duplicate for infinite scroll */}
            <div className="techno-item">
              <img src="./assets/technologies/java.svg" alt="Java" />
            </div>
            <div className="techno-item">
              <img src="./assets/technologies/python.svg" alt="Python" />
            </div>
            <div className="techno-item">
              <img src="./assets/technologies/sql.svg" alt="SQL" />
            </div>
            <div className="techno-item">
              <img src="./assets/technologies/kafka.svg" alt="Kafka" />
            </div>
            <div className="techno-item">
              <img src="./assets/technologies/tensorflow.svg" alt="TensorFlow" />
            </div>
            <div className="techno-item">
              <img src="./assets/technologies/mongodb.svg" alt="MongoDB" />
            </div>
            <div className="techno-item">
              <img src="./assets/technologies/docker.svg" alt="Docker" />
            </div>
            <div className="techno-item">
              <img src="./assets/technologies/aws.svg" alt="AWS" />
            </div>
            <div className="techno-item">
              <img src="./assets/technologies/pandas.svg" alt="Pandas" />
            </div>
            <div className="techno-item">
              <img src="./assets/technologies/spark.svg" alt="Spark" />
            </div>
            <div className="techno-item">
              <img src="./assets/technologies/databricks.svg" alt="Databricks" />
            </div>
            <div className="techno-item">
              <img src="./assets/technologies/snowflake.svg" alt="Snowflake" />
            </div>
            <div className="techno-item">
              <img src="./assets/technologies/springboot.svg" alt="Spring Boot" />
            </div>
            <div className="techno-item">
              <img src="./assets/technologies/numpy.svg" alt="NumPy" />
            </div>
            <div className="techno-item">
              <img src="./assets/technologies/scikit-learn.svg" alt="Scikit-learn" />
            </div>
            <div className="techno-item">
              <img src="./assets/technologies/airflow.svg" alt="Airflow" />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
