import { useState } from 'react'
import './styles.css'
import '../common.css'

const Auth = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [isLogin, setIsLogin] = useState(true)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Auth soumis:', { email, password, name, isLogin })
  }

  return (
    <div className="page auth-page">
      <section className="auth-container">
        <div className="auth-card">
          <h1>{isLogin ? 'Se Connecter' : 'S\'inscrire'} à <span className="brand">Data</span><span className="brand" style={{color: 'var(--color-blue)'}}>eng</span></h1>
          <p>
            {isLogin 
              ? 'Connectez-vous pour accéder à votre espace' 
              : 'Rejoignez notre communauté data'
            }
          </p>
          
          <form className="auth-form" onSubmit={handleSubmit}>
            {!isLogin && (
              <div className="form-group">
                <label htmlFor="name">Nom complet</label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Entrez votre nom complet"
                  className="form-input"
                />
              </div>
            )}
            
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="votre@email.com"
                className="form-input"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="password">Mot de passe</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="form-input"
              />
            </div>
            
            {!isLogin && (
              <div className="form-group">
                <label htmlFor="confirmPassword">Confirmer le mot de passe</label>
                <input
                  type="password"
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  className="form-input"
                />
              </div>
            )}
            
            <div className="form-actions">
              <button type="submit" className="btn-primary btn-full">
                {isLogin ? 'Se Connecter' : 'S\'inscrire'}
              </button>
            </div>
          </form>
          
          <div className="auth-switch">
            <p>
              {isLogin ? 'Pas encore de compte ?' : 'Déjà un compte ?'}
              <button 
                type="button" 
                className="link-button"
                onClick={() => setIsLogin(!isLogin)}
              >
                {isLogin ? 'S\'inscrire' : 'Se Connecter'}
              </button>
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Auth
