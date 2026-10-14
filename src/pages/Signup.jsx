import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AuthLayout from '../components/AuthLayout.jsx'
import PrimaryButton from '../components/PrimaryButton.jsx'
import { formatPhone, useAuth } from '../state/authContext.js'
import styles from './Signup.module.css'

export default function Signup() {
  const navigate = useNavigate()
  const { requestOtp } = useAuth()
  const [digits, setDigits] = useState('')
  const [error, setError] = useState('')

  function handleChange(e) {
    setDigits(e.target.value.replace(/\D/g, '').slice(0, 10))
    setError('')
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (!/^[6-9]\d{9}$/.test(digits)) {
      setError('Enter a valid 10-digit mobile number')
      return
    }
    requestOtp(digits)
    navigate('/otp')
  }

  return (
    <AuthLayout
      title="Sign Up to Fastor"
      subtitle="Let us know your mobile number and we will send you an OTP for verification."
      onSubmit={handleSubmit}
      footer={
        <>
          <PrimaryButton type="submit" disabled={digits.length !== 10}>
            Get OTP
          </PrimaryButton>
          <p className={styles.terms}>
            By clicking, I accept the <strong>Terms &amp; Conditions</strong> and{' '}
            <strong>Privacy Policy</strong>
          </p>
        </>
      }
    >
      <label className={styles.field} data-invalid={!!error || undefined}>
        <span className={styles.code}>+91</span>
        <span className="visually-hidden">Mobile number</span>
        <input
          className={styles.input}
          type="tel"
          inputMode="numeric"
          autoComplete="tel-national"
          placeholder="00000 00000"
          value={formatPhone(digits)}
          onChange={handleChange}
          aria-invalid={!!error}
          aria-describedby={error ? 'phone-error' : undefined}
          autoFocus
        />
      </label>
      {error && (
        <p id="phone-error" className={styles.error} role="alert">
          {error}
        </p>
      )}
    </AuthLayout>
  )
}
