
import { useState, useEffect } from 'react'

interface PageColorConfig {
  container: string
  linkBg: string
}

const pageColorMap: Record<string, PageColorConfig> = {
  '/': {
    container: '#1A1A1A', // noir - couleur de la section hero home
    linkBg: 'rgba(255, 255, 255, 0.1)'
  },
  '/story': {
    container: '#10b981', // vert - couleur de la section hero story
    linkBg: 'rgba(16, 185, 129, 0.1)'
  },
  '/members': {
    container: '#f97316', // orange - couleur de la section hero members
    linkBg: 'rgba(249, 115, 22, 0.1)'
  },
  '/write': {
    container: '#8b5cf6', // violet - couleur de la section hero write
    linkBg: 'rgba(139, 92, 246, 0.1)'
  },
  '/login': {
    container: '#6b7280', // gris - couleur par défaut pour login
    linkBg: 'rgba(107, 114, 128, 0.1)'
  },
  '/get-started': {
    container: '#ec4899', // rose - couleur par défaut pour get-started
    linkBg: 'rgba(236, 72, 153, 0.1)'
  }
}

export const useNavbarColor = () => {
  const [navbarColors, setNavbarColors] = useState<PageColorConfig>({
    container: '#ffffff',
    linkBg: '#f3f4f6'
  })

  useEffect(() => {
    const updateColors = () => {
      const currentPath = window.location.pathname
      const colors = pageColorMap[currentPath] || {
        container: '#ffffff',
        linkBg: '#f3f4f6'
      }
      setNavbarColors(colors)
    }

    updateColors()
    
    // Écouter les changements de route
    const handleRouteChange = () => {
      setTimeout(updateColors, 0)
    }
    
    window.addEventListener('popstate', handleRouteChange)
    
    // Intercepter les changements de React Router
    const originalPushState = history.pushState
    const originalReplaceState = history.replaceState
    
    history.pushState = function(...args) {
      originalPushState.apply(history, args)
      handleRouteChange()
    }
    
    history.replaceState = function(...args) {
      originalReplaceState.apply(history, args)
      handleRouteChange()
    }

    return () => {
      window.removeEventListener('popstate', handleRouteChange)
      history.pushState = originalPushState
      history.replaceState = originalReplaceState
    }
  }, [])

  return navbarColors
}
