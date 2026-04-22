import { useState, useEffect, useMemo } from 'react'

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
  }
} as const

export type CityName = keyof typeof CITY_MAPPING

// Hook pour détecter les villes dans un texte et gérer la vibration
export const useCityVibration = (currentEventTitle: string = '') => {
  const [vibratingCities, setVibratingCities] = useState<Set<CityName>>(new Set())

  // Détecter les villes mentionnées dans le texte
  const detectCitiesInText = useMemo(() => {
    return (text: string): CityName[] => {
      const cities: CityName[] = []
      const lowerText = text.toLowerCase()
      
      Object.keys(CITY_MAPPING).forEach(city => {
        const cityName = city as CityName
        if (lowerText.includes(city.toLowerCase()) || 
            lowerText.includes(CITY_MAPPING[cityName].label.toLowerCase())) {
          cities.push(cityName)
        }
      })
      
      return cities
    }
  }, [])

  // Mettre à jour les villes qui vibrent
  useEffect(() => {
    const detectedCities = detectCitiesInText(currentEventTitle)
    setVibratingCities(new Set(detectedCities))
  }, [currentEventTitle, detectCitiesInText])

  // Fonction pour activer manuellement la vibration d'une ville
  const vibrateCity = (city: CityName) => {
    setVibratingCities(prev => new Set([...prev, city]))
  }

  // Fonction pour arrêter la vibration d'une ville
  const stopVibration = (city: CityName) => {
    setVibratingCities(prev => {
      const newSet = new Set(prev)
      newSet.delete(city)
      return newSet
    })
  }

  // Fonction pour arrêter toutes les vibrations
  const stopAllVibrations = () => {
    setVibratingCities(new Set())
  }

  return {
    vibratingCities,
    vibrateCity,
    stopVibration,
    stopAllVibrations,
    detectCitiesInText,
    CITY_MAPPING
  }
}
