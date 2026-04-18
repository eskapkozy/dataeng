import type { ReactNode } from 'react'
import Navigation from './Navigation'
import './Layout.css'

interface LayoutProps {
  children: ReactNode
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="app">
      <Navigation />
      <main className="main-content">
        {children}
      </main>
      <footer className="footer">
        <div className="footer-content">
          <p className="brand">&copy; 2024 <span className="blue">Data</span> eng. Tous droits réservés.</p>
          <div className="footer-links">
            <a href="/privacy">Confidentialité</a>
            <a href="/terms">Conditions d'utilisation</a>
            <a href="/contact">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Layout
