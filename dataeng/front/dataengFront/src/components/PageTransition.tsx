import React, { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import './PageTransition.css'

interface PageTransitionProps {
  children: React.ReactNode
}

const PageTransition = ({ children }: PageTransitionProps) => {
  const location = useLocation()
  const [currentChildren, setCurrentChildren] = useState(children)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [isReady, setIsReady] = useState(true)
  const containerRef = useRef<HTMLDivElement>(null)
  const previousPathRef = useRef(location.pathname)

  useEffect(() => {
    if (previousPathRef.current !== location.pathname) {
      previousPathRef.current = location.pathname
      setIsTransitioning(true)
      setIsReady(false)
      
      // Start slide transition
      if (containerRef.current) {
        containerRef.current.classList.add('slide-out')
      }
      
      // Change content and slide in
      const timeoutId = setTimeout(() => {
        setCurrentChildren(children)
        requestAnimationFrame(() => {
          if (containerRef.current) {
            containerRef.current.classList.remove('slide-out')
            containerRef.current.classList.add('slide-in')
          }
          
          // Wait for transition to complete before allowing animations
          setTimeout(() => {
            if (containerRef.current) {
              containerRef.current.classList.remove('slide-in')
            }
            setIsReady(true)
            setIsTransitioning(false)
          }, 400)
        })
      }, 200)
      
      return () => clearTimeout(timeoutId)
    } else {
      setCurrentChildren(children)
    }
  }, [location.pathname, children])

  return (
    <div
      ref={containerRef}
      className={`page-transition-container ${isTransitioning ? 'transitioning' : ''} ${!isReady ? 'no-animations' : ''}`}
      data-transition-ready={isReady}
    >
      {currentChildren}
    </div>
  )
}

export default PageTransition
