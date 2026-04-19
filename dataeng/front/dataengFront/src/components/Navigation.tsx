import { Link } from 'react-router-dom'
import './Navigation.css'
import { useNavbarColor } from '../hooks/useNavbarColor'

const Navigation = () => {
  const { container } = useNavbarColor()
  const isDarkBg = container !== '#ffffff'
  
  return (
    <nav className="navigation" style={{ backgroundColor: container }}>
      <div className="nav-container">
        <div className="nav-brand">
          <Link to="/" style={{ color: isDarkBg ? '#ffffff' : '#2563eb' }}>Data Community</Link>
        </div>
        
        <div className="nav-links" data-dark-bg={isDarkBg}>
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/story" className="nav-link">Story</Link>
          <Link to="/members" className="nav-link">Les membres</Link>
          <Link to="/write" className="nav-link">Écrire</Link>
          <Link to="/login" className="nav-link">Se connecter</Link>
        </div>
        
        <div className="nav-actions">
          <Link to="/get-started" className="sign-up-btn">Commencer</Link>
        </div>
      </div>
    </nav>
  )
}

export default Navigation
