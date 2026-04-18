import { useState, useEffect } from 'react'

interface PageColorConfig {
  container: string
  linkBg: string
}

const pageColorMap: Record<string, PageColorConfig> = {
  '/': {
    container: '#3b82f6',
    linkBg: 'rgba(59, 130, 246, 0.1)'
  },
  '/story': {
    container: '#10b981',
    linkBg: 'rgba(16, 185, 129, 0.1)'
  },
  '/members': {
    container: '#f97316',
    linkBg: 'rgba(249, 115, 22, 0.1)'
  },
  '/write': {
    container: '#8b5cf6',
    linkBg: 'rgba(139, 92, 246, 0.1)'
  },
  '/login': {
    container: '#6b7280',
    linkBg: 'rgba(107, 114, 128, 0.1)'
  },
  '/get-started': {
    container: '#ec4899',
    linkBg: 'rgba(236, 72, 153, 0.1)'
  }
}

export const useNavbarColor = () => {
  const [navbarColors, setNavbarColors] = useState<PageColorConfig>({
    container: '#ffffff',
    linkBg: '#f3f4f6'
  })

  useEffect(() => {
    const updateNavbarColors = () => {
      const currentPath = window.location.pathname
      const colors = pageColorMap[currentPath] || {
        container: '#ffffff',
        linkBg: '#f3f4f6'
      }
      setNavbarColors(colors)
    }

    updateNavbarColors()
    
    // Listen for route changes
    window.addEventListener('popstate', updateNavbarColors)
    
    // Also listen for pushState/replaceState (for React Router)
    const originalPushState = history.pushState
    const originalReplaceState = history.replaceState
    
    history.pushState = function(...args) {
      originalPushState.apply(history, args)
      setTimeout(updateNavbarColors, 0)
    }
    
    history.replaceState = function(...args) {
      originalReplaceState.apply(history, args)
      setTimeout(updateNavbarColors, 0)
    }

    return () => {
      window.removeEventListener('popstate', updateNavbarColors)
      history.pushState = originalPushState
      history.replaceState = originalReplaceState
    }
  }, [])

  return navbarColors
}
