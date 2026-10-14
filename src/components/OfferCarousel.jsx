import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import ringTop from '../assets/banner-ring-top.svg'
import ringBottom from '../assets/banner-ring-bottom.svg'
import styles from './OfferCarousel.module.css'

const AUTOPLAY_MS = 4000

export default function OfferCarousel({ offers, image }) {
  const trackRef = useRef(null)
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)

  function scrollTo(index) {
    const track = trackRef.current
    track?.scrollTo({ left: index * track.clientWidth, behavior: 'smooth' })
  }

  useEffect(() => {
    if (paused || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const id = setTimeout(() => scrollTo((active + 1) % offers.length), AUTOPLAY_MS)
    return () => clearTimeout(id)
  }, [active, paused, offers.length])

  function handleScroll(e) {
    const { scrollLeft, clientWidth } = e.currentTarget
    setActive(Math.round(scrollLeft / clientWidth))
  }

  return (
    <section
      className={styles.carousel}
      aria-roledescription="carousel"
      aria-label="Offers"
      onPointerEnter={() => setPaused(true)}
      onPointerLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div className={styles.track} ref={trackRef} onScroll={handleScroll}>
        {offers.map((offer, i) => (
          <Link
            key={offer.id}
            to={`/product/${offer.productId}`}
            className={styles.slide}
            aria-roledescription="slide"
            aria-label={`${i + 1} of ${offers.length}: ${offer.deal}, ${offer.headline}`}
          >
            <img className={styles.photo} src={image} alt="" />
            <img className={styles.ringTop} src={ringTop} alt="" width="55" height="55" />
            <img className={styles.ringBottom} src={ringBottom} alt="" width="46" height="46" />
            <div className={styles.copy}>
              <p className={styles.headline}>{offer.headline}</p>
              <p className={styles.deal}>{offer.deal}</p>
            </div>
          </Link>
        ))}
      </div>
      <div className={styles.dots}>
        {offers.map((offer, i) => (
          <button
            key={offer.id}
            type="button"
            className={styles.dot}
            aria-current={i === active}
            aria-label={`Show offer ${i + 1}`}
            onClick={() => scrollTo(i)}
          />
        ))}
      </div>
    </section>
  )
}
