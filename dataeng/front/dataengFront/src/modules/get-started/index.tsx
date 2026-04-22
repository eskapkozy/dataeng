import './styles.css'
import '../common.css'

const GetStarted = () => {
  return (
    <div className="page get-started-page">
      <section className="hero">
        <h1>Commencer avec Data Eng</h1>
        <p>Rejoignez la communauté data du Congo et faites partie de l'aventure</p>
      </section>
      
      <section className="steps">
        <div className="step-card">
          <div className="step-number">1</div>
          <h3>Inscrivez-vous</h3>
          <p>Créez votre compte et rejoignez notre communauté de passionnés</p>
        </div>
        
        <div className="step-card">
          <div className="step-number">2</div>
          <h3>Complétez votre profil</h3>
          <p>Présentez-vous et partagez vos compétences et centres d'intérêt</p>
        </div>
        
        <div className="step-card">
          <div className="step-number">3</div>
          <h3>Participez</h3>
          <p>Lisez, commentez, publiez des articles et rejoignez les discussions</p>
        </div>
        
        <div className="step-card">
          <div className="step-number">4</div>
          <h3>Grandissez ensemble</h3>
          <p>Apprenez des autres et partagez vos connaissances</p>
        </div>
      </section>
      
      <section className="cta">
        <h2>Prêt à commencer votre parcours data ?</h2>
        <p>Rejoignez des centaines de professionnels et passionnés du data au Congo</p>
        <div className="cta-buttons">
          <button className="btn-primary btn-large">S'inscrire maintenant</button>
          <button className="open-btn btn-secondary btn-large">En savoir plus</button>
        </div>
      </section>
    </div>
  )
}

export default GetStarted
