import { useEffect, useRef, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import AuthLayout from '../components/AuthLayout.jsx'
import PrimaryButton from '../components/PrimaryButton.jsx'
import { formatPhone, useAuth } from '../state/authContext.js'
import styles from './Otp.module.css'

const LENGTH = 6
const RESEND_SECONDS = 30

function useCountdown(seconds) {
  const [left, setLeft] = useState(seconds)
  useEffect(() => {
    if (left <= 0) return
    const id = setTimeout(() => setLeft((s) => s - 1), 1000)
    return () => clearTimeout(id)
  }, [left])
  return [left, () => setLeft(seconds)]
}

export default function Otp() {
  const navigate = useNavigate()
  const { pendingPhone, verifyOtp } = useAuth()
  const [code, setCode] = useState(() => Array(LENGTH).fill(''))
  const [error, setError] = useState('')
  const [secondsLeft, restartTimer] = useCountdown(RESEND_SECONDS)
  const inputs = useRef([])

  if (!pendingPhone) return <Navigate to="/signup" replace />

  const value = code.join('')

  function focus(i) {
    inputs.current[Math.max(0, Math.min(LENGTH - 1, i))]?.focus()
  }

  // Writes digits starting at `start`; handles single keystrokes, paste and SMS autofill.
  function fill(start, digits) {
    const next = [...code]
    let i = start
    for (const d of digits) {
      if (i >= LENGTH) break
      next[i++] = d
    }
    setCode(next)
    setError('')
    focus(i)
  }

  function handleChange(i, e) {
    const digits = e.target.value.replace(/\D/g, '')
    if (!digits) {
      const next = [...code]
      next[i] = ''
      setCode(next)
      return
    }
    // SMS autofill drops the whole code into the first box; otherwise keep the newest keystroke.
    if (digits.length >= LENGTH) fill(0, digits.slice(-LENGTH))
    else fill(i, digits.slice(-1))
  }

  function handleKeyDown(i, e) {
    if (e.key === 'Backspace' && !code[i] && i > 0) {
      e.preventDefault()
      const next = [...code]
      next[i - 1] = ''
      setCode(next)
      focus(i - 1)
    } else if (e.key === 'ArrowLeft') {
      focus(i - 1)
    } else if (e.key === 'ArrowRight') {
      focus(i + 1)
    }
  }

  function handlePaste(i, e) {
    const digits = e.clipboardData.getData('text').replace(/\D/g, '')
    if (!digits) return
    e.preventDefault()
    fill(digits.length >= LENGTH ? 0 : i, digits)
  }

  function handleResend() {
    setCode(Array(LENGTH).fill(''))
    setError('')
    restartTimer()
    focus(0)
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (verifyOtp(value)) navigate('/home', { replace: true })
    else setError('Please enter the 6-digit code')
  }

  const box = (i) => (
    <input
      key={i}
      ref={(el) => (inputs.current[i] = el)}
      className={styles.box}
      type="text"
      inputMode="numeric"
      autoComplete={i === 0 ? 'one-time-code' : 'off'}
      maxLength={i === 0 ? LENGTH : 1}
      value={code[i]}
      onChange={(e) => handleChange(i, e)}
      onKeyDown={(e) => handleKeyDown(i, e)}
      onPaste={(e) => handlePaste(i, e)}
      onFocus={(e) => e.target.select()}
      aria-label={`Digit ${i + 1} of ${LENGTH}`}
      aria-invalid={!!error}
      autoFocus={i === 0}
    />
  )

  return (
    <AuthLayout
      backTo="/signup"
      title="6-digit code"
      subtitle={
        <>
          Please enter the code we’ve sent to
          <br />
          <strong className={styles.phone}>+91 {formatPhone(pendingPhone)}</strong>
        </>
      }
      bodyGap={35}
      onSubmit={handleSubmit}
      footer={
        <PrimaryButton type="submit" disabled={value.length !== LENGTH}>
          Continue
        </PrimaryButton>
      }
    >
      <div className={styles.boxes} role="group" aria-label="Verification code">
        <div className={styles.group}>{[0, 1, 2].map(box)}</div>
        <span className={styles.dash} aria-hidden="true" />
        <div className={styles.group}>{[3, 4, 5].map(box)}</div>
      </div>
      {error && (
        <p className={styles.error} role="alert">
          {error}
        </p>
      )}
      <p className={styles.resend}>
        I didn’t receive a code{' '}
        {secondsLeft > 0 ? (
          <span className={styles.timer} aria-live="polite">
            (00:{String(secondsLeft).padStart(2, '0')})
          </span>
        ) : (
          <button type="button" className={styles.timer} onClick={handleResend}>
            Resend
          </button>
        )}
      </p>
    </AuthLayout>
  )
}
