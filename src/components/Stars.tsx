'use client'

import { useEffect, useState } from 'react'

export default function Stars() {
  const [stars, setStars] = useState<React.ReactNode[]>([])

  useEffect(() => {
    const count = 80
    const generatedStars = Array.from({ length: count }, (_, i) => {
      const top = Math.random() * 100
      const left = Math.random() * 100
      const size = Math.random() * 2 + 1
      const delay = Math.random() * 4

      return (
        <div
          key={i}
          className="star"
          style={{
            top: `${top}%`,
            left: `${left}%`,
            width: `${size}px`,
            height: `${size}px`,
            animationDelay: `${delay}s`,
          }}
        />
      )
    })

    setStars(generatedStars)
  }, [])

  return <div className="stars-container">{stars}</div>
}

