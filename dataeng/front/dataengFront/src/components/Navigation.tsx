import { Link } from 'react-router-dom'
import './Navigation.css'
import { useNavbarColor } from '../hooks/useNavbarColor'
import { useTheme } from '../hooks/useTheme'

const Navigation = () => {
  const { container } = useNavbarColor()
  const isDarkBg = container !== '#ffffff'
  const { theme, toggleTheme } = useTheme()
  
  return (
    <nav className="navigation" style={{ backgroundColor: container }}>
      <div className="nav-container">
        <div className="nav-brand">
          <Link to="/" style={{ color: isDarkBg ? '#ffffff' : '#2563eb' }}>.Data Eng</Link>
        </div>
        
        <div className="nav-links" data-dark-bg={isDarkBg}>
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/story" className="nav-link">Story</Link>
          <Link to="/members" className="nav-link">Les membres</Link>
          <Link to="/write" className="nav-link">Publier</Link>
        </div>
        
        <div className="nav-actions">
          <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
            {theme === 'light' ? (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="5" stroke="currentColor" stroke-width="2"/>
                <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" stroke="currentColor" stroke-width="2"/>
              </svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" stroke="currentColor" stroke-width="2"/>
              </svg>
            )}
          </button>
          <Link to="/login" className="sign-up-btn">Se connecter</Link>
        </div>
      </div>
    </nav>
  )
}

export default Navigation
