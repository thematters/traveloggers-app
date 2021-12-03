import useEmblaCarousel from "embla-carousel-react"
import React, { useEffect, useState } from "react"

import { Logbook, LogbookCard } from "~/components"

import * as styles from "./styles.module.css"

const LogbookSlides = ({ logbooks }: { logbooks: Logbook[] }) => {
  const [scrolling, setScrolling] = useState(false)
  const [settled, setSettled] = useState(true)

  const [emblaRef, emblaApi] = useEmblaCarousel({
    dragFree: true,
    draggable: true,
    loop: false,
    containScroll: "trimSnaps",
  })

  const onCaptureClick = (event: any) => {
    if (scrolling) {
      event.preventDefault()
      event.stopPropagation()
    }
  }

  useEffect(() => {
    if (emblaApi) {
      emblaApi.on("scroll", (event: any) => {
        if (!scrolling && settled) {
          setScrolling(true)
          setSettled(false)
        }
      })

      emblaApi.on("settle", (event: any) => {
        setScrolling(false)
        setSettled(true)
      })
    }
  }, [emblaApi])

  return (
    <section
      className={styles.slides}
      ref={emblaRef}
      onClickCapture={onCaptureClick}
    >
      <ul>
        {logbooks.map(logbook => (
          <li key={logbook.tokenId}>
            <LogbookCard logbook={logbook} />
          </li>
        ))}
      </ul>
    </section>
  )
}

export default LogbookSlides
