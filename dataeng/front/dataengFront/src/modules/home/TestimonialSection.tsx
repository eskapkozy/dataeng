const TestimonialSection = () => {
  return (
    <section className="testimonial-section">
      <div className="testimonial-header">
        <div className="testimonial-header-left">
          <div className="testimonial-label">// Témoignages</div>
          <h2 className="testimonial-title">
            Ce que dit<br />
            la <span className="accent">communauté.</span>
          </h2>
        </div>
        <div className="testimonial-counter">250+ membres</div>
      </div>
      
      <div className="testimonial-grid">
        <div className="testimonial-card">
          <div className="testimonial-tag data-engineering">Data Engineering</div>
          <p className="testimonial-quote">
            Grâce à la communauté, j'ai pu <strong>décrocher mon premier poste</strong> en data engineering à Brazzaville. 
            Les articles et les meetups m'ont donné une longueur d'avance.
          </p>
          <div className="testimonial-divider"></div>
          <div className="testimonial-author">
            <div className="avatar blue">JM</div>
            <div className="author-info">
              <div className="author-name">Junior M.</div>
              <div className="author-role">Data Engineer · Brazzaville</div>
            </div>
          </div>
        </div>
        
        <div className="testimonial-card">
          <div className="testimonial-tag machine-learning">Machine Learning</div>
          <p className="testimonial-quote">
            J'ai publié mon premier article ici et la réponse de la communauté était incroyable. 
            C'est rare de trouver un espace aussi bienveillant dédié à la data en Afrique.
          </p>
          <div className="testimonial-divider"></div>
          <div className="testimonial-author">
            <div className="avatar orange">GK</div>
            <div className="author-info">
              <div className="author-name">Grâce K.</div>
              <div className="author-role">ML Engineer · Kinshasa</div>
            </div>
          </div>
        </div>
        
        <div className="testimonial-card">
          <div className="testimonial-tag congo-use-case">Congo Use Case</div>
          <p className="testimonial-quote">
            Le Club Data m'a permis de <strong>connecter des entreprises congolaises</strong> avec des talents locaux. 
            On construit vraiment quelque chose d'important pour l'écosystème.
          </p>
          <div className="testimonial-divider"></div>
          <div className="testimonial-author">
            <div className="avatar green">OT</div>
            <div className="author-info">
              <div className="author-name">Ornella T.</div>
              <div className="author-role">Data Analyst · Pointe-Noire</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
