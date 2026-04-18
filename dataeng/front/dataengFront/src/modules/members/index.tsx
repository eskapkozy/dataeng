import { useState } from 'react'
import './styles.css'
import '../common.css'

const Members = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedSkill, setSelectedSkill] = useState('')
  const [selectedCountry, setSelectedCountry] = useState('')

  return (
    <div className="page members-page">
      <section className="hero">
        <h1>Les Membres</h1>
        <p>Découvrez les membres de notre communauté data</p>
      </section>
      
      <section className="members-search">
        <input 
          type="text" 
          placeholder="Rechercher un membre..." 
          className="search-input"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="filters">
          <select 
            className="filter-select"
            value={selectedSkill}
            onChange={(e) => setSelectedSkill(e.target.value)}
          >
            <option value="">Toutes les compétences</option>
            <option value="data-science">Data Science</option>
            <option value="data-engineering">Data Engineering</option>
            <option value="software-development">Software Development</option>
            <option value="machine-learning">Machine Learning</option>
          </select>
          <select 
            className="filter-select"
            value={selectedCountry}
            onChange={(e) => setSelectedCountry(e.target.value)}
          >
            <option value="">Tous les pays</option>
            <option value="senegal">Sénégal</option>
            <option value="cote-ivoire">Côte d'Ivoire</option>
            <option value="cameroun">Cameroun</option>
            <option value="kenya">Kenya</option>
            <option value="nigeria">Nigeria</option>
          </select>
        </div>
      </section>
      
      <section className="members-grid">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="member-card">
            <div className="member-avatar">
              <div className="avatar-placeholder">M{i}</div>
            </div>
            <div className="member-info">
              <h3>Membre {i}</h3>
              <p className="member-title">Data Scientist</p>
              <p className="member-location">Dakar, Sénégal</p>
              <div className="member-skills">
                <span className="skill-tag">Python</span>
                <span className="skill-tag">Machine Learning</span>
                <span className="skill-tag">Data Visualization</span>
              </div>
            </div>
            <button className="btn-secondary">Voir profil</button>
          </div>
        ))}
      </section>
    </div>
  )
}

export default Members
