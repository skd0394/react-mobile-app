import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import OfferCarousel from '../components/OfferCarousel.jsx'
import phoneIcon from '../assets/icon-phone.svg'
import walletIcon from '../assets/icon-wallet.svg'
import { bestSellers, formatPrice, offerImage, offers, recentOrders } from '../data/menu.js'
import { useAuth } from '../state/authContext.js'
import styles from './Home.module.css'

function useToast() {
  const [message, setMessage] = useState('')
  useEffect(() => {
    if (!message) return
    const id = setTimeout(() => setMessage(''), 2200)
    return () => clearTimeout(id)
  }, [message])
  return [message, setMessage]
}

export default function Home() {
  const { user } = useAuth()
  const [orders, setOrders] = useState(recentOrders)
  const [toast, showToast] = useToast()

  function cancelOrder(order) {
    if (!window.confirm(`Cancel your ${order.name} order?`)) return
    setOrders((list) => list.filter((o) => o.id !== order.id))
    showToast('Order cancelled')
  }

  return (
    <div className={styles.screen}>
      <header className={styles.location}>
        <p className={styles.locationLabel}>Current Locations</p>
        <p className={styles.locationValue}>Model Town, New Delhi</p>
      </header>

      <div className={styles.toolbar}>
        <p className={styles.user}>{user.name}</p>
        <div className={styles.actions}>
          <button
            type="button"
            className={`${styles.action} ${styles.call}`}
            aria-label="Call support"
            onClick={() => showToast('Calling support…')}
          >
            <img src={phoneIcon} alt="" width="20.9684" height="21" />
          </button>
          <button
            type="button"
            className={`${styles.action} ${styles.wallet}`}
            aria-label="Wallet"
            onClick={() => showToast('Wallet balance: ₹0.00')}
          >
            <img src={walletIcon} alt="" width="22.9183" height="22" />
          </button>
        </div>
      </div>

      <main className={styles.content}>
        <section aria-labelledby="best-seller">
          <h2 id="best-seller" className={styles.sectionTitle}>
            Best Seller
          </h2>
          <ul className={styles.bestSellers}>
            {bestSellers.map((p) => (
              <li key={p.id}>
                <Link to={`/product/${p.id}`} className={styles.tile} aria-label={`${p.name}, ${formatPrice(p.price)}`}>
                  <img src={p.image} alt="" className={styles.tileImage} />
                  <span className={styles.priceTag}>{formatPrice(p.price).replace(/\.00$/, '')}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <OfferCarousel offers={offers} image={offerImage} />

        <section aria-labelledby="popular" className={styles.popular}>
          <h2 id="popular" className={styles.sectionTitle}>
            Popular Items
          </h2>
          {orders.length === 0 ? (
            <p className={styles.empty}>No recent orders.</p>
          ) : (
            <ul className={styles.orders}>
              {orders.map((order) => (
                <li key={order.id} className={styles.order}>
                  <img src={order.image} alt="" className={styles.orderImage} />
                  <div className={styles.orderInfo}>
                    <div className={styles.row}>
                      <h3 className={styles.orderName}>{order.name}</h3>
                      <p className={styles.orderTotal}>{formatPrice(order.total)}</p>
                    </div>
                    <div className={styles.row}>
                      <p className={styles.meta}>{order.placedAt}</p>
                      <p className={styles.meta}>
                        {order.items} {order.items === 1 ? 'item' : 'items'}
                      </p>
                    </div>
                    <div className={styles.row}>
                      <button
                        type="button"
                        className={`${styles.pill} ${order.active ? styles.pillSolid : ''}`}
                        onClick={() => cancelOrder(order)}
                      >
                        Cancel Order
                      </button>
                      <button
                        type="button"
                        className={`${styles.pill} ${styles.track}`}
                        onClick={() => showToast(`Tracking driver for ${order.name}…`)}
                      >
                        Track Driver
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>
      </main>

      <div className={styles.toast} role="status" aria-live="polite" data-visible={!!toast || undefined}>
        {toast}
      </div>
    </div>
  )
}
