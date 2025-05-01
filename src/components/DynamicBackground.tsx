'use client'

import { useEffect, useState } from 'react'

export default function DynamicBackground() {
  const [gradient, setGradient] = useState<string>('')

  useEffect(() => {
    const darkPurples = [
      '#0a0a0a',
      '#12071b',
      '#1a0d2e',
      '#2c0d3f',
      '#3b104e',
      '#220833',
      '#1b1123',
    ]

    const color1 = '#000000' // fond toujours très sombre
    const color2 = darkPurples[Math.floor(Math.random() * darkPurples.length)]

    setGradient(`radial-gradient(ellipse at 50% 50%, ${color2}, ${color1})`)
  }, [])

  return (
    <div
      className="fixed top-0 left-0 w-full h-full -z-50"
      style={{
        background: gradient,
      }}
    />
  )
}

