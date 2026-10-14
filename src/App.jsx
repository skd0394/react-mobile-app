import { Navigate, Route, Routes } from 'react-router-dom'
import { useAuth } from './state/authContext.js'
import Signup from './pages/Signup.jsx'
import Otp from './pages/Otp.jsx'
import Home from './pages/Home.jsx'
import ProductDetail from './pages/ProductDetail.jsx'

function RequireAuth({ children }) {
  const { user } = useAuth()
  return user ? children : <Navigate to="/signup" replace />
}

function GuestOnly({ children }) {
  const { user } = useAuth()
  return user ? <Navigate to="/home" replace /> : children
}

export default function App() {
  return (
    <Routes>
      <Route path="/signup" element={<GuestOnly><Signup /></GuestOnly>} />
      <Route path="/otp" element={<GuestOnly><Otp /></GuestOnly>} />
      <Route path="/home" element={<RequireAuth><Home /></RequireAuth>} />
      <Route path="/product/:id" element={<RequireAuth><ProductDetail /></RequireAuth>} />
      <Route path="*" element={<Navigate to="/home" replace />} />
    </Routes>
  )
}
