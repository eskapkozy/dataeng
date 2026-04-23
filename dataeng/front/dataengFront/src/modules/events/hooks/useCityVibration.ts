import { useState, useEffect } from 'react'

// Configuration centralisée des villes
export const CITY_MAPPING = {
  brazzaville: { 
    x: 500, y: 935, 
    svgId: 'brazzaville-point',
    color: 'var(--accent-blue)',
    label: 'Brazzaville'
  },
  oyo: { 
    x: 631, y: 550, 
    svgId: 'oyo-point',
    color: 'var(--accent-cyan)',
    label: 'Oyo'
  },
  kinshasa: { 
    x: 120, y: 935, 
    svgId: 'kinshasa-point',
    color: 'var(--accent-purple)',
    label: 'Kinshasa'
  },
  pointe_noire: {
    x: 400, y: 410,
    svgId: 'pointe-noire-point',
    color: 'var(--warning-orange)',
    label: 'Pointe-Noire'
  }
} as const

export type CityName = keyof typeof CITY_MAPPING

// Hook pour gérer les vibrations basées sur la position du map-transition-indicator
export const useCityVibration = (activeCity: CityName = 'brazzaville') => {
  // Initialiser les états avec les valeurs par défaut pour vibration immédiate
  const [basicVibratingCities, setBasicVibratingCities] = useState<Set<CityName>>(
    new Set(Object.keys(CITY_MAPPING).filter(city => city !== activeCity) as CityName[])
  )

  // Mettre à jour les états de vibration quand la ville active change
  useEffect(() => {
    // Activer la vibration basique sur toutes les villes sauf la ville active
    const otherCities = Object.keys(CITY_MAPPING).filter(city => city !== activeCity) as CityName[]
    setBasicVibratingCities(new Set(otherCities))
  }, [activeCity])


  // Fonction pour activer/désactiver la vibration basique d'une ville
  const toggleBasicVibration = (city: CityName) => {
    setBasicVibratingCities(prev => {
      const newSet = new Set(prev)
      if (newSet.has(city)) {
        newSet.delete(city)
      } else {
        newSet.add(city)
      }
      return newSet
    })
  }


  // Vérifier si une ville a une vibration basique
  const hasBasicVibration = (city: CityName): boolean => {
    return basicVibratingCities.has(city)
  }

  // Obtenir la classe CSS pour le map-transition-indicator
  const getIndicatorClass = (): string => {
    return 'massive-vibrating'
  }

  // Obtenir la classe CSS pour un overlay de ville
  const getOverlayClass = (city: CityName): string => {
    if (hasBasicVibration(city)) return 'basic-vibrating'
    return ''
  }

  return {
    basicVibratingCities,
    hasBasicVibration,
    toggleBasicVibration,
    getIndicatorClass,
    getOverlayClass,
    CITY_MAPPING
  }
}
