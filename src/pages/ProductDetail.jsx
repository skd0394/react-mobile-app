import { useEffect, useState } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import BackButton from '../components/BackButton.jsx'
import PrimaryButton from '../components/PrimaryButton.jsx'
import minusIcon from '../assets/icon-minus.svg'
import plusIcon from '../assets/icon-plus.svg'
import radioEmpty from '../assets/radio-empty.svg'
import radioFilled from '../assets/radio-filled.svg'
import { findProduct, formatPrice } from '../data/menu.js'
import styles from './ProductDetail.module.css'

const MAX_QTY = 20

export default function ProductDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const product = findProduct(id)
  const [qty, setQty] = useState(1)
  const [portionId, setPortionId] = useState(product?.portions[0].id)
  const [added, setAdded] = useState(false)

  useEffect(() => {
    if (!added) return
    const t = setTimeout(() => navigate('/home'), 900)
    return () => clearTimeout(t)
  }, [added, navigate])

  if (!product) return <Navigate to="/home" replace />

  const portion = product.portions.find((p) => p.id === portionId)
  const unitPrice = product.price + portion.extra

  return (
    <div className={styles.screen}>
      <div className={styles.topBar}>
        <BackButton to="/home" />
      </div>

      <img className={styles.hero} src={product.image} alt={product.name} />

      <div className={styles.priceRow}>
        <p className={styles.price}>{formatPrice(unitPrice)}</p>
        <div className={styles.stepper} role="group" aria-label="Quantity">
          <button
            type="button"
            onClick={() => setQty((q) => q - 1)}
            disabled={qty <= 1}
            aria-label="Decrease quantity"
          >
            <img src={minusIcon} alt="" width="26.3098" height="26.3098" />
          </button>
          <output className={styles.qty} aria-live="polite">
            {qty}
          </output>
          <button
            type="button"
            onClick={() => setQty((q) => q + 1)}
            disabled={qty >= MAX_QTY}
            aria-label="Increase quantity"
          >
            <img src={plusIcon} alt="" width="26.3098" height="26.3098" />
          </button>
        </div>
      </div>

      <h1 className={styles.name}>{product.name}</h1>
      <p className={styles.description}>{product.description}</p>

      <fieldset className={styles.portions}>
        <legend className={styles.portionTitle}>{product.portionTitle}</legend>
        {product.portions.map((p) => (
          <label key={p.id} className={styles.option}>
            <input
              type="radio"
              name="portion"
              className="visually-hidden"
              value={p.id}
              checked={p.id === portionId}
              onChange={() => setPortionId(p.id)}
            />
            <span className={styles.optionLabel}>{p.label}</span>
            <span className={styles.leader} aria-hidden="true" />
            <span className={styles.optionPrice}>{formatPrice(p.extra)}</span>
            <img
              className={styles.radio}
              src={p.id === portionId ? radioFilled : radioEmpty}
              alt=""
              width="15"
              height="15"
            />
          </label>
        ))}
      </fieldset>

      <div className={styles.footer}>
        <PrimaryButton onClick={() => setAdded(true)} disabled={added}>
          {added ? `Added ${qty} to cart` : 'Add to cart'}
        </PrimaryButton>
      </div>
    </div>
  )
}
