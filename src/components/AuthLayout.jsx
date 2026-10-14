import BackButton from './BackButton.jsx'
import styles from './AuthLayout.module.css'

// Shared shell for the sign-up and OTP screens: back arrow, heading, body, and a
// bottom-pinned action that rides above the on-screen keyboard.
export default function AuthLayout({ backTo, title, subtitle, bodyGap = 48, onSubmit, footer, children }) {
  return (
    <form className={styles.screen} onSubmit={onSubmit} noValidate>
      <div className={styles.top}>
        <BackButton to={backTo} />
      </div>
      <header className={styles.header}>
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.subtitle}>{subtitle}</p>
      </header>
      <div className={styles.body} style={{ marginTop: bodyGap }}>
        {children}
      </div>
      <div className={styles.footer}>{footer}</div>
    </form>
  )
}
