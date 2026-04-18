
interface PageColorConfig {
  container: string
  linkBg: string
}

const pageColorMap: Record<string, PageColorConfig> = {
  '/': {
    container: '#d4a574',
    linkBg: 'rgba(212, 165, 116, 0.1)'
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
  const currentPath = window.location.pathname
  const colors = pageColorMap[currentPath] || {
    container: '#ffffff',
    linkBg: '#f3f4f6'
  }
  
  return colors
}
