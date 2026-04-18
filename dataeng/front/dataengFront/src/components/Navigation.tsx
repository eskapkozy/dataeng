import { Link } from 'react-router-dom'
import './Navigation.css'

const Navigation = () => {
  return (
    <nav className="navigation">
      <div className="nav-container">
        <div className="nav-brand">
          <Link to="/">Data Community</Link>
        </div>
        
        <div className="nav-links">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/story" className="nav-link">Story</Link>
          <Link to="/members" className="nav-link">Les membres</Link>
          <Link to="/write" className="nav-link">Écrire</Link>
          <Link to="/login" className="nav-link">Se connecter</Link>
        </div>
        
        <div className="nav-actions">
          <Link to="/get-started" className="btn-primary">Commencer</Link>
        </div>
      </div>
    </nav>
  )
}

export default Navigation
