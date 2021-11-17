import React from "react"
import { useEffect } from "react"

type GifPlayerProps = {
  src: string
  duration?: number
  onEnd?: () => void
}

const GifPlayer: React.FC<GifPlayerProps> = ({ src, duration, onEnd }) => {
  useEffect(() => {
    if (!onEnd || !duration) {
      return
    }

    const timer = setTimeout(() => {
      onEnd()
    }, duration)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div>
      {/* <img src={src + `?t=${Date.now()}`} /> */}
      <img src={src} />
    </div>
  )
}

export default GifPlayer
