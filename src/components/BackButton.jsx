import { useNavigate } from 'react-router-dom'
import backIcon from '../assets/icon-back.svg'
import styles from './BackButton.module.css'

export default function BackButton({ to }) {
  const navigate = useNavigate()
  return (
    <button
      type="button"
      className={styles.back}
      aria-label="Go back"
      onClick={() => (to ? navigate(to) : navigate(-1))}
    >
      <img src={backIcon} alt="" width="24" height="24" />
    </button>
  )
}
