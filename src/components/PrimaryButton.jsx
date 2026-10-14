import styles from './PrimaryButton.module.css'

export default function PrimaryButton({ children, type = 'button', ...props }) {
  return (
    <button type={type} className={styles.button} {...props}>
      {children}
    </button>
  )
}
