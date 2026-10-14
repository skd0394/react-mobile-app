import { useCallback, useMemo, useState } from 'react'
import { AuthContext } from './authContext.js'

const STORAGE_KEY = 'fastor.user'

function readStoredUser() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY))
  } catch {
    return null
  }
}

function writeStoredUser(user) {
  try {
    if (user) localStorage.setItem(STORAGE_KEY, JSON.stringify(user))
    else localStorage.removeItem(STORAGE_KEY)
  } catch {
    // Storage can be unavailable (private mode); the session still works in memory.
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(readStoredUser)
  // Phone number waiting for OTP verification (not yet logged in).
  const [pendingPhone, setPendingPhone] = useState(null)

  const requestOtp = useCallback((phone) => setPendingPhone(phone), [])

  const verifyOtp = useCallback(
    (code) => {
      // Demo backend: any 6-digit code is accepted.
      if (!pendingPhone || !/^\d{6}$/.test(code)) return false
      const next = { phone: pendingPhone, name: 'Karan' }
      writeStoredUser(next)
      setUser(next)
      setPendingPhone(null)
      return true
    },
    [pendingPhone],
  )

  const logout = useCallback(() => {
    writeStoredUser(null)
    setUser(null)
  }, [])

  const value = useMemo(
    () => ({ user, pendingPhone, requestOtp, verifyOtp, logout }),
    [user, pendingPhone, requestOtp, verifyOtp, logout],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
