import { useState, useEffect } from 'react'

export const useTheme = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark')
  
  const toggleTheme = () => {
    console.log('Toggle theme called, current theme:', theme)
    const newTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
    localStorage.setItem('theme', newTheme)
    document.documentElement.setAttribute('data-theme', newTheme)
    console.log('New theme set:', newTheme)
  }
  
  useEffect(() => {
    console.log('useTheme hook initializing...')
    // Récupérer le thème sauvegardé, sinon utiliser dark comme défaut
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null
    
    const initialTheme = savedTheme || 'dark'
    console.log('Initial theme determined:', initialTheme)
    setTheme(initialTheme)
    document.documentElement.setAttribute('data-theme', initialTheme)
    console.log('Data-theme attribute set to:', initialTheme)
  }, [])
  
  return { theme, toggleTheme }
}
